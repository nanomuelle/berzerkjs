import { AbstractSystem } from "./abstract-system.js";
import { Screen } from "../screen.js";

export class RenderSystem extends AbstractSystem {
    constructor(size) {
        super();
        this.size = size;
        this._screen = new Screen(size.x, size.y);
    }

    updateOne(entity) {
        const { pos } = entity.PhysicsComponent;
        const { sprite } = entity.RenderComponent;
        this._screen.printSprite(Math.round(pos.y), Math.round(pos.x), sprite);
    };
    
    update(entityManager) {
        this._screen.clearBuffer();
        super.update(entityManager);
        this._screen.render();
    }
}