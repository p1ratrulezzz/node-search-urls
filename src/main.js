'use strict';

/**
 * Modules
 * @private
 */


/**
 * Constants
 * @protected
 */

function trimDots(text) {
  while (text.length > 0 && '.,:;!?'.split('').indexOf(text[0]) !== -1) {
    text = text.substr(0, text.length - 1)
  }
  
  return text;
}

/**
 *
 * @param text Text to search for URLs in
 * @param options (optional)
 *  see first line in function.
 * @returns {{correct: Array, incorrect: Array}}
 */
function findUrls(text, options = {}) {
  options = Object.assign(options, {
    domainOnly: false, // Return only domain names, don't include paths
    checkDomain: true, // Check Top Level Domain name according to TLD list
    punycode: false // Reserved @todo: Implement
  });

  let tld;
  try {
    tld = require('../resources/tld-list-details.json');
  }
  catch(e) {
    options.checkDomain = false;
  }

  // @link http://stackoverflow.com/a/38477788/5242972
  // @link https://regex101.com/r/vX8vH8/21
  // @link http://kourge.net/projects/regexp-unicode-block
  // @link http://www.unicode.org/charts/
  let expression = /(?:([a-z]{3,16})\:\/\/)?(([\u2100-\u214Fa-z0-9\.\-\u00BF-\u1FFF\u2C00-\uD7FF]+(?=\.)\.(?:[^\.\s\/\(\)\!\?\.\,\:\;\?\&]{2,32}))(\/[^\s]+)?)(\?[^\s\?]+)?/gi;

  let m;
  let matches = {
    correct: [],
    incorrect: []
  };

  while ((m = expression.exec(text)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === expression.lastIndex) {
      expression.lastIndex++;
    }

    // Check domain according to tld list
    // @todo: Handle punycode domains
    let topLevelDomain = trimDots(m[3]).split('.').pop();
    let domainToSave = trimDots(options.domainOnly ? m[2] : m[0]);
    if (options.checkDomain !== false && tld[topLevelDomain] !== undefined) {
      matches.correct.push(domainToSave);
    }
    else {
      matches.incorrect.push(domainToSave);
    }
  }

  return matches;
}

module.exports.searchUrls = findUrls;
