import { CONFIG } from "../config/Constants.js";
import { Sections } from "../catalog/Sections.js";



export class BeamRequest {

    constructor(height) {

        this.id = crypto.randomUUID();

        this.height = height;

        this.section = CONFIG.MEMBER_SIZE;

        this.family = CONFIG.DEFAULT_FAMILY;
        
        this.section = Sections.P1001;

    }

}