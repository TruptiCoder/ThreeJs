import { Canvas } from '@react-three/fiber'
import Experience from './Experience'

export default function App() {
  return (
    <Canvas 
      shadows
      camera={{
        position: [0, 3, 5]
      }}
    >
      <Experience />
    </Canvas>
  )
}