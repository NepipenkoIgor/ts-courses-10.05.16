interface Headers {
    append:(name:string, value:string)=>void;
    delete:(name:string)=>void;
    values:any[];
}


interface InitRequest {
    method:string;
    headers:string|Headers;
    cache:string;
}

interface Request {
    method:string;
    redirect:string;
    cache:string;
}

declare var Request:{
    prototype:Request;
    new(input:string|Request, init?:InitRequest):Request;
};

interface InitResponse {
    status:string;
    statusText:string;
    headers:string|Headers;
}
interface ResponseBody {
    arrayBuffer:()=> PromiseLike<ArrayBuffer>;
    blob:()=> PromiseLike<Blob>;
    json():PromiseLike<any>;
}
interface Response extends ResponseBody {}

declare var Response:{
    prototype:Response;
    new(input:ResponseBody, init:InitResponse):Response;
};

declare function fetch(input:string|Request):PromiseLike<Response>

type opt ={
    elem:HTMLElement,
    uri:string,
    queryMethod:string,
    apiKey:string
}

interface IPhoto {
    farm:number;
    id:string;
    server:string;
    secret:string;
    title:string;
}
