import * as THREE from "../../libs/three.module.js";

export class Renderer {

    constructor(scene) {

        this.scene = scene;

        this.frameGroup = new THREE.Group();
        this.scene.scene.add(this.frameGroup);

        this.meshes = new Map();

        this.normalMaterial = new THREE.MeshStandardMaterial({
            color: 0x0088ff
        });

        this.selectedMaterial = new THREE.MeshStandardMaterial({
            color: 0xff9900
        });

    }

    render(generated) {

        this.clear();

        generated.members.forEach(member => {

            const mesh = this.createMemberMesh(member);

            this.meshes.set(member.id, mesh);

            this.frameGroup.add(mesh);

        });

    }

    clear() {

        this.meshes.clear();

        while (this.frameGroup.children.length > 0) {

            this.frameGroup.remove(this.frameGroup.children[0]);

        }

    }

    createMemberMesh(member) {

        const start = new THREE.Vector3(
            member.start.x,
            member.start.y,
            member.start.z
        );

        const end = new THREE.Vector3(
            member.end.x,
            member.end.y,
            member.end.z
        );

        const direction = new THREE.Vector3();

        direction.subVectors(end, start);

        const length = direction.length();

        const geometry = new THREE.BoxGeometry(
            member.section,
            member.section,
            length
        );

        const mesh = new THREE.Mesh(
            geometry,
            this.normalMaterial
        );

        mesh.position.copy(
            start.clone().add(end).multiplyScalar(0.5)
        );

        mesh.quaternion.setFromUnitVectors(
            new THREE.Vector3(0, 0, 1),
            direction.clone().normalize()
        );

        // Store the member on the mesh
        mesh.userData.member = member;

        return mesh;

    }

    getMeshes() {

        return Array.from(this.meshes.values());

    }

    highlight(memberId) {

        this.meshes.forEach(mesh => {

            mesh.material = this.normalMaterial;

        });

        if (!memberId) return;

        const mesh = this.meshes.get(memberId);

        if (mesh) {

            mesh.material = this.selectedMaterial;

        }

    }

}