import { CONFIG } from "../config/Constants.js";
import { Member } from "../model/Member.js";

export class FrameGenerator {

    generate(definition, generated) {

        generated.clear();

        this.generateOuterFrame(definition, generated);

this.generateHorizontalBeams(definition, generated);

this.generateBrackets(generated);

        // Future
        // this.generateConnections(definition, generated);
        // this.generateBrackets(definition, generated);

    }

    generateBrackets(generated) {

    generated.members.forEach(member => {

        switch(member.role){

            case "LeftColumn":
            case "RightColumn":

                this.generateCornerBrackets(
                    member,
                    generated
                );

                break;

            case "HorizontalBeam":

                this.generateTBrackets(
                    member,
                    generated
                );

                break;

        }

    });

}

generateCornerBrackets(member, generated){

    console.log(
        "Corner brackets for",
        member.id
    );

}

generateTBrackets(member, generated){

    console.log(
        "T brackets for",
        member.id
    );

}

    generateOuterFrame(definition, generated) {

        generated.members.push(

            new Member(
                "C01",
                "LeftColumn",
                {
                    x: 0,
                    y: 0,
                    z: 0
                },
                {
                    x: 0,
                    y: 0,
                    z: definition.height
                },
                CONFIG.MEMBER_SIZE,
                CONFIG.DEFAULT_FAMILY,
                true
            )

        );

        generated.members.push(

            new Member(
                "C02",
                "RightColumn",
                {
                    x: definition.width,
                    y: 0,
                    z: 0
                },
                {
                    x: definition.width,
                    y: 0,
                    z: definition.height
                },
                CONFIG.MEMBER_SIZE,
                CONFIG.DEFAULT_FAMILY,
                true
            )

        );

        generated.members.push(

            new Member(
                "B01",
                "BottomBeam",
                {
                    x: 0,
                    y: 0,
                    z: 0
                },
                {
                    x: definition.width,
                    y: 0,
                    z: 0
                },
                CONFIG.MEMBER_SIZE,
                CONFIG.DEFAULT_FAMILY,
                true
            )

        );

        generated.members.push(

            new Member(
                "B02",
                "TopBeam",
                {
                    x: 0,
                    y: 0,
                    z: definition.height
                },
                {
                    x: definition.width,
                    y: 0,
                    z: definition.height
                },
                CONFIG.MEMBER_SIZE,
                CONFIG.DEFAULT_FAMILY,
                true
            )

        );

    }

    generateHorizontalBeams(definition, generated) {

        definition.beamRequests.forEach((beam, index) => {

            generated.members.push(

                new Member(

    `HB${index + 1}`,

    "HorizontalBeam",

    {
        x: CONFIG.INTERNAL_BEAM_OFFSET,
        y: 0,
        z: beam.height
    },

    {
        x: definition.width - CONFIG.INTERNAL_BEAM_OFFSET,
        y: 0,
        z: beam.height
    },

    beam.section,

    beam.family,

    false,

    beam

)

            );

        });

    }

}