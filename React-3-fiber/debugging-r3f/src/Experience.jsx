import { extend, useThree } from '@react-three/fiber'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { button, useControls } from 'leva'
import { Perf } from 'r3f-perf'

extend({OrbitControls})

export default function Experience() {

    const {camera, gl} = useThree()

    const { perfVisible } = useControls({
        perfVisible: false
    })

    const { position, color, visible } = useControls( 'sphere', {
        position: {
            value: { x: -2, y: 0 },
            step: 0.01,
            joystick: 'invertY'
        },
        color: '#df00ff',
        visible: true,
        myInterval: {
            min: 0,
            max: 10,
            value: [ 4, 5 ]
        },
        clickMe: button(() => { console.log('ok') }),
        choice: { options: [ 'a', 'b', 'c' ] }
    })

    const { scale } = useControls( 'cube', {
        scale: {
            min: 0,
            max: 5,
            value: 1,
            step: 0.01
        }
    })
    
  return (
    <>
        { perfVisible ? <Perf position='top-left' /> : null }
        
        <orbitControls args={ [camera, gl.domElement] } />

        <ambientLight />
        <directionalLight position={ [1, 2, 3] } intensity={2} />

        <group>
            <mesh rotation={ [0.7, 1, 0] } position={ [2, 0, 0] } scale={ scale } >
                <boxGeometry />
                <meshStandardMaterial color={'mediumpurple'} />
            </mesh>

            <mesh position={ [position.x, position.y, 0] } scale={0.8} visible={ visible } >
                <sphereGeometry />
                <meshStandardMaterial color={ color } />
            </mesh>

            <mesh scale={10} position={ [0, 0, -1.2] } rotation-x={ -Math.PI * .25 } >
                <planeGeometry />
                <meshStandardMaterial color={'yellowgreen'} />
            </mesh>
        </group>

    </>
  )
}