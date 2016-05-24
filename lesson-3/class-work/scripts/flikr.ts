/**
 * Created by igor on 1/13/16.
 */
// https://developer.mozilla.org/en-US/docs/Web/API/GlobalFetch/fetch
// uri: 'https://api.flickr.com/services/rest/?',
// apiKey: '7fbc4d0fd04492d32fa9a2f718c6293e'
// queryMethod: 'flickr.photos.search',
// ${this.uri}method=${this.qyeryMethod}&api_key=${this.apiKey}&text=${text}&page=1&format=json&nojsoncallback=1`


export class FlickrApp {
    private elem:HTMLElement;
    private uri:string;
    private queryMethod:string;
    private apiKey:string;
    private input:HTMLInputElement;
    private imagesBox:HTMLDivElement;
    private searchButton:HTMLButtonElement;
    private photos:IPhoto[];

    constructor(opt:opt) {
        let {elem, uri, queryMethod, apiKey}=opt;
        this.elem = elem;
        this.uri = uri;
        this.queryMethod = queryMethod;
        this.apiKey = apiKey;
        this.input = <HTMLInputElement>this.elem.querySelector('.flickr-search-input');
        this.imagesBox = <HTMLDivElement>this.elem.querySelector('.image-area');
        this.searchButton = <HTMLButtonElement>this.elem.querySelector('.flickr-search-button');
        this.searchButton.addEventListener('click', this.search.bind(this, this.render.bind(this)));
    }

    private render(body:any):void {
        this.photos = <IPhoto[]>body.photos.photo;
        let content = ``;
        for (let photo of this.photos) {
            content += `<div class="image-box">
<img src="https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg">
<p>${photo.title}</p>
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
        let url = new Request(`${this.uri}method=${this.queryMethod}&api_key=${this.apiKey}&
        text=${text}&page=1&format=json&nojsoncallback=1`);
        this.getPhotos(url, cb);
    }

    private getPhotos(input:string|Request, cb:(body:any)=>any):void {
        fetch(input)
            .then((response:Response):PromiseLike<any>=> {
                return response.json();
            }).then(cb);
    }
}
