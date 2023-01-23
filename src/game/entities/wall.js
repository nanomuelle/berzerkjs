import { SPRITES } from "../sprites.js";
import { TAGS } from "../tags.js";

export const createEWall = (entityManager, pos) => {
    const size = [10, 1];
    const data = {
        tags: [ TAGS.LETAL ],
        components: {
            Physics: { pos },
            Collision: { size, isSolid: true },
            Render: { sprites: [SPRITES.WALL_H], index: 0, size }
        }            
    };
    return entityManager.create(data);
};

export const createOWall = (entityManager, pos) => {
    return createEWall(entityManager, [pos[0] - 9, pos[1]]);
}

export const createSWall = (entityManager, pos) => {
    const size = [1, 5];
    const data = {
        tags: [ TAGS.SOLID, TAGS.TRIGGER, TAGS.LETAL ],
        components: {
            Physics: { pos },
            Collision: { size },
            Render: { sprites: [SPRITES.WALL_V], index: 0, size }
        }
    };
    return entityManager.create(data);
}

export const createNWall = (entityManager, pos) => {
    return createSWall(entityManager, [pos[0], pos[1] - 4]);
}
