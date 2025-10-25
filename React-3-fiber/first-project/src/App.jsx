import './App.css'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience';
import Practice from './components/Practice';
import * as THREE from 'three'

function App() {
  return (
    <Canvas
      // dpr={ [1, 2] }  // It's R3F default value so we can remove

      // flat // to remove toneMapping
      gl={ {
        antialias: true,
        toneMapping: THREE.ACESFilmicToneMapping,
      } }

      // orthographic
      camera={ {
        fov: 45,
        // zoom: 200,
        near: 0.1,
        far: 100,
        position: [3, 2, 6]
      } }
    >
        <Experience />
        {/* <Practice /> */}
    </Canvas>
  );
}

export default App
