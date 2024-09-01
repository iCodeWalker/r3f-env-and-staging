import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import * as THREE from 'three';
import Experience from './Experience.jsx'

const root = ReactDOM.createRoot(document.querySelector('#root'))

// const created = (state) => {
//     console.log("created", state.gl)
//     state.gl.setClearColor('#ff0000',0.7)
// }

// With setClearColor
// const created = ({gl}) => {
//     gl.setClearColor('#ff0000',0.7)
// }

// With scene (using ) WebGL renderer.
const created = ({scene}) => {
    scene.background = new THREE.Color('#ff0000')
}

root.render(
    <Canvas
        // comment the shadows for using contact shadows
        // shadows={true} // To activate the shadoW  We have to add this attribute.
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ - 4, 3, 6 ]
        } }
        // onCreated={created}
    >
         {/* We can put this code any Where, as long as the direct parent is the scene  Which is still the case if We put this in the Experience component   */}
        <color args={['grey']} attach='background'/>
        <Experience />
    </Canvas>
)