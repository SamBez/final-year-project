class ServerError extends Error{
    constructor(message, statusCode){
        super(message)
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail':'Error';
        Error.captureStackTrace(this, this.constructor);
    }

}
module.exports = ServerError;