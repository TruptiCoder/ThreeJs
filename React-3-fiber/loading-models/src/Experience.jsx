import { OrbitControls } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'
import Model from './Model'
import { Suspense } from 'react'
import Placeholder from './Placeholder'
import Hamburger from './Hamburger'
import Fox from './Fox'

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
          shadow-normalBias={0.04}
        />

        <mesh receiveShadow rotation-x={-Math.PI * 0.5} scale={10} >
          <planeGeometry />
          <meshStandardMaterial color={'greenyellow'} />
        </mesh>

        <Suspense fallback={ <Placeholder scale={[2, 3, 2]} position-y={1.5} /> } >
          {/* <Model /> */}
          <Hamburger scale={.3} />
        </Suspense>

        <Fox />
        
    </>
  )
}