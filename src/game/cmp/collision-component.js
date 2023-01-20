import { Vec2d } from "../../engine/vec2d.js";

export class CollisionComponent {
    constructor(data) {
        // console.log('CollisionComponent constructor', data);

        const pos = Vec2d.fromArray(data.pos);
        const size = Vec2d.fromArray(data.size);

        this.collideWithTags = data.collideWithTags || []; // ['WALL'];
        this.collider = { pos, size };
    }
}