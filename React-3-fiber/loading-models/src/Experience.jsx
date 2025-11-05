import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import Model from './Model'
import { Suspense } from 'react'

export default function Experience() {

  return (
    <>
        <Perf position='top-left' />
        <OrbitControls />
        <ambientLight />
        <directionalLight 
          intensity={2} 
          position={[1, 2, 3]} 
          castShadow  
        />

        <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={10} >
          <planeGeometry />
          <meshStandardMaterial color={'greenyellow'} />
        </mesh>

        <Suspense fallback={
          <mesh position-y={1.5} scale={[2, 3, 2]}>
            <boxGeometry args={[1, 1, 1, 2, 2, 2]} />
            <meshBasicMaterial wireframe color={'crimson'} />
          </mesh>
        } >
          <Model />
        </Suspense>
    </>
  )
}