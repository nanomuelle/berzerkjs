import { SPRITES } from "../sprites.js";
import { TAGS } from "../tags.js";

export const createDoor = (entityManager, {pos, dir, size, isOpen}) => {
    const doorSprites = {
        N: isOpen => isOpen ? SPRITES.EXIT_OPEN_H : SPRITES.EXIT_CLOSED_H,
        S: isOpen => isOpen ? SPRITES.EXIT_OPEN_H : SPRITES.EXIT_CLOSED_H,
        E: isOpen => isOpen ? SPRITES.EXIT_OPEN_V : SPRITES.EXIT_CLOSED_V,
        O: isOpen => isOpen ? SPRITES.EXIT_OPEN_V : SPRITES.EXIT_CLOSED_V,
    };

    const data = {
        tags: isOpen ? [ TAGS.TRIGGER, TAGS.EXIT ] : [ TAGS.SOLID ],
        components: {
            Physics: { pos },
            Collision: { size },
            Door: { dir },
            Render: { sprites: [doorSprites[dir](isOpen)], index: 0 }
        }
    };

    return entityManager.create(data);
};
