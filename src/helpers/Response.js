module.exports.generateSuccessResponse = (response) => {
    return {
        statusCode: 200,
        body: JSON.stringify(response)
    }
};

module.exports.generateErrorResponse = (error, code) => {
    return {
        statusCode: code || error && error.statusCode || 500,
        body: JSON.stringify(error || {error: 'Middleware. Unknown error'})
    }
};
