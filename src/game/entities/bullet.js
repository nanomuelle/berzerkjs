import { DestroyOnCollisionBehavior } from "../behaviors/destroy-on-collision-behavior.js";
import { SPRITES } from "../sprites.js";
import { TAGS } from "../tags.js";

export const createBullet = (game, pos, vel) => {
    const bulletData = {
        tags: [ TAGS.LETAL ],
        components: {
            Physics: { pos: pos.add(vel).toArray(), vel: vel.toArray() },
            Render: { sprites: [SPRITES.BULLET], index: 0, size: [1, 1] },
            Collision: { size: [1, 1] }, // collideWithTags: [ TAGS.LETAL, TAGS.EXIT ]
            Behavior: { behavior: new DestroyOnCollisionBehavior(game) }
        }
    };
    const e = game.em.create(bulletData);
    e.id = 'bullet';
};