class apiError extends Error{
    constructor(
        statuscode,
        message = 'something went wrong',
        errors = [],
        statck = ""

    ){
        super(message)
        this.statuscode = statuscode
        this.data = null
        this.message = message 
        this.success = false;
        this.errors = errors

        if(statck){
            this.statck=statck
        }
        else{
            error.capturestatck(this,this.constructor)
        }
    }
}

export {apiError}