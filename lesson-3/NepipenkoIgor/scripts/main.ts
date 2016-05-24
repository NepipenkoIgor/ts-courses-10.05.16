/// <reference path="fetch.d.ts" />
/// <reference path="../../../typings/index.d.ts" />

import flikr = require('./flikr');
import config = require('./config');
import fetch = require('./fetchEvent');

let elem = <HTMLElement>document.querySelector('.flikr-box');
/* tslint:disable */
let flickr = new flikr.FlikrApp({
    elem: elem,
    uri: config.uri,
    queryMethod: 'flickr.photos.search',
    apiKey: config.apiKey
});
flickr.setSearchHandler = fetch;
/* tslint:enable */
