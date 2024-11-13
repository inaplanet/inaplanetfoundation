'use client';

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default function GaragePage() {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [currentCarIndex, setCurrentCarIndex] = useState(0);
    const [isOrbitEnabled, setIsOrbitEnabled] = useState(false);
    const carModels = ['/garage/car.glb', '/garage/car.glb', '/garage/car.glb', '/garage/car.glb']; // Update with all 10 car paths

    const controlsRef = useRef<OrbitControls | null>(null);
    let carModel: THREE.Object3D;

    useEffect(() => {
        if (!canvasRef.current) return;

        // Initialize Three.js scene, camera, renderer, and controls
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(5, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, -60, 20);

        const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(window.devicePixelRatio);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        // Initialize OrbitControls and set its reference
        controlsRef.current = new OrbitControls(camera, renderer.domElement);
        controlsRef.current.enableDamping = true;
        controlsRef.current.dampingFactor = 0.05;
        controlsRef.current.enabled = isOrbitEnabled;

        const loadCar = (index: number) => {
            if (carModel) {
                scene.remove(carModel);
            }
            const loader = new GLTFLoader();
            loader.load(carModels[index], (gltf) => {
                carModel = gltf.scene;
                carModel.position.set(0, 0, 0);
                scene.add(carModel);
            });
        };

        loadCar(currentCarIndex); // Load the initial car model

        const animate = () => {
            requestAnimationFrame(animate);
            controlsRef.current?.update();
            renderer.render(scene, camera);
        };
        animate();

        // Handle window resize
        const handleResize = () => {
            renderer.setSize(window.innerWidth, window.innerHeight);
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
        };
    }, [currentCarIndex]);

    // Toggle OrbitControls based on `isOrbitEnabled`
    useEffect(() => {
        if (controlsRef.current) {
            controlsRef.current.enabled = isOrbitEnabled;
        }
    }, [isOrbitEnabled]);

    // Handle navigation through cars
    const handleNextCar = () => {
        setCurrentCarIndex((prevIndex) => (prevIndex + 1) % carModels.length);
        setIsOrbitEnabled(false); // Disable orbit controls on car switch
    };

    const handlePreviousCar = () => {
        setCurrentCarIndex((prevIndex) => (prevIndex - 1 + carModels.length) % carModels.length);
        setIsOrbitEnabled(false);
    };

    // Enable orbit controls for customization when "Customize Car" is clicked
    const handleCarClick = () => {
        setIsOrbitEnabled(true);
    };

    return (
        <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
            <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />

            {/* Overlay for Navigation */}
            <div style={{ position: 'absolute', top: '50%', left: '10%', transform: 'translateY(-50%)' }}>
                <button onClick={handlePreviousCar}>←</button>
            </div>
            <div style={{ position: 'absolute', top: '50%', right: '10%', transform: 'translateY(-50%)' }}>
                <button onClick={handleNextCar}>→</button>
            </div>

            {/* Car Name and Customize Button */}
            <div
                style={{
                    position: 'absolute',
                    bottom: '10px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    color: '#fff',
                }}
            >
                <h3>Car {currentCarIndex + 1}</h3>
                <button onClick={handleCarClick}>Customize Car</button>
            </div>
        </div>
    );
};
