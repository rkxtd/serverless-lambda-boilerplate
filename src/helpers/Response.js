module.exports.generateSuccessResponse = (response) => {
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
};

module.exports.generateErrorResponse = (error, code) => {
    error = (typeof error === 'string') ? { error } : error;

    return {
        statusCode: code || error && error.statusCode || 500,
        body: JSON.stringify(error || {error: 'Middleware. Unknown error'})
    }
};
