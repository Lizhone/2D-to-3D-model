const canvas = document.getElementById("webgl");

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    45,
    canvas.clientWidth / canvas.clientHeight,
    0.1,
    100
);

camera.position.set(0, 1, 5);


// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true
});

renderer.setSize(
    canvas.clientWidth,
    canvas.clientHeight
);

renderer.setPixelRatio(window.devicePixelRatio);


// Lights
scene.add(
    new THREE.AmbientLight(0xffffff, 2)
);

const light = new THREE.DirectionalLight(
    0xffffff,
    3
);

light.position.set(5, 5, 5);

scene.add(light);


// Controls
const controls = new THREE.OrbitControls(
    camera,
    renderer.domElement
);

controls.enableDamping = true;
controls.enablePan = false;


// Load GLB
const loader = new THREE.GLTFLoader();

loader.load(
    "./Penguin.glb",

    function (gltf) {

        const model = gltf.scene;

        model.scale.set(2, 2, 2);

        scene.add(model);

        controls.target.set(0, 0, 0);
        controls.update();
    },

    undefined,

    function (error) {
        console.error("Error loading model:", error);
    }
);


// Animation
function animate() {

    requestAnimationFrame(animate);

    controls.update();

    renderer.render(
        scene,
        camera
    );
}

animate();


// Resize
window.addEventListener("resize", () => {

    camera.aspect =
        canvas.clientWidth /
        canvas.clientHeight;

    camera.updateProjectionMatrix();

    renderer.setSize(
        canvas.clientWidth,
        canvas.clientHeight
    );
});