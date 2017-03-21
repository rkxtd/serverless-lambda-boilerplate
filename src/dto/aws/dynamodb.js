export default class DynamoDB {
    constructor() {
        this.loaded = 'dynamodb';
    }
    list() {
        return new Promise(() => ['mock']);
    }
    get() {
        return new Promise(() => ['mock']);
    }
    create() {
        return new Promise(() => ['mock']);
    }
    update() {
        return new Promise(() => ['mock']);
    }
    delete() {
        return new Promise(() => ['mock']);
    }

}