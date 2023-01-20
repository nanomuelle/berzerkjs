import { AbstractSystem } from "./abstract-system.js";

const overlaps = (e1, e2) => {
    const { 
        PhysicsComponent: { pos: posA }, 
        CollisionComponent: { collider: { pos: offsetA, size: sizeA } } 
    } = e1;

    const { 
        PhysicsComponent: { pos: posB }, 
        CollisionComponent: { collider: { pos: offsetB, size: sizeB } } 
    } = e2;

    if (posA.x + offsetA.x > posB.x + offsetB.x + sizeB.x - 1) {
        return false;
    }

    if (posB.x + offsetB.x > posA.x + offsetA.x + sizeA.x - 1) {
        return false;
    }

    if (posA.y + offsetA.y > posB.y + offsetB.y + sizeB.y - 1) {
        return false;
    }

    if (posB.y + offsetB.y > posA.y + offsetA.y + sizeA.y - 1) {
        return false;
    }

    return true;
}

export class CollisionSystem extends AbstractSystem {
    checkCollision(e1, e2) {
        const { CollisionComponent: { collideWithTags, collider: collider1 } } = e1;
        const { tags, CollisionComponent: { collider: collider2 } } = e2;

        if (!collider1 || !collider2) {
            // console.log("NO COLLIDERS");
            return false;
        }

        if (!collideWithTags.some(tag => tags.includes(tag) )) {
            // console.log("NO COMPATIBLE TAGS");
            return false;
        }

        if (!overlaps(e1, e2)) {
            return false;
        }

        return true;
    };

    updateOne(a, b) {
        if (a.CollisionComponent && b.CollisionComponent) {
            if (this.checkCollision(a, b)) {
                this._collisions.push([a, b]);
            }

            if (this.checkCollision(b, a)) {
                this._collisions.push([b, a]);
            }
        }
    }

    update(entityManager) {
        this._collisions = [];
        entityManager.forEachPair(this.updateOne);
    }

    foreEachCollision(fn) {
        this._collisions.forEach(fn);
    }
}