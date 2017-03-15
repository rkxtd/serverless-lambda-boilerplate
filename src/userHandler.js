'use strict';
import Table from './dto/Table';
import ResponseHelper from './helpers/Response';
const UsersDTO = new Table('aws/s3', 'users');

/**
 * @api {get} /users/ GetAll
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
        UsersDTO
            .get(userId)
            .then((user) => {
                callback(null, ResponseHelper.generateSuccessResponse({
                    results: user
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
 * @apiVersion 0.1.0
 *
 * @apiParam {String} firstName User First Name.
 * @apiParam {String} lastName User Last Name.
 * @apiParam {Number} [age] Age of the user
 *
 * @apiSuccess {Number} id  Just created user id.
 * @apiSuccess {String} firstName User First Name.
 * @apiSuccess {String} lastName User Last Name.
 * @apiSuccess {Number} age Age of the user
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

    UsersDTO.create(newUser)
        .then(results => {
            callback(null, ResponseHelper.generateSuccessResponse({ results }));
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
 * @apiVersion 0.1.0
 *
 * @apiParam {Number} id Existing user unique ID.
 * @apiParam {String} [firstName] User First Name.
 * @apiParam {String} [lastName] User Last Name.
 * @apiParam {String} [age] Age of the user
 *
 * @apiSuccess {Number} id  User Id.
 * @apiSuccess {String} firstName User First Name.
 * @apiSuccess {String} lastName User Last Name.
 * @apiSuccess {Number} age Age of the user
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

    UsersDTO.update(id, userToUpdate)
        .then(results => {
            callback(null, ResponseHelper.generateSuccessResponse({ results }));
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
 * @apiVersion 0.2.0
 *
 * @apiParam {Number} id Existing user unique ID.
 *
 * @apiSuccess {Number} id  User Id.
 * @apiSuccess {String} firstName User First Name.
 * @apiSuccess {String} lastName User Last Name.
 * @apiSuccess {Number} age Age of the user
 *
 * @apiError {Number} statusCode ErrorCode.
 * @apiError {String} error Error Message.
 */
module.exports.delete = (event, context, callback) => {
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

    const userIdToDelete = parseInt(queryParams.id);

    UsersDTO.delete(userIdToDelete)
        .then(results => {
            callback(null, ResponseHelper.generateSuccessResponse({ results }));
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