import { expect } from 'chai';
import Table from '../../src/dto/Table';

describe( 'dto/Table constructor', function() {
    it('Fail without driverName', done => {
        try {
            new Table();
        } catch (e) {
            expect(e.message).to.eq('dto.DRIVER_NOT_DEFINED');
            done();
        }
    });

    it('Fail if driverName not a string', done => {
        try {
            new Table(123);
        } catch (e) {
            expect(e.message).to.eq('dto.DRIVER_NOT_DEFINED');
            done();
        }
    });

    it('Fail without collectionName', done => {
        try {
            new Table('driver');
        } catch (e) {
            expect(e.message).to.eq('dto.COLLECTION_NOT_DEFINED');
            done();
        }
    });

    it('Fail if collectionName not a string', done => {
        try {
            new Table('driver', 123);
        } catch (e) {
            expect(e.message).to.eq('dto.COLLECTION_NOT_DEFINED');
            done();
        }
    });

    it('Fail if driver not found', done => {
        try {
            new Table('driver', 'collection');
        } catch (e) {
            expect(e.message).to.eq('dto.DRIVER_NOT_FOUND');
            done();
        }
    });

    it('Fail if collection not found', done => {
        try {
            new Table('aws/s3', 'collection');
        } catch (e) {
            expect(e.message).to.eq('dto.COLLECTION_NOT_FOUND');
            done();
        }
    });

    it('Check s3 driver loading success', done => {
        const table = new Table('aws/s3', 'users');
        expect(table.driver.resource.Key).to.eq('resources/users.json');

        done();
    });

    // it('Check dynamodb driver loading success', done => {
    //     const table = new Table('aws/dynamodb', 'users');
    //     expect(table.driver.loaded).to.eq('dynamodb');
    //
    //     done();
    // });

    it('Check collection loading success', done => {
        const table = new Table('aws/s3', 'users');
        expect(table.collection.model().firstName.required).to.eq(true);

        done();
    });
});