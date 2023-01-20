import { Vec2d } from "../../engine/vec2d.js";

export class PhysicsComponent {
    constructor(data) {
        // console.log('PhysicsComponent constructor', data);
        const pos = Vec2d.fromArray(data.pos);
        this.setPos(pos);
        this.lastPos = pos;

        const vel = Vec2d.fromArray(data.vel);
        this.setVel(vel);
        this.lastVel = vel;
    }

    setPos(pos) {
        this.lastPos = this.pos;
        this.pos = pos;
    }

    restorePos() {
        this.pos = this.lastPos;
    }

    setVel(vel) {
        this.lastVel = this.vel;
        this.vel = vel;
    }

    restoreVel() {
        this.vel = this.lastVel;
    }
}
