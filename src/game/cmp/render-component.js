export class RenderComponent {
    constructor(data) {
        this.index = data.index;
        this.sprites = data.sprites;
    }

    get sprite() {
        return this.index >= 0 ? this.sprites[this.index] : this.sprites;
    }
}