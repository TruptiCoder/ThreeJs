import { meshBounds, OrbitControls, useCursor, useGLTF } from '@react-three/drei'
import { useEffect, useRef, useState } from 'react'

export default function Experience() {

    const [hovered, setHovered] = useState(false)
    useCursor(hovered)

    const boxRef = useRef()

    const eventHandler = (event) => {
        boxRef.current.material.color.set(`hsl(${Math.random() * 360}, 100%, 75%)`)
    }

    const hamburger = useGLTF('./hamburger-draco.glb')

    // onClick for left click
    // onContexMenue for right click
    // onDoubleClick for double click
    // onPointerUp when we release the click (left or right) or touch
    // onPointerDown when we click
    // onPointerOver and onPointerEnter when cursor or finger just went above the object
    // onPointerOut and onPointerLeave opposite of above
    // onPointerMove when pointer moves
    // onPointerMissed when clicked outside the object -> this can be added on canvas too.

  return (
    <>
        <OrbitControls />
        <color args={['#333']} attach={'background'} />

        <ambientLight />
        <directionalLight position={[1, 2, 3]} intensity={3} />

        <mesh 
            ref={boxRef} 
            raycast={meshBounds}
            position-x={2} 
            scale={1.5} 
            onClick={eventHandler} 
            onPointerEnter={() => {setHovered(true)}}
            onPointerLeave={() => {setHovered(false)}}
        >
            <boxGeometry />
            <meshStandardMaterial color={'mediumpurple'} />
        </mesh>
        <mesh position-x={-2} onClick={(event) => {event.stopPropagation()}}>
            <sphereGeometry />
            <meshStandardMaterial color={'orange'} />
        </mesh>
        <mesh scale={10} position-y={-1} rotation-x={-Math.PI * 0.5}>
            <planeGeometry />
            <meshStandardMaterial color={'yellowgreen'} />
        </mesh>

        <primitive 
            object={hamburger.scene} 
            scale={.2} 
            position-y={0.5}
            onClick={(event) => {
                event.stopPropagation()
                console.log(event.object.name)
            }}
        />
    </>
  )
}
