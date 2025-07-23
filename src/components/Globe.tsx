'use client'

import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Sphere, OrbitControls, Stars } from '@react-three/drei'
import * as THREE from 'three'

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

// Generate random points on sphere surface
function generateSpherePoint(radius: number): THREE.Vector3 {
  const theta = Math.random() * Math.PI * 2
  const phi = Math.acos(2 * Math.random() - 1)
  
  const x = radius * Math.sin(phi) * Math.cos(theta)
  const y = radius * Math.sin(phi) * Math.sin(theta)
  const z = radius * Math.cos(phi)
  
  return new THREE.Vector3(x, y, z)
}

// Generate mock peer data
function generatePeers(count: number): PeerNode[] {
  const types: Array<'storage' | 'compute' | 'relay'> = ['storage', 'compute', 'relay']
  const names = [
    'Tokyo Node', 'London Hub', 'NYC Relay', 'Singapore Storage',
    'Frankfurt Compute', 'Sydney Node', 'Mumbai Hub', 'Toronto Relay',
    'Paris Storage', 'Seoul Compute', 'Dubai Node', 'SF Hub',
    'Berlin Relay', 'Moscow Storage', 'Rio Compute', 'Cairo Node',
    'Stockholm Hub', 'Bangkok Relay', 'Madrid Storage', 'Vienna Compute'
  ]
  
  return Array.from({ length: count }, (_, i) => ({
    id: `peer-${i}`,
    position: generateSpherePoint(2.5),
    name: names[i % names.length],
    type: types[Math.floor(Math.random() * types.length)],
    active: Math.random() > 0.3
  }))
}

// Generate connections between peers
function generateConnections(peers: PeerNode[]): Connection[] {
  const connections: Connection[] = []
  const maxConnections = 30
  
  for (let i = 0; i < maxConnections; i++) {
    const fromIndex = Math.floor(Math.random() * peers.length)
    const toIndex = Math.floor(Math.random() * peers.length)
    
    if (fromIndex !== toIndex && peers[fromIndex].active && peers[toIndex].active) {
      connections.push({
        from: peers[fromIndex],
        to: peers[toIndex],
        strength: Math.random()
      })
    }
  }
  
  return connections
}

// Globe mesh component
function GlobeMesh() {
  const meshRef = useRef<THREE.Mesh>(null)
  const { viewport } = useThree()
  
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
    if (atmosphereRef.current && atmosphereRef.current.material.uniforms) {
      atmosphereRef.current.material.uniforms.time.value = clock.getElapsedTime()
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
  
  const points = useMemo(() => {
    const curve = new THREE.CatmullRomCurve3([
      connection.from.position,
      connection.from.position.clone().multiplyScalar(1.3),
      connection.to.position.clone().multiplyScalar(1.3),
      connection.to.position
    ])
    return curve.getPoints(50)
  }, [connection])
  
  useFrame(({ clock }) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.2 + Math.sin(clock.getElapsedTime() * 2) * 0.1
    }
  })
  
  return (
    <line ref={lineRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={Float32Array.from(points.flatMap(p => [p.x, p.y, p.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <lineBasicMaterial
        color="#3b82f6"
        transparent
        opacity={0.3 * connection.strength}
        blending={THREE.AdditiveBlending}
      />
    </line>
  )
}

// Main scene component
function GlobeScene() {
  const peers = useMemo(() => generatePeers(50), [])
  const connections = useMemo(() => generateConnections(peers), [peers])
  
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