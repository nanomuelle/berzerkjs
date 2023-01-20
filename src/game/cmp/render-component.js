import { Vec2d } from "../../engine/vec2d.js";

export class RenderComponent {
    constructor(data) {
        this.index = data.index;
        this.sprites = data.sprites;
        this.size = Vec2d.fromArray(data.size);
    }

    get sprite() {
        return this.index >= 0 ? this.sprites[this.index] : this.sprites;
    }
}