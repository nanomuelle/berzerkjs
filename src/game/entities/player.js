import { Vec2d } from "../../engine/vec2d.js";
import { PlayerBehavior } from "../behaviors/player-behavior.js";
import { SPRITES } from "../sprites.js";
import { TAGS } from "../tags.js";
import { createBullet } from "./bullet.js";

const startPositions = {
    N: { pos: [24, 11], spriteIndex: 0 },
    E: { pos: [ 1,  6], spriteIndex: 1 },
    S: { pos: [24,  1], spriteIndex: 2 },
    O: { pos: [46,  6], spriteIndex: 3 }
};

const lookAt = {
    S: 'N',
    N: 'S',
    E: 'O',
    O: 'E'
};

const [vx, vy] = [0.5, 0.25];

const move = (vel, spriteIndex) => entity => {
    entity.PhysicsComponent.setVel(vel);
    entity.RenderComponent.index = spriteIndex;
}

const moveN = move(Vec2d.of(  0, -vy), 0);
const moveE = move(Vec2d.of( vx,   0), 1);
const moveS = move(Vec2d.of(  0,  vy), 2);
const moveO = move(Vec2d.of(-vx,  0), 3);

// TODO: usar LookAtComponent para la direccion de disparo del bullet
const fire = game => entity => {
    const { PhysicsComponent: { pos, vel }, CollisionComponent: { size } } = entity;
    let bulletPos;
    let bulletVel;
    if (vel.x !== 0) {
        bulletPos = vel.x > 0 ? pos.add(Vec2d.of(size.x + 1, 1)) : pos.add(Vec2d.of(-size.x, 1));
        bulletVel = vel.x > 0 ? vel.add(Vec2d.of(0.1, 0)) : vel.add(Vec2d.of(-0.1, 0));
    } else if (vel.y !== 0) {
        bulletPos = vel.y >= 0 ? pos.add(Vec2d.of(1, size.y)) : pos.add(Vec2d.of(1, -1));
        bulletVel = vel.y > 0 ? vel.add(Vec2d.of(0, 0.1)) : vel.add(Vec2d.of(0, -0.1));
    }
    

    createBullet(game, bulletPos, bulletVel);
    // const bulletData = {
    //     tags: [ TAGS.BULLET, TAGS.LETAL ],
    //     components: {
    //         Physics: { pos: pos.add(vel).toArray(), vel: vel.toArray() },
    //         Render: { sprites: [SPRITES.BULLET], index: 0 },
    //         Collision: {
    //             size: [1, 1],
    //             collideWithTags: [TAGS.SOLID, TAGS.TRIGGER],
    //         }
    //     }
    // };
    // entityManager.create(bulletData);
};

export const createPlayer = (game, usedEntry) => {
    const { em } = game;
    const { pos, spriteIndex } = startPositions[usedEntry];

    const data = {
        tags: [ TAGS.PLAYER ],
        components: {
            Collision: { pos: [0.5, 0.5], size: [2.1, 2.1] }, // collideWithTags: [TAGS.LETAL, TAGS.EXIT]
            Physics: { pos },
            Render: { sprites: SPRITES.PLAYER, index: spriteIndex, size: [3, 3] },
            Input: { 
                up: moveN,
                right: moveE,
                down: moveS,
                left: moveO,
                space: fire(game)
            },
            Behavior: { behavior: new PlayerBehavior(game) }
        }
    };

    return em.create(data);
}
