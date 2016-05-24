/// <reference path="flickr.d.ts" />
import {FlickrApp} from './flikr';
let element=<HTMLDivElement>document.querySelector('.flikr-box');
let flickr=new FlickrApp({
    elem:element,
    uri:'https://api.flickr.com/services/rest/?',
    queryMethod:'flickr.photos.search',
    apiKey:'7fbc4d0fd04492d32fa9a2f718c6293e'
});