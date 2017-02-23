'use strict';
import AWS from 'aws-sdk';
import config from './config';
const s3 = new AWS.S3();

class Users {
    constructor(users) {
        this.users = users;
    }

    getUserById(id) {
        let result = {};

        this.users.forEach(function(record) {
            if (record.id === id) {
                result = record;
                return false;
            }
        });

        return result;
    }

    getAllUsers() {
        return this.users;
    }
}

class ResponseHelper {
    static generateSuccessResponse(response) {
        return {
            statusCode: 200,
            body: JSON.stringify(response)
        }
    }

    static generateErrorResponse(error, code) {
        return {
            statusCode: code || error.statusCode || 500,
            body: JSON.stringify(error)
        }
    }
}

class UsersDTO {
    constructor() {

        this.usersResource = {
            Bucket: config.aws.s3,
            Key: 'resources/users.json'
        };
        this.UsersCollection = null;
        this.isUsersLoaded = false;
        this.usersLoadError = null;
    }

    getParams(additionalParams) {
        return Object.assign(this.usersResource, additionalParams);
    }

    fetchUsers(errCB, doneCB, id = null) {
        console.log('Fetching started', this.isUsersLoaded, this.getParams());
        let me = this;
        if (!this.isUsersLoaded) {
            s3.getObject(this.getParams(), function(err, data) {
                console.log('Fetching finished ', err, data);
                if (err) {
                    me.usersLoadError = err;
                    errCB(this.usersLoadError);
                } else {
                    this.UsersCollection = new Users(JSON.parse(data.Body.toString('utf8')));
                    this.isUsersLoaded = true;
                    if (id) {
                        doneCB(this.UsersCollection.getUserById(id));
                    } else {
                        doneCB(this.UsersCollection.getAllUsers());
                    }
                }
            });
        } else {
            if (id) {
                doneCB(this.UsersCollection.getUserById(id));
            } else {
                doneCB(this.UsersCollection.getAllUsers());
            }
            return;
        }
    }

    fetchUserById(id, errCB, doneCB) {
        this.fetchUsers(errCB, doneCB, id);
    }

    createUser(user, errCB, doneCB) {
        this.fetchUsers(err => errCB(err), users => {
            user.id = Math.floor((Math.random() * 10000000) + 1);
            users.push(user);

            s3.upload(this.getParams({
                Body: JSON.stringify(users)
            }), (err, data) => {
                if (err) {
                    return errCB(err);
                }

                doneCB(data)
            });
        });
    }

    updateUser(userToupdate, errCB, doneCB) {
        let updatedUser = {};
        this.fetchUsers(err => errCB(err), users => {
            users.forEach((user, i)=> {
                if (user.id === userToupdate.id) {
                    updatedUser = users[i] = Object.assign(user, userToupdate);
                }
            });
            console.log('Users: ', users);
            console.log('Updated user: ', updatedUser);
            s3.upload(this.getParams({
                Body: JSON.stringify(users)
            }), (err, data) => {
                if (err) {
                    return errCB(err);
                }

                doneCB(updatedUser)
            });
        });
    }
}

const UsersDataSource = new UsersDTO();

/**
 * @api {get} /users/ Get All Users
 * @apiVersion 0.1.0
 * @apiName UsersGet
 * @apiGroup User
 *
 * @apiSuccess {Array} results List of the user entities
 * @apiSuccess {Number} total number of user records
 * @apiError {Number} statusCode ErrorCode
 * @apiError {String} error Error Message
 */
module.exports.users = (event, context, callback) => {
    UsersDataSource.fetchUsers(
        err => {
            callback(null, ResponseHelper.generateErrorResponse(err));
            context.done();
        },
        users => {
            callback(null, ResponseHelper.generateSuccessResponse({
                results: users,
                total: users.length
            }));
            context.done();
        }
    );

};

/**
 * @api {get} /user/:id Get User by ID
 * @apiVersion 0.1.0
 * @apiName UserGet
 * @apiGroup User
 *
 * @apiParam {Number} id Users unique ID.
 *
 * @apiSuccess {Number} id List of the user objects
 * @apiSuccess {String} firstName First Name of the user
 * @apiSuccess {String} lastName Last Name of the user
 * @apiSuccess {Number} age Age of the user
 */
module.exports.user = (event, context, callback) => {

    const userId = parseInt(event.queryStringParameters.id);

    if (!userId) {
        callback(null, ResponseHelper.generateErrorResponse({
            error: 'User ID is required.',
            input: event,
            statusCode: 502
        }));
        context.done();
    } else {
        UsersDataSource.fetchUserById(
            userId,
            err => {
                callback(null, ResponseHelper.generateErrorResponse(err));
                context.done();
            },
            user => {
                if (user) {
                    callback(null, ResponseHelper.generateSuccessResponse(user));
                } else {
                    callback(null, ResponseHelper.generateErrorResponse({
                        error: 'User Not Found',
                        input: event,
                        statusCode: 404
                    }));
                }
                context.done();
            }
        );
    }



};

/**
 * @api {post} /user/ Create User
 * @apiName UserPost
 * @apiGroup User
 *
 * @apiParam {String} firstName User First Name.
 * @apiParam {String} lastName User Last Name.
 *
 * @apiSuccess {Number} id  Just created user id.
 * @apiSuccess {String} firstName User First Name.
 * @apiSuccess {String} lastName User Last Name.
 * @apiSuccess {Number} [age] Age of the user
 *
 * @apiError {String} error Error Message.
 */
module.exports.create = (event, context, callback) => {
    const queryParams = event.queryStringParameters || event;
    if (!queryParams || !queryParams.firstName || !queryParams.lastName) {
        callback(null, ResponseHelper.generateErrorResponse({
            error: 'firstName and lastName are required',
            input: event,
            statusCode: 502
        }));
        context.done();
        return ;
    }

    const newUser = {
        firstName: queryParams.firstName,
        lastName: queryParams.lastName,
        age: parseInt(queryParams.age) || 0
    };

    UsersDataSource.createUser(
        newUser,
        err => {
            callback(null, ResponseHelper.generateErrorResponse({
                error: 'Error while creating user',
                input: event,
                context: err,
                statusCode: err.statusCode
            }));
            context.done();
        },
        user => {
            callback(null, ResponseHelper.generateSuccessResponse({
                results: user
            }));
            context.done();
        }
    );
};

/**
 * @api {put} /user/:id Edit User by ID
 * @apiName userPut
 * @apiGroup User
 *
 * @apiParam {Number} id Existing user unique ID.
 * @apiParam {String} [firstName] User First Name.
 * @apiParam {String} [lastName] User Last Name.
 * @apiParam {String} [age] Age of the user
 *
 * @apiSuccess {Number} id  User Id.
 * @apiSuccess {String} firstName User First Name.
 * @apiSuccess {String} lastName User Last Name.
 * @apiSuccess {Number} [age] Age of the user
 *
 * @apiError {Number} statusCode ErrorCode.
 * @apiError {String} error Error Message.
 */
module.exports.update = (event, context, callback) => {
    const queryParams = event.queryStringParameters || event;
    if (!queryParams || !queryParams.id) {
        callback(null, ResponseHelper.generateErrorResponse({
            error: 'User ID is required',
            input: event,
            statusCode: 502
        }));

        context.done();
        return ;
    }

    const userToUpdate = {
        id: parseInt(queryParams.id)
    };

    if (queryParams.firstName) {
        userToUpdate.firstName = queryParams.firstName;
    }

    if (queryParams.lastName) {
        userToUpdate.lastName = queryParams.lastName;
    }

    if (queryParams.age) {
        userToUpdate.age = parseInt(queryParams.age);
    }

    UsersDataSource.updateUser(
        userToUpdate,
        err => {
            callback(null, ResponseHelper.generateErrorResponse({
                error: 'Error while creating user',
                input: event,
                context: err,
                statusCode: err.statusCode
            }));
            context.done();
        },
        updatedUser => {
            callback(null, ResponseHelper.generateSuccessResponse({
                results: updatedUser
            }));
            context.done();
        }
    );
};
