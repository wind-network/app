'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { NetworkService, type PeerNode as NetworkPeerNode, type NetworkConnection } from '@/services/network'

// Types
interface PeerNode {
  id: string
  position: THREE.Vector3
  name: string
  type: 'storage' | 'compute' | 'relay'
  active: boolean
}

interface Connection {
  from: PeerNode
  to: PeerNode
  strength: number
}

// Convert lat/lng to 3D sphere coordinates
function latLngToVector3(lat: number, lng: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (lng + 180) * (Math.PI / 180)
  
  const x = -radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.cos(phi)
  const z = radius * Math.sin(phi) * Math.sin(theta)
  
  return new THREE.Vector3(x, y, z)
}

// Convert network peer to local peer format
function convertNetworkPeer(peer: NetworkPeerNode, radius: number): PeerNode {
  return {
    id: peer.id,
    position: latLngToVector3(peer.latitude, peer.longitude, radius),
    name: peer.name,
    type: peer.type,
    active: peer.active
  }
}

// Generate connections from network data
function convertNetworkConnections(
  connections: NetworkConnection[], 
  peers: Map<string, PeerNode>
): Connection[] {
  return connections
    .map(conn => {
      const from = peers.get(conn.from)
      const to = peers.get(conn.to)
      
      if (from && to && from.active && to.active) {
        return {
          from,
          to,
          strength: conn.strength
        }
      }
      return null
    })
    .filter((conn): conn is Connection => conn !== null)
}

// Globe mesh component
function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame(({ clock }) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })
  
  return (
    <Sphere ref={meshRef} args={[2.5, 64, 64]}>
      <meshPhongMaterial
        color="#0a0e1a"
        emissive="#1e40af"
        emissiveIntensity={0.1}
        shininess={10}
        wireframe
        transparent
        opacity={0.2}
      />
    </Sphere>
  )
}

// Atmosphere glow effect
function Atmosphere() {
  const atmosphereRef = useRef<THREE.Mesh>(null)
  
  const atmosphereShader = useMemo(() => ({
    uniforms: {
      time: { value: 0 }
    },
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      uniform float time;
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.7 - dot(vNormal, vec3(0, 0, 1.0)), 2.0);
        vec3 atmosphere = vec3(0.3, 0.6, 1.0) * intensity;
        gl_FragColor = vec4(atmosphere, intensity * 0.5);
      }
    `
  }), [])
  
  useFrame(({ clock }) => {
    if (atmosphereRef.current && atmosphereRef.current.material) {
      const material = atmosphereRef.current.material as THREE.ShaderMaterial
      if ('uniforms' in material && material.uniforms) {
        material.uniforms.time.value = clock.getElapsedTime()
      }
    }
  })
  
  return (
    <Sphere ref={atmosphereRef} args={[2.8, 64, 64]}>
      <shaderMaterial
        {...atmosphereShader}
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        transparent
      />
    </Sphere>
  )
}

// Peer node component
function PeerNode({ peer }: { peer: PeerNode }) {
  const meshRef = useRef<THREE.Mesh>(null)
  
  const color = {
    storage: '#06b6d4',
    compute: '#3b82f6',
    relay: '#8b5cf6'
  }[peer.type]
  
  useFrame(({ clock }) => {
    if (meshRef.current && peer.active) {
      const scale = 1 + Math.sin(clock.getElapsedTime() * 2 + peer.id.charCodeAt(0)) * 0.2
      meshRef.current.scale.setScalar(scale)
    }
  })
  
  return (
    <mesh ref={meshRef} position={peer.position}>
      <sphereGeometry args={[peer.active ? 0.05 : 0.03, 16, 16]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={peer.active ? 1 : 0.5}
      />
    </mesh>
  )
}

// Connection line component
function ConnectionLine({ connection }: { connection: Connection }) {
  const lineRef = useRef<THREE.Line>(null)
  
  const lineObject = useMemo(() => {
    const points = [
      connection.from.position,
      connection.from.position.clone().multiplyScalar(1.3),
      connection.to.position.clone().multiplyScalar(1.3),
      connection.to.position
    ]
    
    const curve = new THREE.CatmullRomCurve3(points)
    const curvePoints = curve.getPoints(50)
    
    const geometry = new THREE.BufferGeometry().setFromPoints(curvePoints)
    const material = new THREE.LineBasicMaterial({
      color: '#3b82f6',
      transparent: true,
      opacity: 0.3 * connection.strength,
      blending: THREE.AdditiveBlending
    })
    
    return new THREE.Line(geometry, material)
  }, [connection])
  
  useFrame(({ clock }) => {
    if (lineRef.current && lineRef.current.material) {
      const material = lineRef.current.material as THREE.LineBasicMaterial
      material.opacity = (0.3 * connection.strength) + Math.sin(clock.getElapsedTime() * 2) * 0.1
    }
  })
  
  return <primitive ref={lineRef} object={lineObject} />
}

// Main scene component
function GlobeScene() {
  const [peers, setPeers] = useState<PeerNode[]>([])
  const [connections, setConnections] = useState<Connection[]>([])
  
  useEffect(() => {
    let unsubscribe: (() => void) | null = null
    
    const loadNetworkData = async () => {
      try {
        const [networkPeers, networkConnections] = await Promise.all([
          NetworkService.fetchPeers(),
          NetworkService.fetchConnections()
        ])
        
        const convertedPeers = networkPeers.map(p => convertNetworkPeer(p, 2.5))
        const peerMap = new Map(convertedPeers.map(p => [p.id, p]))
        const convertedConnections = convertNetworkConnections(networkConnections, peerMap)
        
        setPeers(convertedPeers)
        setConnections(convertedConnections)
        
        // Subscribe to real-time updates
        unsubscribe = NetworkService.subscribeToUpdates((data) => {
          const updateData = data as { 
            type: string
            peers?: NetworkPeerNode[]
            connections?: NetworkConnection[]
          }
          
          if (updateData.type === 'peer_update' && updateData.peers) {
            const updatedPeers = updateData.peers.map((p: NetworkPeerNode) => convertNetworkPeer(p, 2.5))
            setPeers(updatedPeers)
          }
          if (updateData.type === 'connection_update' && updateData.connections) {
            const peerMap = new Map(peers.map(p => [p.id, p]))
            const updatedConnections = convertNetworkConnections(updateData.connections, peerMap)
            setConnections(updatedConnections)
          }
        })
      } catch (error) {
        console.error('Failed to load network data:', error)
      }
    }
    
    loadNetworkData()
    
    return () => {
      if (unsubscribe) {
        unsubscribe()
      }
    }
  }, [peers])
  
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#3b82f6" />
      
      <Stars
        radius={100}
        depth={50}
        count={5000}
        factor={4}
        saturation={0}
        fade
        speed={1}
      />
      
      <group>
        <GlobeMesh />
        <Atmosphere />
        
        {peers.map(peer => (
          <PeerNode key={peer.id} peer={peer} />
        ))}
        
        {connections.map((connection, i) => (
          <ConnectionLine key={i} connection={connection} />
        ))}
      </group>
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        rotateSpeed={0.5}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  )
}

// Main Globe component
export function Globe() {
  return (
    <div className="absolute inset-0 w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        style={{ background: 'transparent' }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <GlobeScene />
      </Canvas>
    </div>
  )
}