import { TAGS } from "./tags.js";
import { Vec2d } from "../engine/vec2d.js";
import { BehaviorComponent } from "./cmp/behavior-component.js";
import { DestroyOnExitBehavior } from "./behaviors/destroy-on-exit-behavior.js";
import { ScrollOutBehavior } from "./behaviors/scroll-out-behavior.js";
import { createPlayer } from "./entities/player.js";
import { createEWall, createNWall, createOWall, createSWall } from "./entities/wall.js";
import { createDoor } from "./entities/door.js";

export class LevelManager {
    constructor(game) {
        this.game = game;
        this.em = game.em;
    }

    createDoors(usedEntry) {
        const doors = [
            { pos: [20,  0], dir: 'N', size: [10, 1], isOpen: usedEntry !== 'S' },
            { pos: [20, 14], dir: 'S', size: [10, 1], isOpen: usedEntry !== 'N' },
            { pos: [ 0,  5], dir: 'O', size: [ 1, 5], isOpen: usedEntry !== 'E' },
            { pos: [49,  5], dir: 'E', size: [ 1, 5], isOpen: usedEntry !== 'O' }
        ];

        doors.forEach(door => createDoor(this.em, door));
    }

    createWalls() {
        createEWall(this.em, [ 0, 0]);
        createEWall(this.em, [10, 0]);
        createEWall(this.em, [30, 0]);
        createEWall(this.em, [40, 0]);

        createEWall(this.em, [ 0, 14]);
        createEWall(this.em, [10, 14]);
        createEWall(this.em, [30, 14]);
        createEWall(this.em, [40, 14]);

        createSWall(this.em, [0,  0]);
        createSWall(this.em, [0, 10]);

        createSWall(this.em, [49,  0]);
        createSWall(this.em, [49, 10]);
    }

    createMaze() {
        const pillars = [
            [10, 4], [20, 4], [30, 4], [40, 4],
            [10, 9], [20, 9], [30, 9], [40, 9]
        ];

        pillars.forEach(pilarPos => {
            const rnd = Math.random();
            if (rnd >= 0.75) {
                createEWall(this.em, pilarPos);
            } else if (rnd >= 0.5) {
                createSWall(this.em, pilarPos);
            } else if (rnd >= 0.25) {
                createOWall(this.em, pilarPos);
            } else {
                createNWall(this.em, pilarPos);
            }
        });
    }

    loadLevel(usedEntry) {
        this.createWalls();
        this.createDoors(usedEntry);
        this.createMaze();
        createPlayer(this.em, usedEntry);
    }

    finishScreen(usedEntry) {
        this._lastUsedEntry = usedEntry;

        this.em.forEach(e => {
            const scrollOutBehavior = new ScrollOutBehavior(
                this.game, 
                new DestroyOnExitBehavior(this.game),
                usedEntry
            )
            e.BehaviorComponent = new BehaviorComponent(scrollOutBehavior);            
        });
    }

    update(collisionSystem) {
        if (this.game.im.isKeyPressed('escape')) {
            console.log('ESCAPE!!!');
            this.game.finish();
            return;
        }

        if (this.em.count() === 0) {
            this.loadLevel(this._lastUsedEntry);
            return;
        }

        const stopEntity = entity => {
            entity.PhysicsComponent.restorePos();
            entity.PhysicsComponent.setVel(Vec2d.of(0, 0));
        };

        const managePlayerCollision = (player, other) => {
            if (other.tags.includes(TAGS.LETAL)) {
                console.log('Game over!');
                this.game.finish();
                return;
            }

            if (other.tags.includes(TAGS.EXIT)) {
                const usedEntry = other.DoorComponent.dir;
                this.finishScreen(usedEntry);
                return;
            }
        };

        collisionSystem.foreEachCollision(
            ([a, b]) => {
                if (a.tags.includes(TAGS.PLAYER)) {
                    managePlayerCollision(a, b);
                }

                if (a.tags.includes(TAGS.BULLET)) {
                    this.em.destroy(a);
                }

                if (b.tags.includes(TAGS.SOLID)) {
                    stopEntity(a);
                }
            }
        )        
    }
}