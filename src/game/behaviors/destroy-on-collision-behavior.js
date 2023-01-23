import { AbstractBehavior } from "./abstract-behavior.js";

export class DestroyOnCollisionBehavior extends AbstractBehavior {
    run(e) {
        super.run();
        if (e.CollisionComponent.getCollisionCount() > 0) {
            this.game.em.destroy(e);
            this.setStateEnd();
        }
    }
}
