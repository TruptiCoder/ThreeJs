### Installation
npm install three @react-three/fiber
    
    - here we are using @ since react-three is a scope means there are different parts and fiber is one of them.

### Syntax

To create a simple mesh

    <mesh>
        <boxGeometry />
        <meshBasicMaterial color="red" />
    </mesh>

To Change postion, scale and rotation 

    <mesh position={[1, 2, 1]} rotation-x={0.5} >
        <boxGeometry />
        <meshBasicMaterial color="red" />
    </mesh>

To create a group

    <group>
        <mesh>
            <boxGeometry />
            <meshBasicMaterial color="red" />
        </mesh>
        <mesh>
            <sphereGeometry />
            <meshBasicMaterial color="orange" />
        </mesh>
    </group>

### What is actually happening?

- When we put mesh inside the group, JSX automatacally calls add() function to add mesh to the group.

- When we puth boxGeometry and material inside mesh, these are the attributes so JSX asigns an attach attribute specifying the property on them.

    eg. <mesh>
            <sphereGeometry attach="geometry" />
            <meshBasicMaterial attach="material" color="orange" />
        </mesh>

### How much Three.js class are supported ?
- R3F supports all the classes
- If there are any updates it supports them automatically.

# First Scene

To create a scene import {Canvas} from @react-three/fiber and add everything inside it.

eg. <Canvas>
        <mesh>
            <sphereGeometry />
            <meshBasicMaterial color='red' />
        </mesh>
    </Canvas>

To be able to use hooks from R3F we will create another component and move everything which is inside canvas to that component.

To change the sphere we can pass params through args attribute
eg. <sphereGeometry args={ [1.5, 32, 32] } />

To change material as there is only one object passed in params so
<meshBasicMaterial args={ [ { color:"red" , wireframe=true } ] } />

or you can use
<meshBasicMaterial color={"red"} wireframe />

## Three.js Hooks
To animate we can use useFrame hook from react-three/fiber
    - It can be only used inside canvas so we can use it in our component which is being rendered inside canvas.

To access the camera, webGlRenderer, Clock, etc you can use useThree hook.