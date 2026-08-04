import { FrameDefinition } from "./model/FrameDefinition.js";
import { GeneratedFrame } from "./model/GeneratedFrame.js";

import { FrameGenerator } from "./engine/FrameGenerator.js";

import { Scene } from "./scene/Scene.js";
import { Renderer } from "./renderer/Renderer.js";

import { UI } from "./ui/UI.js";

export class Application {

    constructor() {

        this.definition = new FrameDefinition();

        this.generated = new GeneratedFrame();

        this.generator = new FrameGenerator();

        this.scene = new Scene("viewer");

        this.renderer = new Renderer(this.scene);
        this.selectedMember = null;

        // Create the UI
        this.ui = new UI(this);

        this.scene.renderer.domElement.addEventListener(
    "click",
    this.onViewerClick.bind(this)
);

    }

    onViewerClick(event) {

    const hits = this.scene.getIntersections(
        event,
        this.renderer.getMeshes()
    );

    if (hits.length === 0) {

        this.selectedMember = null;

        this.renderer.highlight(null);

        return;

    }

    const member = hits[0].object.userData.member;

    this.selectMember(member);

}

selectMember(member) {

    this.selectedMember = member;

    this.renderer.highlight(member.id);

    console.log("Selected Member");
    console.log(member);

    this.ui.showMember(member);

}

 regenerate() {

    this.generator.generate(
        this.definition,
        this.generated
    );

    this.renderer.render(
        this.generated
    );

    this.ui.rebuildBeamList(
        this.definition.beamRequests
    );

}

    setFrameWidth(width) {

        this.definition.width = width;

        this.regenerate();

    }

    setFrameHeight(height) {

        this.definition.height = height;

        this.regenerate();

    }

    addHorizontalBeam(height) {

        this.definition.addBeam(height);

        this.regenerate();

    }

    updateHorizontalBeam(id, height) {

    this.definition.updateBeam(id, height);

    this.regenerate();

}

deleteHorizontalBeam(id) {

    this.definition.removeBeam(id);

    this.regenerate();

}

updateSelectedMemberHeight(height) {

    if (!this.selectedMember)
        return;

    if (!this.selectedMember.source)
        return;

    this.selectedMember.source.height = height;

    this.regenerate();

}



}