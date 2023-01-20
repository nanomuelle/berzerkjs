export class AbstractBehavior {
    constructor(game, nextBehavior) {
        this.game = game;
        this.nextBehavior = nextBehavior;
        this.setStateReady();
    }

    setStateRunning() {
        this._state = 'running';
    }

    setStateReady() {
        this._state = 'ready';
    }

    run(e) {
        if (this.isStateEnd()) {
            return;
        }

        this.setStateRunning();
    }

    setStateEnd() {
        this._state = 'end';
    }

    isStateEnd() {
        return this._state === 'end';
    }
}