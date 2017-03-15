// import { expect } from  'chai';
// import AWS from 'aws-sdk-mock';
//
// const reload = require('require-reload')(require);
// const UsersMock = '[{ "firstName": "FirstName1", "lastName": "LastName1", "age": 21, "id": 1 }, { "firstName": "FirstName2", "lastName": "LastName2", "age": 34, "id": 2 }, { "firstName": "FirstName3", "lastName": "LastName3", "age": 11, "id": 3 }]';
// const UserMock = '{ "firstName": "FirstName1", "lastName": "LastName1", "age": 21, "id": 1 }';
//
// describe( 'dto/S3/Users GET', function() {
//     it('Fetch All Users Success', done => {
//         AWS.mock('S3', 'getObject', (params, callback) => { callback(null, {Body: UsersMock}); });
//         const UsersDTO = reload('../../src/dto/Users');
//         new UsersDTO.default().fetchUsers(err => {
//         }, data => {
//             expect(data.length).to.be.eq(3);
//             AWS.restore('S3');
//             done();
//         });
//     });
//
//     it('Fetch All Users Fail', done => {
//         AWS.mock('S3', 'getObject', (params, callback) => { callback({error: 'error message'}); });
//         const UsersDTO = reload('../../src/dto/Users');
//         new UsersDTO.default().fetchUsers(err => {
//             expect(err.error).to.be.eq('error message');
//             AWS.restore('S3');
//             done();
//         }, data => {
//         });
//     });
// });
//
// describe( 'dto/S3/User GET', function() {
//     it( 'Fetch One User Success', done => {
//         AWS.mock('S3', 'getObject', (params, callback) => { callback(null, { Body: UsersMock }); });
//         const UsersDTO = reload('../../src/dto/Users');
//         new UsersDTO.default().fetchUser(2, err => {}, data => {
//             expect(data.firstName).to.be.eq('FirstName2');
//             AWS.restore('S3');
//             done();
//         });
//     });
//
//     it( 'Fetch One User Fail', done => {
//         AWS.mock('S3', 'getObject', (params, callback) => { callback({ error: 'error message' }); });
//         const UsersDTO = reload('../../src/dto/Users');
//         new UsersDTO.default().fetchUser(2, err => {
//             expect(err.error).to.be.eq('error message');
//             AWS.restore('S3');
//             done();
//         }, data => {});
//     });
// });
//
// describe( 'dto/S3/User POST', function() {
//     it( 'Create User Success', done => {
//         AWS.mock('S3', 'upload', (params, callback) => { callback(null, { Body: UserMock }); });
//         AWS.mock('S3', 'getObject', (params, callback) => { callback(null, { Body: UsersMock }); });
//         const UsersDTO = reload('../../src/dto/Users');
//         new UsersDTO.default().createUser({
//             firstName: UserMock.firstName,
//             lastName: UserMock.lastName,
//             age: UserMock.age
//         }, err => {}, data => {
//             expect(data.firstName).to.be.eq('FirstName1');
//             expect(data.id).to.be.eq(1);
//             AWS.restore('S3');
//             done();
//         });
//     });
//
//     it( 'Create User Fail', done => {
//         AWS.mock('S3', 'upload', (params, callback) => { callback({ error: 'error message' }); });
//         AWS.mock('S3', 'getObject', (params, callback) => { callback({ error: 'error message' }); });
//         const UsersDTO = reload('../../src/dto/Users');
//         new UsersDTO.default().createUser({
//             firstName: UserMock.firstName,
//             lastName: UserMock.lastName,
//             age: UserMock.age
//         }, err => {
//             expect(err.error).to.be.eq('error message');
//             AWS.restore('S3');
//             done();
//         }, data => {});
//     });
// });
//
// describe( 'dto/S3/User PUT', function() {
//     it( 'Update User Success', done => {
//         AWS.mock('S3', 'getObject', (params, callback) => { callback(null, { Body: UsersMock }); });
//         AWS.mock('S3', 'upload', (params, callback) => { callback(null, { Body: Object.assign(UserMock, {firstName: 'NewFirstName1'})}); });
//         const UsersDTO = reload('../../src/dto/Users');
//         new UsersDTO.default().updateUser({
//             id: 1,
//             firstName: 'NewFirstName1'
//         }, err => {}, data => {
//             expect(data.firstName).to.be.eq('NewFirstName1');
//             expect(data.age).to.be.eq(21);
//             expect(data.id).to.be.eq(1);
//             AWS.restore('S3');
//             done();
//         });
//     });
//
//     it( 'Update User Fail', done => {
//         AWS.mock('S3', 'getObject', (params, callback) => { callback(null, { Body: UsersMock }); });
//         AWS.mock('S3', 'upload', (params, callback) => { callback({ error: 'error message' }); });
//         const UsersDTO = reload('../../src/dto/Users');
//         new UsersDTO.default().updateUser({
//             id: 1,
//             firstName: 'NewFirstName1'
//         }, err => {
//             expect(err.error).to.be.eq('error message');
//             AWS.restore('S3');
//             done();
//         }, data => {});
//     });
// });
//
// describe( 'dto/S3/User Delete', function() {
//     it( 'Delete User Success', done => {
//         AWS.mock('S3', 'getObject', (params, callback) => { callback(null, { Body: UsersMock }); });
//         AWS.mock('S3', 'upload', (params, callback) => { callback(null, { Body: UserMock }); });
//         const UsersDTO = reload('../../src/dto/Users');
//         new UsersDTO.default().deleteUser(1, err => {}, data => {
//             expect(data.firstName).to.be.eq('FirstName1');
//             expect(data.age).to.be.eq(21);
//             expect(data.id).to.be.eq(1);
//             AWS.restore('S3');
//             done();
//         });
//     });
//
//     it( 'Delete User Fail', done => {
//         AWS.mock('S3', 'getObject', (params, callback) => { callback(null, { Body: UsersMock }); });
//         AWS.mock('S3', 'upload', (params, callback) => { callback({ error: 'error message' }); });
//         const UsersDTO = reload('../../src/dto/Users');
//         new UsersDTO.default().deleteUser(1, err => {
//             expect(err.error).to.be.eq('error message');
//             AWS.restore('S3');
//             done();
//         }, data => {});
//     });
// });