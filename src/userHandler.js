'use strict';
import UsersDTO from './dto/Users';
import ResponseHelper from './helpers/Response';

console.log(UsersDTO);
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
        UsersDataSource.fetchUser(
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

    UsersDataSource.createUser(
        newUser,
        err => {
            callback(null, ResponseHelper.generateErrorResponse({
                error: 'Error while updating user',
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

/**
 * @api {delete} /user/:id Delete User by ID
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

    UsersDataSource.deleteUser(
        userIdToDelete,
        err => {
            callback(null, ResponseHelper.generateErrorResponse({
                error: 'Error while deleting user',
                input: event,
                context: err,
                statusCode: err.statusCode
            }));
            context.done();
        },
        deletedUser => {
            callback(null, ResponseHelper.generateSuccessResponse({
                results: deletedUser
            }));
            context.done();
        }
    );
};