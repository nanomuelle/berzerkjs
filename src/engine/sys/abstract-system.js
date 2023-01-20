export class AbstractSystem {
    constructor() {
        this.updateOne = this.updateOne.bind(this);
    }

    updateOne(entity) {
        throw new Error('Must be implemented!');
    };
    
    update(entityManager) {
        entityManager.forEach(this.updateOne);
    }
}