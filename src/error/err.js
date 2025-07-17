// contain definitions of error

export class ValidationError extends Error{
    constructor(message){
        super(message);
        this.name = 'validation error';
    }
}

export class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = 'not found error';
    }
}