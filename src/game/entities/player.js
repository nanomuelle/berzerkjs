import { Vec2d } from "../../engine/vec2d.js";
import { SPRITES } from "../sprites.js";
import { TAGS } from "../tags.js";

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
const fire = entityManager => entity => {
    const { PhysicsComponent: { pos, vel } } = entity;
    const bulletData = {
        tags: [ TAGS.BULLET, TAGS.LETAL ],
        components: {
            Physics: { pos: pos.add(vel).toArray(), vel: vel.toArray() },
            Render: { sprites: [SPRITES.BULLET], index: 0 },
            Collision: {
                size: [1, 1],
                collideWithTags: [TAGS.SOLID, TAGS.TRIGGER],
            }
        }
    };
    entityManager.create(bulletData);
};

export const createPlayer = (entityManager, usedEntry) => {
    const { pos, spriteIndex } = startPositions[usedEntry];

    const data = {
        tags: [ TAGS.PLAYER ],
        components: {
            Collision: { 
                size: [3, 3],
                collideWithTags: [TAGS.SOLID, TAGS.TRIGGER]
            },
            Physics: { pos },
            Render: { sprites: SPRITES.PLAYER, index: spriteIndex },
            Input: { 
                up: moveN,
                right: moveE,
                down: moveS,
                left: moveO,
                space: fire(entityManager)
            }
        }
    };

    return entityManager.create(data);
}
