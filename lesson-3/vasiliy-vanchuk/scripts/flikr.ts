/// <reference path="../../../typings/globals/q/index.d.ts" />
/// <reference path="../../../typings/globals/lodash/index.d.ts" />
/**
 * /// <reference path="../../../typings/index.d.ts" />
 */
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
// uri: 'https://api.flickr.com/services/rest/?',
// apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
// queryMethod: 'flickr.photos.search',
// ${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`

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
    blob:Blob;
    FormData:FormData;
    BufferSource:any;
}
interface Response extends ResponseBody {
    arrayBuffer:()=> PromiseLike<ArrayBuffer>;
    blob:()=> PromiseLike<Blob>;
    json():PromiseLike<any>;
}

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

class FlickrApp {
    private elem:HTMLElement;
    private uri:string;
    private queryMethod:string;
    private usersQueryMethod:string;
    private apiKey:string;
    private input:HTMLInputElement;
    private imagesBox:HTMLDivElement;
    private searchButton:HTMLButtonElement;
    private photos:IPhoto[];

    constructor(opt:opt) {
        let {elem, uri, queryMethod, usersQueryMethod, apiKey}=opt;
        this.elem = elem;
        this.uri = uri;
        this.queryMethod = queryMethod;
        this.usersQueryMethod = usersQueryMethod;
        this.apiKey = apiKey;
        this.input = <HTMLInputElement>this.elem.querySelector('.flickr-search-input');
        this.imagesBox = <HTMLDivElement>this.elem.querySelector('.image-area');
        this.searchButton = <HTMLButtonElement>this.elem.querySelector('.flickr-search-button');
        this.searchButton.addEventListener('click', _.debounce(this.search.bind(this, this.render.bind(this)), 500));
    }

    private render(body:any):void {
        this.photos = <IPhoto[]>body.photos.photo;
        let content = ``;
        for (let photo of this.photos) {
            content += `<div class="image-box">
<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">
<p>${photo.title} <br /><strong>by ${photo._user.username._content}</strong></p>
</div>`;
        }
        this.imagesBox.innerHTML = content;
    }

    private search(cb:(body:any)=>any):void {
        if (!this.input.value) {
            return;
        }
        let text = this.input.value;
        this.input.value = '';
        let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`);
        this.getPhotos(url, cb);
    }

    private sort(body:any):any {
        const newBody = _.cloneDeep(body, true);
        newBody.photos.photo = _.sortBy(newBody.photos.photo, 'title');
        return newBody;
    }

    private getOwnersId(body:any):string[] {
        return _.uniq(_.map(body.photos.photo, (item) => item.owner));
    }

    private getUsers(input:string[]):PromiseLike<any> {
        return Q.all(input.map((userId) => {
            let url = new Request(`${this.uri}method=${this.usersQueryMethod}&api_key=${this.apiKey}&user_id=${userId}&format=json&nojsoncallback=1`);
            return fetch(url)
                .then((response:Response):PromiseLike<any> => response.json());
        }));
    }

    private getPhotos(input:string|Request, cb:(body:any)=>any):void {
        fetch(input)
            .then((response:Response):PromiseLike<any>=> {
                return response.json();
            })
            .then((data:PromiseLike<any>):PromiseLike<any> => this.sort(data))
            .then((data:PromiseLike<any>):PromiseLike<any> => {
                const ownersIds = this.getOwnersId(data);
                return this.getUsers(ownersIds)
                    .then((users:any[]):PromiseLike<any> => {
                        data.photos.photo.forEach((photo) => {
                            photo._user = (_.find(users, (user) => user.person.id === photo.owner) || {}).person;
                        });
                        return data;
                    });
            })
            .then(cb);
    }
}

let element = <HTMLDivElement>document.querySelector('.flikr-box');
let flickr = new FlickrApp({
    elem: element,
    uri: 'https://api.flickr.com/services/rest/?',
    queryMethod: 'flickr.photos.search',
    usersQueryMethod: 'flickr.people.getInfo',
    apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
});

// TODO: describe photo item/response structure
// TODO: describe peopleInfo item/response structure
// TODO: add type definitions for .getUsers()
// TODO: add type definitions for .getOwnersId()
// TODO: add type definitions for .sort()