'use client'

export interface PeerNode {
  id: string
  latitude: number
  longitude: number
  name: string
  type: 'storage' | 'compute' | 'relay'
  active: boolean
  location?: string
  uptime?: number
  bandwidth?: number
}

export interface NetworkConnection {
  from: string
  to: string
  strength: number
  latency?: number
  throughput?: number
}

export interface NetworkStats {
  totalPeers: number
  activePeers: number
  totalBandwidth: number
  totalStorage: number
  regions: string[]
}

export interface IndexRequest {
  url?: string
  content?: string
  metadata?: Record<string, unknown>
}

export interface IndexResponse {
  jobId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  message?: string
}

export interface SearchRequest {
  query: string
  filters?: Record<string, unknown>
  page?: number
  limit?: number
}

export interface SearchResponse {
  results: Array<{
    id: string
    title?: string
    content: string
    url?: string
    score: number
    metadata?: Record<string, unknown>
  }>
  total: number
  page: number
  pages: number
}

export interface JobStatus {
  jobId: string
  status: 'pending' | 'processing' | 'completed' | 'failed'
  progress?: number
  error?: string
  completedAt?: string
}

export interface StorageDocument {
  id: string
  title?: string
  content: string
  url?: string
  metadata?: Record<string, unknown>
  createdAt: string
  updatedAt: string
}

export interface ApiError {
  error: string
  message: string
  statusCode: number
}

const API_BASE_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000')
  : 'http://localhost:8000'

// Flag to check if we should use fallback data
const USE_FALLBACK_MODE = true // Set to true when backend is not available

export class NetworkService {
  private static cache = new Map<string, { data: unknown; timestamp: number }>()
  private static CACHE_TTL = 30000 // 30 seconds
  private static apiKey: string | null = null
  private static jwtToken: string | null = null

  private static getCached<T>(key: string): T | null {
    const cached = this.cache.get(key)
    if (cached && Date.now() - cached.timestamp < this.CACHE_TTL) {
      return cached.data as T
    }
    return null
  }

  private static setCache(key: string, data: unknown): void {
    this.cache.set(key, { data, timestamp: Date.now() })
  }

  static setApiKey(key: string): void {
    this.apiKey = key
  }

  static setJwtToken(token: string): void {
    this.jwtToken = token
  }

  private static getHeaders(): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    }

    if (this.jwtToken) {
      headers['Authorization'] = `Bearer ${this.jwtToken}`
    } else if (this.apiKey) {
      headers['X-API-Key'] = this.apiKey
    }

    return headers
  }

  private static async handleResponse<T>(response: Response): Promise<T> {
    if (!response.ok) {
      const error: ApiError = await response.json().catch(() => ({
        error: 'Network Error',
        message: `HTTP ${response.status}: ${response.statusText}`,
        statusCode: response.status
      }))
      throw error
    }
    return response.json()
  }

  static async fetchPeers(): Promise<PeerNode[]> {
    const cacheKey = 'network-peers'
    const cached = this.getCached<PeerNode[]>(cacheKey)
    if (cached) return cached

    if (USE_FALLBACK_MODE) {
      const peers = this.generateFallbackPeers()
      this.setCache(cacheKey, peers)
      return peers
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/network/peers`, {
        headers: this.getHeaders()
      })
      const peers = await this.handleResponse<PeerNode[]>(response)
      this.setCache(cacheKey, peers)
      return peers
    } catch (error) {
      console.error('Failed to fetch network peers:', error)
      return this.generateFallbackPeers()
    }
  }

  static async fetchConnections(): Promise<NetworkConnection[]> {
    const cacheKey = 'network-connections'
    const cached = this.getCached<NetworkConnection[]>(cacheKey)
    if (cached) return cached

    if (USE_FALLBACK_MODE) {
      const connections = this.generateFallbackConnections()
      this.setCache(cacheKey, connections)
      return connections
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/network/connections`, {
        headers: this.getHeaders()
      })
      const connections = await this.handleResponse<NetworkConnection[]>(response)
      this.setCache(cacheKey, connections)
      return connections
    } catch (error) {
      console.error('Failed to fetch network connections:', error)
      return this.generateFallbackConnections()
    }
  }

  private static generateFallbackConnections(): NetworkConnection[] {
    const peers = this.generateFallbackPeers()
    const connections: NetworkConnection[] = []
    
    // Create some random connections between peers
    for (let i = 0; i < peers.length - 1; i++) {
      if (Math.random() > 0.3) {
        connections.push({
          from: peers[i].id,
          to: peers[i + 1].id,
          strength: Math.random() * 100,
          latency: Math.floor(Math.random() * 100) + 10,
          throughput: Math.floor(Math.random() * 1000) + 100,
        })
      }
    }
    
    return connections
  }

  static async fetchNetworkStats(): Promise<NetworkStats> {
    const cacheKey = 'network-stats'
    const cached = this.getCached<NetworkStats>(cacheKey)
    if (cached) return cached

    if (USE_FALLBACK_MODE) {
      const peers = this.generateFallbackPeers()
      const stats = {
        totalPeers: peers.length,
        activePeers: peers.filter(p => p.active).length,
        totalBandwidth: peers.reduce((acc, p) => acc + (p.bandwidth || 0), 0),
        totalStorage: 15000, // 15TB
        regions: [...new Set(peers.map(p => p.location || '').filter(Boolean))]
      }
      this.setCache(cacheKey, stats)
      return stats
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/network/stats`, {
        headers: this.getHeaders()
      })
      const stats = await this.handleResponse<NetworkStats>(response)
      this.setCache(cacheKey, stats)
      return stats
    } catch (error) {
      console.error('Failed to fetch network stats:', error)
      const peers = this.generateFallbackPeers()
      return {
        totalPeers: peers.length,
        activePeers: peers.filter(p => p.active).length,
        totalBandwidth: peers.reduce((acc, p) => acc + (p.bandwidth || 0), 0),
        totalStorage: 15000,
        regions: [...new Set(peers.map(p => p.location || '').filter(Boolean))]
      }
    }
  }

  static async submitForIndexing(request: IndexRequest): Promise<IndexResponse> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/index`, {
        method: 'POST',
        headers: this.getHeaders(),
        body: JSON.stringify(request)
      })
      return this.handleResponse<IndexResponse>(response)
    } catch (error) {
      console.error('Failed to submit for indexing:', error)
      throw error
    }
  }

  static async searchContent(request: SearchRequest): Promise<SearchResponse> {
    try {
      const params = new URLSearchParams()
      params.append('query', request.query)
      if (request.page) params.append('page', request.page.toString())
      if (request.limit) params.append('limit', request.limit.toString())
      if (request.filters) {
        params.append('filters', JSON.stringify(request.filters))
      }

      const response = await fetch(`${API_BASE_URL}/api/search?${params}`, {
        headers: this.getHeaders()
      })
      return this.handleResponse<SearchResponse>(response)
    } catch (error) {
      console.error('Failed to search content:', error)
      throw error
    }
  }

  static async checkJobStatus(jobId: string): Promise<JobStatus> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/status/${jobId}`, {
        headers: this.getHeaders()
      })
      return this.handleResponse<JobStatus>(response)
    } catch (error) {
      console.error('Failed to check job status:', error)
      throw error
    }
  }

  static async getStoredDocuments(page = 1, limit = 20): Promise<{
    documents: StorageDocument[]
    total: number
    page: number
    pages: number
  }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/storage?page=${page}&limit=${limit}`, {
        headers: this.getHeaders()
      })
      return this.handleResponse(response)
    } catch (error) {
      console.error('Failed to get stored documents:', error)
      throw error
    }
  }

  static async getDocument(documentId: string): Promise<StorageDocument> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/storage/${documentId}`, {
        headers: this.getHeaders()
      })
      return this.handleResponse<StorageDocument>(response)
    } catch (error) {
      console.error('Failed to get document:', error)
      throw error
    }
  }

  static async deleteDocument(documentId: string): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/storage/${documentId}`, {
        method: 'DELETE',
        headers: this.getHeaders()
      })
      return this.handleResponse(response)
    } catch (error) {
      console.error('Failed to delete document:', error)
      throw error
    }
  }

  private static generateFallbackPeers(): PeerNode[] {
    const locations = [
      { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
      { name: 'New York', lat: 40.7128, lng: -74.0060 },
      { name: 'London', lat: 51.5074, lng: -0.1278 },
      { name: 'Tokyo', lat: 35.6762, lng: 139.6503 },
      { name: 'Singapore', lat: 1.3521, lng: 103.8198 },
      { name: 'Frankfurt', lat: 50.1109, lng: 8.6821 },
      { name: 'Sydney', lat: -33.8688, lng: 151.2093 },
      { name: 'Mumbai', lat: 19.0760, lng: 72.8777 },
      { name: 'Toronto', lat: 43.6532, lng: -79.3832 },
      { name: 'Paris', lat: 48.8566, lng: 2.3522 },
    ]

    const types: Array<'storage' | 'compute' | 'relay'> = ['storage', 'compute', 'relay']

    return locations.map((loc, i) => ({
      id: `peer-${i}`,
      latitude: loc.lat,
      longitude: loc.lng,
      name: `${loc.name} Node`,
      type: types[i % types.length],
      active: Math.random() > 0.2,
      location: loc.name,
      uptime: Math.floor(Math.random() * 100),
      bandwidth: Math.floor(Math.random() * 1000) + 100
    }))
  }

  static subscribeToUpdates(callback: (data: unknown) => void): () => void {
    if (typeof window === 'undefined') {
      return () => {}
    }
    
    let ws: WebSocket | null = null
    let reconnectTimeout: NodeJS.Timeout | null = null
    let isIntentionallyClosed = false
    
    const connect = () => {
      try {
        const wsUrl = new URL(`${API_BASE_URL.replace('http', 'ws')}/api/network/stream`)
        if (this.apiKey) {
          wsUrl.searchParams.append('apiKey', this.apiKey)
        } else if (this.jwtToken) {
          wsUrl.searchParams.append('token', this.jwtToken)
        }
        ws = new WebSocket(wsUrl.toString())
        
        ws.onopen = () => {
          console.log('WebSocket connected to network stream')
        }
        
        ws.onmessage = (event) => {
          try {
            const data = JSON.parse(event.data)
            callback(data)
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error)
          }
        }

        ws.onerror = (error) => {
          console.warn('WebSocket connection failed. Backend might not be running.', error)
        }
        
        ws.onclose = () => {
          if (!isIntentionallyClosed) {
            console.log('WebSocket closed, attempting reconnect in 5s...')
            reconnectTimeout = setTimeout(connect, 5000)
          }
        }
      } catch (error) {
        console.warn('Failed to create WebSocket connection:', error)
        reconnectTimeout = setTimeout(connect, 5000)
      }
    }
    
    connect()

    return () => {
      isIntentionallyClosed = true
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }

  static subscribeToIndexingUpdates(jobId: string, callback: (status: JobStatus) => void): () => void {
    if (typeof window === 'undefined') {
      return () => {}
    }
    
    let ws: WebSocket | null = null
    let reconnectTimeout: NodeJS.Timeout | null = null
    let isIntentionallyClosed = false
    
    const connect = () => {
      try {
        const wsUrl = new URL(`${API_BASE_URL.replace('http', 'ws')}/api/status/${jobId}/stream`)
        if (this.apiKey) {
          wsUrl.searchParams.append('apiKey', this.apiKey)
        } else if (this.jwtToken) {
          wsUrl.searchParams.append('token', this.jwtToken)
        }
        ws = new WebSocket(wsUrl.toString())
        
        ws.onopen = () => {
          console.log(`WebSocket connected for job ${jobId}`)
        }
        
        ws.onmessage = (event) => {
          try {
            const status = JSON.parse(event.data) as JobStatus
            callback(status)
            if (status.status === 'completed' || status.status === 'failed') {
              isIntentionallyClosed = true
              ws?.close()
            }
          } catch (error) {
            console.error('Failed to parse WebSocket message:', error)
          }
        }

        ws.onerror = (error) => {
          console.warn('WebSocket connection failed:', error)
        }
        
        ws.onclose = () => {
          if (!isIntentionallyClosed) {
            console.log('WebSocket closed, attempting reconnect in 5s...')
            reconnectTimeout = setTimeout(connect, 5000)
          }
        }
      } catch (error) {
        console.warn('Failed to create WebSocket connection:', error)
        reconnectTimeout = setTimeout(connect, 5000)
      }
    }
    
    connect()

    return () => {
      isIntentionallyClosed = true
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout)
      }
      if (ws && ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }
}