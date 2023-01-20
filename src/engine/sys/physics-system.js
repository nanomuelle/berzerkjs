import { Vec2d } from "../vec2d.js";
import { AbstractSystem } from "./abstract-system.js";

export class PhysicsSystem extends AbstractSystem {
    constructor(size) {
        super();
        this._min = Vec2d.of(0, 0);
        this._max = Vec2d.of(size.x - 1, size.y - 1);
    }

    updateOne({ PhysicsComponent }) {
        if (PhysicsComponent) {
            const { pos, vel } = PhysicsComponent;
            const newPos = pos.add(vel);
            PhysicsComponent.setPos(newPos); //.clip(this._min, this._max);
        }
    };
}