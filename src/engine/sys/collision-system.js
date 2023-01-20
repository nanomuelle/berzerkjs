import { AbstractSystem } from "./abstract-system.js";

const overlaps = (e1, e2) => {
    const { 
        PhysicsComponent: { pos: posA }, 
        CollisionComponent: { pos: offsetA, size: sizeA } 
    } = e1;

    const { 
        PhysicsComponent: { pos: posB }, 
        CollisionComponent: { pos: offsetB, size: sizeB } 
    } = e2;

    if (posA.x + offsetA.x >= posB.x + offsetB.x + sizeB.x) {
        return false;
    }

    if (posA.x + offsetA.x + sizeA.x <= posB.x + offsetB.x ) {
        return false;
    }

    if (posA.y + offsetA.y >= posB.y + offsetB.y + sizeB.y) {
        return false;
    }

    if (posA.y + offsetA.y + sizeA.y <= posB.y + offsetB.y ) {
        return false;
    }

    return true;
}

export class CollisionSystem extends AbstractSystem {
    checkCollision(e1, e2) {
        // const { CollisionComponent: { collideWithTags } } = e1;
        // const { tags } = e2;

        // if (!collideWithTags.some(tag => tags.includes(tag) )) {
        //     // console.log("NO COMPATIBLE TAGS");
        //     return false;
        // }

        if (!overlaps(e1, e2)) {
            return false;
        }

        return true;
    };

    updateOne(e1, e2) {
        if (e1.CollisionComponent && e2.CollisionComponent && overlaps(e1, e2)) {
            e1.CollisionComponent.addCollision(e2);
            e2.CollisionComponent.addCollision(e1);

            if (e2.CollisionComponent.isSolid) {
                e1.PhysicsComponent.restorePos();
            }

            if (e1.CollisionComponent.isSolid) {
                e2.PhysicsComponent.restorePos();
            }

            // if (this.checkCollision(a, b)) {
            //     a.CollisionComponent.addCollision(b);
            //     if (b.PhysicsComponent.isSolid) {                    
            //         a.PhysicsComponent.restorePos();
            //         console.log('b isSolid!!', b)
            //     }
            //     // this._collisions.push([a, b]);
            // }

            // if (this.checkCollision(b, a)) {
            //     b.CollisionComponent.addCollision(a);
            //     if (a.PhysicsComponent.isSolid) {
            //         b.PhysicsComponent.restorePos();
            //         console.log('a isSolid!!', a)
            //     }
            //     // this._collisions.push([b, a]);
            // }
        }
    }

    update(entityManager) {
        entityManager.forEach(entity => {
            entity.CollisionComponent?.clearCollisions();
        });
        entityManager.forEachPair(this.updateOne);
    }

    // foreEachCollision(fn) {
    //     this._collisions.forEach(fn);
    // }
}