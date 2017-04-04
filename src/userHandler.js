'use strict';
import Table from './dto/Table';
import ResponseHelper from './helpers/Response';
import querystring from 'querystring';

const UsersDTO = new Table('aws/s3', 'users');

/**
 * @api {get} /users/ GetAll
 * @apiVersion 0.1.0
 * @apiName UsersGet
 * @apiGroup User
 *
 * @apiSuccess {Array} results List of the user entities
 * @apiSuccess {Number} total number of user records
 *
 * @apiError {Number} statusCode ErrorCode
 * @apiError {String} error Error Message
 */
module.exports.users = (event, context, callback) => {
    UsersDTO
        .list()
        .then((users) => {
            callback(null, ResponseHelper.generateSuccessResponse({
                results: users,
                total: users.length
            }));
            context.done();
        })
        .catch((err) => {
            callback(null, ResponseHelper.generateErrorResponse(err.toString()));
            context.done();
        });
};

/**
 * @api {get} /user/:id Get One
 * @apiVersion 0.1.0
 * @apiName UserGet
 * @apiGroup User
 *
 * @apiParam {string} id User's unique ID.
 *
 * @apiSuccess {string} id uuid of the user
 * @apiSuccess {String} firstName First Name of the user
 * @apiSuccess {String} lastName Last Name of the user
 * @apiSuccess {Number} age Age of the user
 *
 * @apiError {Number} statusCode ErrorCode
 * @apiError {String} error Error Message
 */
module.exports.user = (event, context, callback) => {
    const userId = event.queryStringParameters.id;

    if (!userId) {
        callback(null, ResponseHelper.generateErrorResponse({
            error: 'User ID is required.',
            input: event,
            statusCode: 200
        }));
        context.done();
    } else {
        UsersDTO
            .get(userId)
            .then((user) => {
                callback(null, ResponseHelper.generateSuccessResponse({
                    results: user,
                    total: 1
                }));
                context.done();
            })
            .catch((err) => {
                callback(null, ResponseHelper.generateErrorResponse(err.toString()));
                context.done();
            });
    }



};

/**
 * @api {post} /user/ Create
 * @apiName UserPost
 * @apiGroup User
 *
 * @apiVersion 0.5.0
 *
 * @apiParam {String} firstName User First Name.
 * @apiParam {String} lastName User Last Name.
 * @apiParam {Number} [age] Age of the user
 *
 * @apiSuccess {Array} results List of the user entities
 * @apiSuccess {Number} total number of user records
 *
 * @apiError {Number} statusCode ErrorCode
 * @apiError {String} error Error Message
 */
module.exports.create = (event, context, callback) => {
    const params = querystring.decode(event.body);

    if (!params || !params.firstName || !params.lastName) {
        callback(null, ResponseHelper.generateErrorResponse({
            error: 'firstName and lastName are required',
            input: event,
            decodedBody: params,
            statusCode: 200
        }));
        context.done();
        return ;
    }

    const newUser = {
        firstName: params.firstName,
        lastName: params.lastName,
        age: parseInt(params.age) || 0
    };

    UsersDTO.create(newUser)
        .then(users => {
            if (users.error) {
                throw new Error(users.error);
            }
            callback(null, ResponseHelper.generateSuccessResponse({
                results: users,
                total: users.length
            }));
            context.done();
        })
        .catch(err => {
            callback(null, ResponseHelper.generateErrorResponse({
                error: 'Error while creating user',
                input: event,
                context: err,
                statusCode: err.statusCode
            }));
            context.done();
        }
    );
};

/**
 * @api {put} /user/:id Edit
 * @apiName userPut
 * @apiGroup User
 *
 * @apiVersion 0.5.0
 *
 * @apiParam {String} id Existing user unique ID.
 * @apiParam {String} [firstName] User First Name.
 * @apiParam {String} [lastName] User Last Name.
 * @apiParam {String} [age] Age of the user
 *
 * @apiSuccess {Array} results List of the user entities
 * @apiSuccess {Number} total number of user records
 *
 * @apiError {Number} statusCode ErrorCode
 * @apiError {String} error Error Message
 */
module.exports.update = (event, context, callback) => {
    const queryParams = event.queryStringParameters || event;
    const params = querystring.decode(event.body);

    if (!queryParams || !queryParams.id) {
        callback(null, ResponseHelper.generateErrorResponse({
            error: 'User ID is required',
            input: event,
            statusCode: 200
        }));

        context.done();
        return ;
    }

    const userToUpdate = {
        id: queryParams.id
    };

    if (params.firstName) {
        userToUpdate.firstName = params.firstName;
    }

    if (params.lastName) {
        userToUpdate.lastName = params.lastName;
    }

    if (params.age) {
        userToUpdate.age = parseInt(params.age);
    }

    UsersDTO.update(userToUpdate.id, userToUpdate)
        .then(users => {
            if (users.error) {
                throw new Error(users.error);
            }

            callback(null, ResponseHelper.generateSuccessResponse({
                results: users,
                total: users.length
            }));
            context.done();
        })
        .catch(err => {
                callback(null, ResponseHelper.generateErrorResponse({
                    error: 'Error while updating user',
                    input: event,
                    context: err,
                    statusCode: err.statusCode
                }));
                context.done();
            }
        );
};

/**
 * @api {delete} /user/:id Delete
 * @apiName userDelete
 * @apiGroup User
 *
 * @apiVersion 0.5.0
 *
 * @apiParam {Number} id Existing user unique ID.
 *
 * @apiSuccess {Array} results List of the user entities
 * @apiSuccess {Number} total number of user records
 *
 * @apiError {Number} statusCode ErrorCode
 * @apiError {String} error Error Message
 */
module.exports.delete = (event, context, callback) => {
    const queryParams = event.queryStringParameters || event;
    if (!queryParams || !queryParams.id) {
        callback(null, ResponseHelper.generateErrorResponse({
            error: 'User ID is required',
            input: event,
            statusCode: 200
        }));

        context.done();
        return ;
    }

    const userIdToDelete = queryParams.id;

    UsersDTO.delete(userIdToDelete)
        .then(users => {
            if (users.error) {
                throw new Error(users.error);
            }
            callback(null, ResponseHelper.generateSuccessResponse({
                results: users,
                total: users.length
            }));
            context.done();
        })
        .catch(err => {
                callback(null, ResponseHelper.generateErrorResponse({
                    error: 'Error while deleting user',
                    input: event,
                    context: err,
                    statusCode: err.statusCode
                }));
                context.done();
            }
        );
};