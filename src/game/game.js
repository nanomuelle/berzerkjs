import { EntityManager } from "../engine/man/entity-manager.js";
import { InputManager } from "../engine/man/input-manager.js";

import { InputSystem } from "../engine/sys/input-system.js";
import { PhysicsSystem } from "../engine/sys/physics-system.js";
import { CollisionSystem } from "../engine/sys/collision-system.js";
import { RenderSystem } from "../engine/sys/render-system.js";
import { BehaviorSystem } from "../engine/sys/behavior-system.js";

import { Entity } from "./cmp/entity.js";
import { LevelManager } from "./level-manager.js";
import { TAGS } from "./tags.js";
import { Vec2d } from "../engine/vec2d.js";
import { ComponentFactory } from "../engine/component-factory.js";
import { RenderComponent } from "./cmp/render-component.js";
import { PhysicsComponent } from "./cmp/physics-component.js";
import { CollisionComponent } from "./cmp/collision-component.js";
import { DoorComponent } from "./cmp/door-component.js";
import { InputComponent } from "./cmp/input-component.js";
import { BehaviorComponent } from "./cmp/behavior-component.js";

const createEntityManager = () => {
    const componentFactory = new ComponentFactory();
    componentFactory.addComponentBuilder('Render', RenderComponent);
    componentFactory.addComponentBuilder('Physics', PhysicsComponent);
    componentFactory.addComponentBuilder('Collision', CollisionComponent);
    componentFactory.addComponentBuilder('Door', DoorComponent);
    componentFactory.addComponentBuilder('Input', InputComponent);
    componentFactory.addComponentBuilder('Behavior', BehaviorComponent);

    return new EntityManager(Entity, componentFactory);
}

export class Game {
    constructor() {
        this.im = new InputManager();

        this.em = createEntityManager();
        this.lm = new LevelManager(this);

        this.renderSystem = new RenderSystem(Vec2d.of(50, 15));
        this.physicsSystem = new PhysicsSystem(Vec2d.of(50, 15));
        this.collisionSystem = new CollisionSystem();
        this.inputSystem = new InputSystem(this.im);
        this.BehaviorSystem = new BehaviorSystem();

        this._running = false;
        this.loop = this.loop.bind(this);
    }

    init() {
        this.im.init();
        this.lm.loadLevel('N');
    }

    renderDebug() {
        this.renderSystem._screen.printSprite(0, 0, [String(this.em.count())]);
        this.renderSystem._screen.render();
    }

    step() {
        this.renderSystem.update(this.em);

        this.renderDebug();

        this.inputSystem.update(this.em);

        this.BehaviorSystem.update(this.em);

        this.physicsSystem.update(this.em);
        this.collisionSystem.update(this.em);

        this.lm.update();
        this.em.update();        
        this.im.update();
    }

    loop() {
        this.step();

        if (this._running) {
            setTimeout(this.loop, 1000 / 30);
        }
    }

    start() {
        this._frame = 0;
        if (this._running) {
            return;
        }

        this._running = true;
        this.loop();
    }

    finish() {
        this._running = false;
        process.exit(0);
    }
}