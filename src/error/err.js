// contain definitions of error

export class ValidationError extends Error{
    constructor(message, field){
        super(message);
        this.name = 'validation error';
        this.field = String(field);
    }
}

export class NotFoundError extends Error{
    constructor(message){
        super(message);
        this.name = 'not found error';
    }
}

export const ValidationErrObject = (message) => {
    return {
        name: 'validation error',
        error: new Error(message)
    };
};