import { useFrame } from '@react-three/fiber'
import {Environment, Sky ,ContactShadows, RandomizedLight, AccumulativeShadows, OrbitControls, useHelper, BakeShadows, SoftShadows } from '@react-three/drei'
import { useRef } from 'react'
import { Perf } from 'r3f-perf'
import * as THREE from "three";
import { useControls } from 'leva';

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

        // For moving the accumulated shadow
        // const time = state.clock.elapsedTime;
        // cube.current.position.x = 2 + Math.sin(time);

        // The solution is to tell AccumulativeShadow to keep rendering the shadow with the frame attribute of the AccumulativeShadow to inifinity
    })

    const {color, opacity, blur} = useControls('contact shadows', {
        color : '#000000',
        opacity: { value: 0.5, min: 0, max:1},
        blur: { value: 1, min:0, max: 10}
    })

    // Controlling the position of the sun

    const {sunPosition} = useControls("sky", {
        sunPosition : {value: [1,2,3]} 
    })

    return <>
{/* 
        If we have a static scene in which none of the geometries arew moving or animating than we can use shadow baking. */}
        {/* The shows will stop moving in our scene if we use bake shadow */}
        {/* <BakeShadows /> */}
        {/* We can put the code anywhere, as long as the direct parent is the scene. */}
        {/* <color args={['ivory']} attach='background'/> */}

        {/* Environment */}
        <Environment files={[
            './environmentMaps/2/px.jpg',
            './environmentMaps/2/nx.jpg',
            './environmentMaps/2/py.jpg',
            './environmentMaps/2/ny.jpg',
            './environmentMaps/2/pz.jpg',
            './environmentMaps/2/nx.jpg',
        ]}/>

        <Perf position="top-left" />

        <OrbitControls makeDefault />
        {/* Associate the directionalLight ref with the directional light */}

        {/* Soft Shadows  */}
        {/* <SoftShadows 
            // frustum ={3.75}
            // size= {0.005}
            // near={9.5}
            // samples={17}
            // rings= {11}
        /> */}

        {/* <directionalLight 
            ref={directionalLight}
            castShadow={true} 
            // position={ [ 1, 2, 3 ] }
            // To move directional light on moving the position of the sun 
            position={ sunPosition} 

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
        /> */}
        {/* <ambientLight intensity={ 0.5 } /> */}

        {/* AccumulativeShadows */}

        {/* <AccumulativeShadows position={[0,-0.99,0]} scale={10} color='#316d39' opacity={0.8} frames={Infinity} temporal blend={100}>
            // ##### We need to provide lights to AccumulativeShadows

            <directionalLight position={[1,2,3]} castShadow/>

            // ##### For randomized light and soft shadow we use RandomizedLight
            <RandomizedLight position={[1,2,3]} amount={8} radius={1} ambient={0.5} intensity={1} bias={0.001}/>

        </AccumulativeShadows> */}

        {/* Contact Shadows  */}
        <ContactShadows position={[0,-0.99, 0]} scale={10} resolution={512} far={5} color={color} opacity={opacity} blur={blur}/>

        {/* Sky */}
        {/* <Sky sunPosition={sunPosition}/> */}

        <mesh castShadow position-x={ - 2 }>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh castShadow ref={ cube } position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>
{/* 
        <mesh receiveShadow position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh> */}

        {/* To use AccumulativeShadows we have to remove the shadow from the mesh, as AccumulativeShadows is itself an object : remove receiveShadow */}

        {/* AccumulativeShaodows */}
        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

    </>
}