import * as THREE from 'three';

export default function initGlobe(containerId: string): void {
    // Check if container exists
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container with id "${containerId}" not found.`);
        return;
    }

    // Create Scene
    const scene = new THREE.Scene();

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(75, container.clientWidth / container.clientHeight, 0.1, 1000);
    camera.position.z = 10;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Load Textures
    const textureLoader = new THREE.TextureLoader();
    const earthTexture = textureLoader.load('//unpkg.com/three-globe/example/img/earth-blue-marble.jpg');
    const bumpTexture = textureLoader.load('//unpkg.com/three-globe/example/img/earth-topology.png');

    // Create Globe
    const globeGeometry = new THREE.SphereGeometry(5, 64, 64); // Radius: 5, Segments: 64
    const globeMaterial = new THREE.MeshStandardMaterial({
        map: earthTexture,
        bumpMap: bumpTexture,
        bumpScale: 0.05, // Adds surface depth
    });
    const globeMesh = new THREE.Mesh(globeGeometry, globeMaterial);
    globeMesh.rotation.y = Math.PI; // Initial rotation
    scene.add(globeMesh);

    // Animation Loop
    function animate() {
        requestAnimationFrame(animate);

        // Rotate the globe
        globeMesh.rotation.y += 0.001;

        renderer.render(scene, camera);
    }
    animate();

    // Handle Window Resize
    window.addEventListener('resize', () => {
        camera.aspect = container.clientWidth / container.clientHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(container.clientWidth, container.clientHeight);
    });
}
