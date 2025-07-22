export const ResponseHelper = (h, body, statusCode) => {
    return h.response(body).code(statusCode);
};

export const EnumStatus = {
    SUCCESS:200,
    CREATED:201,
    BADREQUEST:400,
    NOTFOUND:404,
    SERVERERROR:500
}; 