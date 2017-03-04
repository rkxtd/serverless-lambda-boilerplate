import { expect } from  'chai';
import AWS from 'aws-sdk-mock';

var reload = require('require-reload')(require);
const UsersMock = '[{ "firstName": "FirstName1", "lastName": "LastName1", "age": 21, "id": 1 }, { "firstName": "FirstName2", "lastName": "LastName2", "age": 34, "id": 2 }, { "firstName": "FirstName3", "lastName": "LastName3", "age": 11, "id": 3 }]';

describe( 'dto/Users GET', function() {
    it( 'Fetch All Users Success', done => {

        AWS.mock('S3', 'getObject', (params, callback) => { callback(null, { Body: UsersMock }); });
        var UsersDTO = reload('../../src/dto/Users');
        new UsersDTO.default().fetchUsers(err => {}, data => {
            expect(data.length).to.be.eq(3);
            AWS.restore('S3');
            done();
        });
    });

    it( 'Fetch All Users Fail', done => {

        AWS.mock('S3', 'getObject', (params, callback) => { callback({ error: 'error message' }); });
        var UsersDTO = reload('../../src/dto/Users');
        new UsersDTO.default().fetchUsers(err => {
            expect(err.error).to.be.eq('error message');
            AWS.restore('S3');
            done();
        }, data => {});
    });

    it( 'Fetch One User Success', done => {

        AWS.mock('S3', 'getObject', (params, callback) => { callback(null, { Body: UsersMock }); });
        var UsersDTO = reload('../../src/dto/Users');
        new UsersDTO.default().fetchUser(2, err => {}, data => {
            expect(data.firstName).to.be.eq('FirstName2');
            AWS.restore('S3');
            done();
        });
    });

    it( 'Fetch One User Fail', done => {

        AWS.mock('S3', 'getObject', (params, callback) => { callback({ error: 'error message' }); });
        var UsersDTO = reload('../../src/dto/Users');
        new UsersDTO.default().fetchUser(2, err => {
            expect(err.error).to.be.eq('error message');
            AWS.restore('S3');
            done();
        }, data => {});
    });
});