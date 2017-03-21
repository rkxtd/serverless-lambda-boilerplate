import config from '../config';
import S3Driver from './aws/s3';
import DynamoDBDriver from './aws/dynamodb';

import UsersCollection from '../collections/Users';

export default class Table {
    constructor(driverName, collectionName) {
        if (!driverName || typeof driverName !== 'string') throw new Error('dto.DRIVER_NOT_DEFINED');
        if (!collectionName || typeof collectionName !== 'string') throw new Error('dto.COLLECTION_NOT_DEFINED');

        driverName = driverName.toLowerCase();
        collectionName = collectionName.toLowerCase();

        switch (driverName) {
            case 'aws/s3':
                this.driver = new S3Driver(config.entities.users);
                break;
            case 'aws/dynamo':
            case 'aws/dynamodb':
                this.driver = new DynamoDBDriver(config.entities.users);
                break;
            default:
                throw new Error('dto.DRIVER_NOT_FOUND');
                break;
        }

        switch (collectionName) {
            case 'users':
                this.collection = new UsersCollection(this.driver);
                break;
            default:
                throw new Error('dto.COLLECTION_NOT_FOUND');
                break;
        }

        this.collection.sync();
    }

    list(filters) {
        return this.collection
            .sync()
            .then(() => {
                return this.collection.findAll(filters)
            });
    }

    get(id) {
        return this.collection
            .sync()
            .then(() => {
                return this.collection.findOne(id)
            });
    }

    create(record) {
        return this.collection.create(record);
    }

    update(record, updateParams) {
        return this.collection.update(record, updateParams);
    }

    delete(record) {
        return this.collection.delete(record);
    }
}