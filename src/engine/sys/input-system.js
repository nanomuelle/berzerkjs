import { AbstractSystem } from "./abstract-system.js";

const KEYS = ['up', 'down', 'left', 'right', 'space'];

export class InputSystem extends AbstractSystem {
    constructor(inputManager) {
        super();
        this._inputManager = inputManager;
    }

    updateOne(entity) {
        const { InputComponent } = entity;

        if (!InputComponent) {
            return;
        }

        KEYS.forEach(key => {
            if (this._inputManager.isKeyPressed(key)) {
                const action = InputComponent[key];
                action(entity);
            }
        })
    };    
}