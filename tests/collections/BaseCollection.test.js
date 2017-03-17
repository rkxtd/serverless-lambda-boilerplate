import { expect } from 'chai';
import BaseCollection from '../../src/collections/BaseCollection';

class MockDriver {}

describe( 'collections/BaseCollection constructor', function() {
    it('Fail without driver instance', done => {
        try {
            new BaseCollection();
        } catch (e) {
            expect(e.message).to.eq('collection.DRIVER_NOT_DEFINED');
            done();
        }
    });

    it('Pass with driver instance', done => {
        new BaseCollection(new MockDriver());
        done();
    });

    it('Base Model should have ID field, required and type uuid', done => {
        const idField = new BaseCollection(new MockDriver()).baseModel()['id'];
        expect(idField.required).to.be.eq(true);
        expect(idField.type).to.be.eq('uuid');

        done();
    });

    it('Model should be empty', done => {
        expect(Object.keys(new BaseCollection(new MockDriver()).model()).length).to.be.eq(0);

        done();
    });
});

describe( 'collections/BaseCollection findOne', function() {
    const collection = new BaseCollection(new MockDriver());
    collection.items = [{id: 1, b: 2}, {id: 2, b: 2, c: 3}, {id: 3, b: 2, d: 4}];

    it('filterFN should work with id', done => {
        expect(JSON.stringify(collection.findAll(item => item.id === 1))).to.be.eq('[{"id":1,"b":2}]');

        done();
    });

    it('filterFN should work with any fn', done => {
        expect(collection.findAll(item => item.b === 2).length).to.be.eq(3);
        expect(collection.findAll(item => item.c === 3).length).to.be.eq(1);

        done();
    });

    it('filterFN should return empty array', done => {
        const result = collection.findAll(item => item.id === 222);
        expect(result.length).to.be.eq(0);
        expect(Array.isArray(result)).to.be.eq(true);

        done();
    });

    it('filterFN should throw exception on wrong arguments', done => {
        try {
            collection.findAll('some string');
        } catch (e) {
            expect(e.message).to.eq('collection.FILTER_FUNCTION_REQUIRED');
            done();
        }
    });
});

describe( 'collections/BaseCollection findOne', function() {
    const collection = new BaseCollection(new MockDriver());
    collection.items = [{id: 1, b: 2}, {id: 2, b: 2, c: 3}, {id: 3, b: 2, d: 4}];

    it('should return correct item by id', done => {
        expect(collection.findOne(3).d).to.be.eq(4);

        done();
    });

    it('filterFN should return null by non existing id', done => {
        expect(collection.findOne(10)).to.be.eq(null);

        done();
    });

    it('filterFN should throw exception on wrong arguments', done => {
        try {
            collection.findOne(function() {});
        } catch (e) {
            expect(e.message).to.eq('collection.UUID_REQUIRED');
            done();
        }

    });
});