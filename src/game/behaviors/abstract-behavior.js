export class AbstractBehavior {
    constructor(game, nextBehavior) {
        this.game = game;
        this.nextBehavior = nextBehavior;
        this.state = 'ready';
    }

    run(e) {
        if (this.state === 'end') {
            return;
        }

        this.state = 'running';
    }
}