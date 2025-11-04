import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

export default function App() {

  return (
    <>

      <Canvas 
        // shadows
        camera={{
          fov: 45,
          near: 0.1,
          far: 100,
          position: [-2, 4, -5]
        }}
      >
        <Experience />
      </Canvas>

    </>
  )
}