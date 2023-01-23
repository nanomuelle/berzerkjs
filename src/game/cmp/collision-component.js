import { Vec2d } from "../../engine/vec2d.js";

export class CollisionComponent {
    constructor(data) {
        // console.log('CollisionComponent constructor', data);

        this.pos = Vec2d.fromArray(data.pos);
        this.size = Vec2d.fromArray(data.size);
        // this.collideWithTags = data.collideWithTags || []; // ['WALL'];

        this.isSolid = data.isSolid;
        this.clearCollisions();
    }

    addCollision(entity) {
        this._collisions.add(entity);
    }

    clearCollisions() {
        this._collisions = new Set();
    }

    getCollisionCount() {
        return this._collisions.size;
    }

    forEachCollision(fn) {
        this._collisions.forEach(fn);
    }
}