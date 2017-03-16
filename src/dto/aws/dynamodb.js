export default class DynamoDB {
    constructor() {
        console.log('DynamoDB Initialized');
        this.loaded = 'dynamodb';
    }
    list() {
        return new Promise();
    }
}