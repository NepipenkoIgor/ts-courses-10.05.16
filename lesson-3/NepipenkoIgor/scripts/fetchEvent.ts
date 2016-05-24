export = (input:string | Request):PromiseLike<any> => {
    return fetch(input)
        .then((response:Response):PromiseLike<any> => {
            return response.json();
        });
};
