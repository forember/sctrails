const cheerio = require('cheerio');
const https = require('https');

(function getSCTrailsPagesStartingWith(url, trails) {
  let req = https.get(url, (res) => {
    const { statusCode } = res;
    const contentType = res.headers['content-type'];

    let error;
    if (statusCode !== 200) {
      error = new Error(`Request Failed.\nStatus Code: ${statusCode}`);
    } else if (!/^text\/html/.test(contentType)) {
      error = new Error(`Invalid content-type.\nExpected text/html but received ${contentType}`);
    }
    if (error) {
      console.error(error.message);
      // Consume response data to free up memory
      /*
      res.resume();
      return;
      */
    }

    res.setEncoding('utf8');
    let rawData = '';
    res.on('data', (chunk) => {
      rawData += chunk;
    });
    
    res.on('end', () => {
      console.log(rawData);
      /*
      try {
        let $ = cheerio.load(rawData);
        $('.trail-preview-info-column').each((i, elem) => {
          let nameElem = $(elem).find('.trail-details-trail-name a');
          let name = nameElem.text();
          let href = nameElem.attr('href');
          let activities = $(elem).find('.activity-list li').map((i, act) => {
            return $(elem).text();
          }).toArray();
          let length = $(elem).find('.trail-length').text();
          let difficultyClass = $(elem).find('.trail-difficulty span').attr('class');
          let difficulty = /\bdifficulty(\w+)\b/.exec(difficultyClass)[1];
          let description = $(elem).find('.trail-description').text();
          trails.push({ name, href, activities, length, difficulty, description });
        });
        let nextPage = $('.pagination_next').attr('href');
        console.log(`Processed Page: ${url}`);
        if (nextPage) {
          getSCTrailsPagesStartingWith(nextPage, trails);
        } else {
          console.log(trails);
        }
      } catch (e) {
        console.error(e.message);
      }
      */
    });
  });

  req.on('error', (e) => {
    console.error();
  });

  return req;
}('https://www.sctrails.net/trails/trails/p/1', []));
