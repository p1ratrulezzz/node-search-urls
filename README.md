# Search Urls module for node


## Description

Searches for URLs in text and return found URLs as an array. 
Also can check if domain name is correct or not according to TLD list database. 
Useful to find URLs in text. 
Can find url using http:// or without. Example: "Some text and then goes link example.com". 
Using this module will give: ["example.com"]. 

Simple utility to find URLs in text.

## Examples

```javascript
const searchUrls = require('search-urls').searchUrls;


let str = ` This is just simple text with urls in it google.com.
Some urls have non-ASCI characters.
maselkowski.pl
m.maselkowski.pl
www.m.maselkowski.pl
www.masełkowski.pl.com
xn--masekowski-d0b.pl
中国互联网络信息中心.中国 Even this must be found
masełkowski.pl.
中国互联网络信息中心.xn--masekowski-d0b -- Sorry but punycode check not yet supported though this domain will be found anyway.

москва.рф Cyrillic domains are also supported

http://lurkmore.to/Гитара_«Урал»` This url will be found with /path/though the ?QUERY-params not yet supported

// Lets find all links in text
let urls = searchUrls(str);
console.log(urls.correct);

// The returned answer has the following structure
/*
 *  {
 *    correct: [], // Array of domains or urls that was checked according to TLD list
 *    incorrect: [] // Array that was checked according to TLD list and its domain not found in list
 *  }
 *  In order to disable TLD checking (make all domains as CORRECT) it is possible to pass {check: false} in options.
 */

// And here is how to find only plain domain names (not including /some/paths)
let domains = searchUrls(str, {domainOnly: true});
console.log(domains.correct);

```


