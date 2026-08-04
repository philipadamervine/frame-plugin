import { CONFIG } from "../config/Constants.js";
import { BeamRequest } from "./BeamRequest.js";

export class FrameDefinition {

    constructor() {

        this.width = CONFIG.DEFAULT_WIDTH;
        this.height = CONFIG.DEFAULT_HEIGHT;

        this.beamRequests = [];

    }

    addBeam(height) {

        this.beamRequests.push(
            new BeamRequest(height)
        );

    }

    updateBeam(id, height) {

        const beam = this.beamRequests.find(
            b => b.id === id
        );

        if (!beam) return;

        beam.height = height;

    }

    removeBeam(id) {

        this.beamRequests =
            this.beamRequests.filter(
                b => b.id !== id
            );

    }

}