export class Member {

    constructor(
        id,
        role,
        start,
        end,
        section,
        family,
        fixed = false,
        source = null
    ) {

        this.id = id;

        this.role = role;

        this.start = start;

        this.end = end;

        this.section = section;

        this.family = family;

        this.fixed = fixed;

        // Link back to the BeamRequest that created this member
        this.source = source;

    }

}