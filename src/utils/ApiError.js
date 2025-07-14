//Common class to handle error
//we are using express for this ApiError class. Error class belongs to express js
class ApiError extends Error{
    constructor(
        statusCode,
        message = "Something went wrong",
        errors = [],
        stack = ""
    ){
        super(message)
        this.statusCode = statusCode   //this keyword is used to override variables
        this.errors = errors
        this.stack = stack
        this.data = null
        this.message = message
        this.success = false

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this ,  this.constructor)
        }

    }
}

export { ApiError }