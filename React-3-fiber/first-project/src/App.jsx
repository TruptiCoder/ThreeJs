import './App.css'
import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience';
import Practice from './components/Practice';

function App() {
  return (
    <Canvas>
        {/* <Experience /> */}
        <Practice />
    </Canvas>
  );
}

export default App
