import { AbstractBehavior } from "./abstract-behavior.js";

export class DestroyOnExitBehavior extends AbstractBehavior {
    run(e) {
        super.run();

        const { PhysicsComponent: { pos }, CollisionComponent: {collider: { size }}} = e;
        const { em, renderSystem } = this.game;

        if (pos.x + size.x < 0 || pos.x > renderSystem.size.x || pos.y + size.y < 0 || pos.y > renderSystem.size.y) {
            em.destroy(e);
            this.state = 'end';
        }
    }
}
