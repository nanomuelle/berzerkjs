        // const managePlayerCollision = (player, other) => {
        //     if (other.tags.includes(TAGS.LETAL)) {
        //         console.log('Game over!');
        //         this.game.finish();
        //         return;
        //     }

        //     if (other.tags.includes(TAGS.EXIT)) {
        //         const usedEntry = other.DoorComponent.dir;
        //         this.finishScreen(usedEntry);
        //         return;
        //     }
        // };
import { TAGS } from "../tags.js";
import { AbstractBehavior } from "./abstract-behavior.js";

export class PlayerBehavior extends AbstractBehavior {
    run(e) {
        super.run();
        e.CollisionComponent.forEachCollision(other => {
            if (other.tags.includes(TAGS.LETAL)) {
                console.log('Game over!');
                this.game.finish();
                this.setStateEnd();
                return;
            }

            if (other.tags.includes(TAGS.EXIT)) {
                const usedEntry = other.DoorComponent.dir;
                this.game.lm.finishScreen(usedEntry);
                this.setStateEnd();
                return;
            }
        });
    }
}
        