'use client'

export interface SharedFile {
  id: string
  name: string
  size: string
  type: string
  shared: string
  expires: string
  downloads: number
  url?: string
  encryptionKey?: string
  data?: string // Base64 encoded file data for local storage
}

export interface StorageStats {
  used: number
  total: number
  uploads: number
  downloads: number
  activeLinks: number
}

export interface UploadResponse {
  id: string
  url: string
  encryptionKey: string
  expiresAt?: string
}

// Use local storage for demo
const STORAGE_KEY = 'dropspace_files'
const STATS_KEY = 'dropspace_stats'

export class DropSpaceService {
  private static getStoredFiles(): SharedFile[] {
    if (typeof window === 'undefined') return []
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  }

  private static saveFiles(files: SharedFile[]) {
    if (typeof window === 'undefined') return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(files))
  }

  private static getStats(): StorageStats {
    if (typeof window === 'undefined') {
      return { used: 0, total: 10, uploads: 0, downloads: 0, activeLinks: 0 }
    }
    const stored = localStorage.getItem(STATS_KEY)
    return stored ? JSON.parse(stored) : {
      used: 0,
      total: 10,
      uploads: 0,
      downloads: 0,
      activeLinks: 0,
    }
  }

  private static saveStats(stats: StorageStats) {
    if (typeof window === 'undefined') return
    localStorage.setItem(STATS_KEY, JSON.stringify(stats))
  }

  private static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i]
  }

  private static formatDate(date: Date): string {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return 'Just now'
    if (minutes < 60) return `${minutes} min ago`
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
    if (days < 7) return `${days} day${days > 1 ? 's' : ''} ago`
    return date.toLocaleDateString()
  }

  private static generateId(): string {
    return Math.random().toString(36).substr(2, 9)
  }

  private static generateEncryptionKey(): string {
    // Simple encryption key generation for demo
    return btoa(Math.random().toString(36).substr(2, 15))
  }

  static async getRecentShares(): Promise<SharedFile[]> {
    return this.getStoredFiles().sort((a, b) => {
      const dateA = new Date(a.shared).getTime()
      const dateB = new Date(b.shared).getTime()
      return dateB - dateA
    })
  }

  static async getStorageStats(): Promise<StorageStats> {
    return this.getStats()
  }

  static async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      
      reader.onprogress = (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100)
          onProgress(progress)
        }
      }

      reader.onload = (event) => {
        const base64Data = event.target?.result as string
        const fileId = this.generateId()
        const encryptionKey = this.generateEncryptionKey()
        
        const newFile: SharedFile = {
          id: fileId,
          name: file.name,
          size: this.formatFileSize(file.size),
          type: file.type || 'application/octet-stream',
          shared: new Date().toISOString(),
          expires: 'Never', // For demo, files never expire
          downloads: 0,
          url: `https://dropspace.wind.network/share/${fileId}`,
          encryptionKey,
          data: base64Data,
        }

        // Save file
        const files = this.getStoredFiles()
        files.push(newFile)
        this.saveFiles(files)

        // Update stats
        const stats = this.getStats()
        stats.uploads += 1
        stats.activeLinks += 1
        stats.used = Math.min(stats.total, stats.used + (file.size / (1024 * 1024 * 1024))) // Convert to GB
        this.saveStats(stats)

        resolve({
          id: fileId,
          url: newFile.url!,
          encryptionKey,
        })
      }

      reader.onerror = () => {
        reject(new Error('Failed to read file'))
      }

      // Start reading file
      reader.readAsDataURL(file)
    })
  }

  static async deleteShare(shareId: string): Promise<void> {
    const files = this.getStoredFiles()
    const index = files.findIndex(f => f.id === shareId)
    
    if (index !== -1) {
      files.splice(index, 1)
      this.saveFiles(files)
      
      // Update stats
      const stats = this.getStats()
      stats.activeLinks = Math.max(0, stats.activeLinks - 1)
      this.saveStats(stats)
    }
  }

  static async copyShareLink(shareId: string): Promise<string> {
    const files = this.getStoredFiles()
    const file = files.find(f => f.id === shareId)
    
    if (!file) {
      throw new Error('File not found')
    }

    const shareLink = `${window.location.origin}/share/${shareId}#${file.encryptionKey}`
    
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(shareLink)
      // Show a temporary toast or notification
      const toast = document.createElement('div')
      toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg z-50'
      toast.textContent = 'Link copied to clipboard!'
      document.body.appendChild(toast)
      setTimeout(() => document.body.removeChild(toast), 2000)
    }
    
    return shareLink
  }

  static async downloadFile(shareId: string): Promise<void> {
    const files = this.getStoredFiles()
    const file = files.find(f => f.id === shareId)
    
    if (!file || !file.data) {
      throw new Error('File not found')
    }

    // Update download count
    file.downloads += 1
    this.saveFiles(files)
    
    // Update stats
    const stats = this.getStats()
    stats.downloads += 1
    this.saveStats(stats)

    // Create download link
    const link = document.createElement('a')
    link.href = file.data
    link.download = file.name
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  static async getP2PStats(): Promise<{ peersOnline: number }> {
    // Simulate P2P network stats
    const basePeers = 1234
    const variation = Math.floor(Math.random() * 200) - 100
    return { peersOnline: basePeers + variation }
  }

  static async updateShareSettings(shareId: string, settings: {
    expiresAt?: string
    password?: string
    maxDownloads?: number
  }): Promise<SharedFile> {
    const files = this.getStoredFiles()
    const file = files.find(f => f.id === shareId)
    
    if (!file) {
      throw new Error('File not found')
    }

    // Update expiration if provided
    if (settings.expiresAt) {
      const expiryDate = new Date(settings.expiresAt)
      const now = new Date()
      const diff = expiryDate.getTime() - now.getTime()
      const hours = Math.floor(diff / 3600000)
      const days = Math.floor(diff / 86400000)
      
      if (days > 0) {
        file.expires = `${days} day${days > 1 ? 's' : ''}`
      } else if (hours > 0) {
        file.expires = `${hours} hour${hours > 1 ? 's' : ''}`
      } else {
        file.expires = 'Soon'
      }
    }

    this.saveFiles(files)
    return file
  }

  // Initialize with some demo files if empty
  static initializeDemoData() {
    if (typeof window === 'undefined') return
    
    const files = this.getStoredFiles()
    if (files.length === 0) {
      const demoFiles: SharedFile[] = [
        {
          id: 'demo1',
          name: 'Project_Proposal.pdf',
          size: '2.4 MB',
          type: 'application/pdf',
          shared: new Date(Date.now() - 2 * 3600000).toISOString(), // 2 hours ago
          expires: 'Never',
          downloads: 15,
          url: 'https://dropspace.wind.network/share/demo1',
          encryptionKey: 'demo-key-1',
        },
        {
          id: 'demo2',
          name: 'Design_Assets.zip',
          size: '45.7 MB',
          type: 'application/zip',
          shared: new Date(Date.now() - 24 * 3600000).toISOString(), // 1 day ago
          expires: '6 days',
          downloads: 3,
          url: 'https://dropspace.wind.network/share/demo2',
          encryptionKey: 'demo-key-2',
        },
        {
          id: 'demo3',
          name: 'Meeting_Recording.mp4',
          size: '156.3 MB',
          type: 'video/mp4',
          shared: new Date(Date.now() - 72 * 3600000).toISOString(), // 3 days ago
          expires: '4 days',
          downloads: 8,
          url: 'https://dropspace.wind.network/share/demo3',
          encryptionKey: 'demo-key-3',
        },
      ]
      
      this.saveFiles(demoFiles)
      
      const stats: StorageStats = {
        used: 0.2, // 200 MB in GB
        total: 10,
        uploads: 45,
        downloads: 234,
        activeLinks: 12,
      }
      this.saveStats(stats)
    }
  }
}

// Initialize demo data on load
if (typeof window !== 'undefined') {
  DropSpaceService.initializeDemoData()
}