import { GLTFLoader } from "../../libs/addons/loaders/GLTFLoader.js";

export class ModelLibrary {

    constructor() {

        this.loader = new GLTFLoader();
        this.models = new Map();

    }

    async load(name, path) {

        if (this.models.has(name))
            return;

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

        if (!model) {

            console.warn(
                `Model '${name}' has not been loaded.`
            );

            return null;

        }

        return model.clone(true);

    }

    has(name) {

        return this.models.has(name);

    }

}