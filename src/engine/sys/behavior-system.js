import { AbstractSystem } from "./abstract-system.js";

export class BehaviorSystem extends AbstractSystem {
    updateOne(entity) {
        const { BehaviorComponent } = entity;
        if (BehaviorComponent) {
            const { behavior } = BehaviorComponent;
            if (behavior) {
                if (behavior.isStateEnd()) {
                    BehaviorComponent.behavior = behavior.nextBehavior;
                } else {
                    behavior.run(entity);
                }
            }
        }
    };    
}