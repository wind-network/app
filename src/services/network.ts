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

const API_BASE_URL = typeof window !== 'undefined'
  ? (process.env.NEXT_PUBLIC_API_URL || 'https://api.wind.network')
  : 'https://api.wind.network'

export class NetworkService {
  private static cache = new Map<string, { data: unknown; timestamp: number }>()
  private static CACHE_TTL = 30000 // 30 seconds

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

  static async fetchPeers(): Promise<PeerNode[]> {
    const cacheKey = 'network-peers'
    const cached = this.getCached<PeerNode[]>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(`${API_BASE_URL}/network/peers`)
      if (!response.ok) throw new Error('Failed to fetch peers')
      
      const peers = await response.json()
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

    try {
      const response = await fetch(`${API_BASE_URL}/network/connections`)
      if (!response.ok) throw new Error('Failed to fetch connections')
      
      const connections = await response.json()
      this.setCache(cacheKey, connections)
      return connections
    } catch (error) {
      console.error('Failed to fetch network connections:', error)
      return []
    }
  }

  static async fetchNetworkStats(): Promise<NetworkStats> {
    const cacheKey = 'network-stats'
    const cached = this.getCached<NetworkStats>(cacheKey)
    if (cached) return cached

    try {
      const response = await fetch(`${API_BASE_URL}/network/stats`)
      if (!response.ok) throw new Error('Failed to fetch stats')
      
      const stats = await response.json()
      this.setCache(cacheKey, stats)
      return stats
    } catch (error) {
      console.error('Failed to fetch network stats:', error)
      return {
        totalPeers: 0,
        activePeers: 0,
        totalBandwidth: 0,
        totalStorage: 0,
        regions: []
      }
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
    
    const ws = new WebSocket(`${API_BASE_URL.replace('http', 'ws')}/network/stream`)
    
    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data)
        callback(data)
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error)
      }
    }

    ws.onerror = (error) => {
      console.error('WebSocket error:', error)
    }

    return () => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.close()
      }
    }
  }
}