import * as THREE from "../../libs/three.module.js";
import { OrbitControls } from "../../libs/addons/controls/OrbitControls.js";

export class Scene {

    constructor(containerId) {

        this.raycaster = new THREE.Raycaster();
this.mouse = new THREE.Vector2();

        this.container = document.getElementById(containerId);

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color(0x202020);

        this.camera = new THREE.PerspectiveCamera(
            45,
            this.container.clientWidth / this.container.clientHeight,
            1,
            10000
        );

        this.camera.position.set(1500, 1500, 1500);
        this.camera.lookAt(0, 0, 0);

        this.renderer = new THREE.WebGLRenderer({
            antialias: true
        });

        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );

        this.container.appendChild(this.renderer.domElement);

        this.controls = new OrbitControls(
            this.camera,
            this.renderer.domElement
        );

        this.controls.enableDamping = true;

        this.addLights();
        this.addGrid();

        window.addEventListener(
            "resize",
            () => this.onResize()
        );

        this.animate();

    }

    getIntersections(event, objects) {

    const rect = this.renderer.domElement.getBoundingClientRect();

    this.mouse.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

    this.mouse.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(
        this.mouse,
        this.camera
    );

    return this.raycaster.intersectObjects(
        objects,
        true
    );

}

    addLights() {

        const light = new THREE.DirectionalLight(
            0xffffff,
            2
        );

        light.position.set(
            1000,
            1500,
            1000
        );

        this.scene.add(light);

        this.scene.add(
            new THREE.AmbientLight(
                0xffffff,
                0.5
            )
        );

    }

    addGrid() {

        const grid = new THREE.GridHelper(
            5000,
            50
        );

        this.scene.add(grid);

    }

    animate() {

        requestAnimationFrame(
            () => this.animate()
        );

        this.controls.update();

        this.renderer.render(
            this.scene,
            this.camera
        );

    }

    onResize() {

        this.camera.aspect =
            this.container.clientWidth /
            this.container.clientHeight;

        this.camera.updateProjectionMatrix();

        this.renderer.setSize(
            this.container.clientWidth,
            this.container.clientHeight
        );

    }

}