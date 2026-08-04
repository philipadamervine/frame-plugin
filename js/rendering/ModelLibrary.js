import * as THREE from "../../libs/three.module.js";
import { GLTFLoader } from "../../libs/addons/loaders/GLTFLoader.js";

export class ModelLibrary {

    constructor() {

        this.loader = new GLTFLoader();

        this.models = new Map();

    }

    async load(name, path) {

        return new Promise((resolve, reject) => {

            this.loader.load(

                path,

                (gltf) => {

                    this.models.set(
                        name,
                        gltf.scene
                    );

                    resolve();

                },

                undefined,

                reject

            );

        });

    }

    get(name) {

        const model = this.models.get(name);

        if (!model)
            return null;

        return model.clone(true);

    }

}