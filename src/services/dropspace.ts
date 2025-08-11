'use client'

export interface SharedFile {
  id: string
  name: string
  size: string
  shared: string
  expires: string
  downloads: number
  url?: string
  encryptionKey?: string
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

const API_BASE_URL = typeof window !== 'undefined' 
  ? (process.env.NEXT_PUBLIC_API_URL || 'https://api.dropspace.wind.network')
  : 'https://api.dropspace.wind.network'

export class DropSpaceService {
  private static async fetchWithAuth(endpoint: string, options?: RequestInit) {
    const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null
    
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options?.headers,
      },
    })

    if (!response.ok) {
      throw new Error(`API Error: ${response.statusText}`)
    }

    return response.json()
  }

  static async getRecentShares(): Promise<SharedFile[]> {
    try {
      return await this.fetchWithAuth('/shares/recent')
    } catch (error) {
      console.error('Failed to fetch recent shares:', error)
      return []
    }
  }

  static async getStorageStats(): Promise<StorageStats> {
    try {
      return await this.fetchWithAuth('/stats/storage')
    } catch (error) {
      console.error('Failed to fetch storage stats:', error)
      return {
        used: 0,
        total: 10,
        uploads: 0,
        downloads: 0,
        activeLinks: 0,
      }
    }
  }

  static async uploadFile(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    const formData = new FormData()
    formData.append('file', file)

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest()
      const token = typeof window !== 'undefined' ? localStorage.getItem('auth_token') : null

      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded / event.total) * 100)
          onProgress(progress)
        }
      })

      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          try {
            const response = JSON.parse(xhr.responseText)
            resolve(response)
          } catch (error) {
            reject(new Error('Invalid response format'))
          }
        } else {
          reject(new Error(`Upload failed: ${xhr.statusText}`))
        }
      })

      xhr.addEventListener('error', () => {
        reject(new Error('Network error during upload'))
      })

      xhr.open('POST', `${API_BASE_URL}/upload`)
      
      if (token) {
        xhr.setRequestHeader('Authorization', `Bearer ${token}`)
      }
      
      xhr.send(formData)
    })
  }

  static async deleteShare(shareId: string): Promise<void> {
    await this.fetchWithAuth(`/shares/${shareId}`, {
      method: 'DELETE',
    })
  }

  static async updateShareSettings(shareId: string, settings: {
    expiresAt?: string
    password?: string
    maxDownloads?: number
  }): Promise<SharedFile> {
    return await this.fetchWithAuth(`/shares/${shareId}`, {
      method: 'PATCH',
      body: JSON.stringify(settings),
    })
  }

  static async copyShareLink(shareId: string): Promise<string> {
    const response = await this.fetchWithAuth(`/shares/${shareId}/link`)
    const link = response.url
    
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(link)
    }
    
    return link
  }

  static async getP2PStats(): Promise<{ peersOnline: number }> {
    try {
      const response = await this.fetchWithAuth('/stats/p2p')
      return response
    } catch (error) {
      console.error('Failed to fetch P2P stats:', error)
      return { peersOnline: 0 }
    }
  }
}