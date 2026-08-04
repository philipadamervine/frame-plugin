export class UI {

    constructor(app) {

        this.app = app;

        this.cacheElements();

        this.bindEvents();

    }

    cacheElements() {

        this.frameWidth =
            document.getElementById("frameWidth");

        this.frameHeight =
            document.getElementById("frameHeight");

        this.beamHeight =
            document.getElementById("beamHeight");

        this.addBeam =
            document.getElementById("addBeam");

        this.beamList =
            document.getElementById("beamList");

            this.selectedId = document.getElementById("selectedId");
this.selectedRole = document.getElementById("selectedRole");
this.selectedHeight = document.getElementById("selectedHeight");

this.updateMemberButton =
    document.getElementById("updateMember");

    }

    bindEvents() {

        this.frameWidth.addEventListener("change", () => {

            this.app.setFrameWidth(
                Number(this.frameWidth.value)
            );

        });

        this.frameHeight.addEventListener("change", () => {

            this.app.setFrameHeight(
                Number(this.frameHeight.value)
            );

        });

        this.addBeam.addEventListener("click", () => {

            const height = Number(this.beamHeight.value);

            if (!height) return;

            this.app.addHorizontalBeam(height);

            this.beamHeight.value = "";

        });

        this.updateMemberButton.addEventListener("click", () => {

    if (!this.currentMember)
        return;

    this.app.updateSelectedMemberHeight(

        Number(this.selectedHeight.value)

    );

});

    }

   rebuildBeamList(beamRequests) {

    this.beamList.innerHTML = "";

    beamRequests.forEach((beam, index) => {

        const row = document.createElement("div");
        row.className = "beam-row";

        const label = document.createElement("span");
        label.textContent = `Beam ${index + 1}`;

        const input = document.createElement("input");
        input.type = "number";
        input.value = beam.height;

        input.addEventListener("change", () => {

            this.app.updateHorizontalBeam(
                beam.id,
                Number(input.value)
            );

        });

        const button = document.createElement("button");
        button.textContent = "🗑";

        button.addEventListener("click", () => {

            this.app.deleteHorizontalBeam(
                beam.id
            );

        });

        row.appendChild(label);
        row.appendChild(input);
        row.appendChild(button);

        this.beamList.appendChild(row);

    });

}

showMember(member) {

    this.currentMember = member;

    this.selectedId.value = member.id;

    this.selectedRole.value = member.role;

    this.selectedHeight.value = member.start.z;

}

}