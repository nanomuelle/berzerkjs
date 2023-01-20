import { Vec2d } from "../../engine/vec2d.js";
import { AbstractBehavior } from "./abstract-behavior.js";

export class ScrollOutBehavior extends AbstractBehavior {
    constructor(game, nextBehavior, scrollDirection) {
        super(game, nextBehavior);
        this.scrollDirection = scrollDirection;
    }

    run(e) {
        super.run();

        e.tags = [];
        e.CollisionComponent.collideWithTags = [];
        e.DoorComponent = null;
        e.InputComponent = null;

        const velocityOut = {
            N: Vec2d.of( 0,  1),
            S: Vec2d.of( 0, -1),
            E: Vec2d.of(-2,  0),
            O: Vec2d.of( 2,  0)
        };
        e.PhysicsComponent.setVel(velocityOut[this.scrollDirection]);
        
        this.state = 'end';
    }
}