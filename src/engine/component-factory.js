export class ComponentFactory {
    constructor() {
        this._componentBuilders = {};
    }

    addComponentBuilder(key, componentBuilder) {
        this._componentBuilders[key] = componentBuilder;
    }

    of(componentKey, componentData) {
        const componentBuilder = this._componentBuilders[componentKey];
        return new componentBuilder(componentData);
    }
}