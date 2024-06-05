class apiError extends Error{
    constructor(
        statuscode,
        message = 'something went wrong',
        errors = [],
        stack = ""

    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message 
        this.success = false;
        this.errors = errors

        if(stack){
            this.stack=stack
        }
        else{
            error.capturestatck(this,this.constructor)
        }
    }
}

export {apiError}