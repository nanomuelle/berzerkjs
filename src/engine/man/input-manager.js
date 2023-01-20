import readline from 'readline';

export class InputManager {
    constructor() {
        this._buffer = {};
    }

    init() {
        readline.emitKeypressEvents(process.stdin);
        process.stdin.setRawMode(true);
        process.stdin.on('keypress', (str, key) => {
            // if (key.name === 'escape') {
            //     process.exit(0);
            // }
            this._buffer[key.name] = true;
        });
    }

    isKeyPressed(name) {
        return this._buffer[name] === true;
    }

    update() {
        this._buffer = {};
    }
}