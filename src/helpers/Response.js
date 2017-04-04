module.exports.generateSuccessResponse = (response) => {
    return {
        statusCode: 200,
        body: JSON.stringify(response),
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true
        }
    }
};

module.exports.generateErrorResponse = (error, code) => {
    error = (typeof error === 'string') ? { error } : error;

    return {
        statusCode: code || error && error.statusCode || 200,
        body: JSON.stringify(error || {error: 'Middleware. Unknown error'}),
        headers: {
            "Access-Control-Allow-Origin" : "*",
            "Access-Control-Allow-Credentials" : true
        }
    }
};
