import React from 'react'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience'
import { Leva } from 'leva'

export default function App() {
  return (
    <>
      <Leva collapsed />
      <Canvas>
        <Experience />
      </Canvas>
    </>
  )
}