const PromiseHandler = (callback) => (request, response, next) => {
    return Promise.resolve( callback(request, response, next) ).catch( (error) => {
        console.error("Promise Handler: ", error);
        response.json(error).status(500);
    } );
};

module.exports = {
    PromiseHandler
};