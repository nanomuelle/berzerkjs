import { ComponentFactory } from "../component-factory.js";

export class EntityManager {
    constructor(entityConstructor, componentFactory) {
        this._entityConstructor = entityConstructor;
        this._componentFactory = componentFactory;

        this._entities = [];
        this._destroyedEntities = new Set();
    }

    _initializeEntity(entity, { tags, components }) {
        if (Array.isArray(tags)) {
            entity.tags = [...tags];
        }

        for(const key of Object.keys(components)) {
            const componentName = `${ key }Component`;  
            entity[componentName] = this._componentFactory.of(key, components[key]);
        }
    }

    count() {
        return this._entities.length;
    }

    create(data) {
        const entity = new this._entityConstructor();
        this._entities.push(entity);                
        this._initializeEntity(entity, data);
        return entity;
    }

    destroy(entity) {
        this._destroyedEntities.add(entity);
    }

    forEach(fn) {
        this._entities.forEach(fn)
    }

    forEachPair(fn) {
        for (let index1 = 0; index1 < this._entities.length - 1; index1 ++) {
            const e1 = this._entities[index1];
            for (let index2 = index1 + 1; index2 <= this._entities.length - 1; index2 ++) {
                fn(e1, this._entities[index2]);
            }
        }
    }

    update() {
        this._entities = this._entities.reduce( 
            (acc, entity) => this._destroyedEntities.has(entity) ? acc : [...acc, entity] 
          , []
        );
        this._destroyedEntities = new Set();
    }
}