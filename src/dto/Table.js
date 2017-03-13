import config from '../config';
import S3Driver from './aws/s3';
import DynamoDBDriver from './aws/dynamodb';

import UsersCollection from '../collections/Users';

export default class Table {
    constructor(driverName, collectionName) {
        if (!driverName || typeof driverName !== 'string') throw new Error('dto.DRIVER_NOT_DEFINED');
        if (!collectionName || typeof driverName !== 'string') throw new Error('dto.COLLECTION_NOT_DEFINED');

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

    fetch(errCB, doneCB, filters) {
        try {
            doneCB(this.collection.findAll(filters));
        } catch (e) {
            errCB(e.message);
        }
    }

    fetchOne(errCB, doneCB, filters) {
        try {
            doneCB(this.collection.findOne(filters));
        } catch (e) {
            errCB(e.message);
        }
    }

    create(record, errCB, doneCB) {
        try {
            doneCB(this.collection.create(record));
        } catch (e) {
            errCB(e.message);
        }
    }

    update(record, updateParams, errCB, doneCB) {
        try {
            doneCB(this.collection.update(record, updateParams));
        } catch (e) {
            errCB(e.message);
        }
    }

    dalate(record, errCB, doneCB) {
        try {
            doneCB(this.collection.delete(record));
        } catch (e) {
            errCB(e.message);
        }
    }
}