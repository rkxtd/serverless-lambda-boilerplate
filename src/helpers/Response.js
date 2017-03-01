export default class ResponseHelper {
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