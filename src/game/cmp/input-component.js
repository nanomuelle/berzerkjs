export class InputComponent {
    constructor(data) {
        // const vx = data.vel[0]; // 0.5;
        // const vy = data.vel[1]; // 0.25;

        this.up = data.up; // entity => entity.PhysicsComponent.setVel(Vec2d.of(0, -vy));
        this.down = data.down; // entity => entity.PhysicsComponent.setVel(Vec2d.of(0, vy));
        this.left = data.left; // entity => entity.PhysicsComponent.setVel(Vec2d.of(-vx, 0));
        this.right = data.right; // entity => entity.PhysicsComponent.setVel(Vec2d.of(vx, 0));
        this.space = data.space;
    }
}