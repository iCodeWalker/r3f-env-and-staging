import { useFrame } from '@react-three/fiber'
import { OrbitControls, useHelper, BakeShadows, SoftShadows } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from "three";

// Previously we can do like this, so the softshadow gets clled only once and not on re-renders
// softShadows({
//     frustum : 3.75,
//     size: 0.005,
//     near:9.5,
//     samples : 17,
//     rings : 11
// })

export default function Experience()
{
    const cube = useRef();

    // For using light helpers
    const directionalLight = useRef();
    useHelper(directionalLight, THREE.DirectionalLightHelper, 1)
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    return <>
{/* 
        If we have a static scene in which none of the geometries arew moving or animating than we can use shadow baking. */}
        {/* The shows will stop moving in our scene if we use bake shadow */}
        {/* <BakeShadows /> */}
        {/* We can put the code anywhere, as long as the direct parent is the scene. */}
        {/* <color args={['ivory']} attach='background'/> */}

        <Perf position="top-left" />

        <OrbitControls makeDefault />
        {/* Associate the directionalLight ref with the directional light */}

        {/* Soft Shadows  */}
        <SoftShadows 
            // frustum ={3.75}
            // size= {0.005}
            // near={9.5}
            // samples={17}
            // rings= {11}
        />

        <directionalLight 
            ref={directionalLight}
            castShadow={true} 
            position={ [ 1, 2, 3 ] } 
            intensity={ 1.5 } 
            shadow-mapSize={[1024, 1024]}
            // Near and far value should be selected properly as it can cut the shadows if not properly.
            shadow-camera-near={1}
            shadow-camera-far={15}
            shadow-camera-top={5}
            shadow-camera-right={5}
            shadow-camera-bottom={-5}
            shadow-camera-left={-5}
            // This will create a shadow that will cover half of the cube and sphere, i.e only half sphere and cube will form the shadow
            // shadow-camera-top={2}
            // shadow-camera-right={2}
            // shadow-camera-bottom={-2}
            // shadow-camera-left={-2}
        />
        <ambientLight intensity={ 0.5 } />

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}