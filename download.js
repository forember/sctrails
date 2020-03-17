const cheerio = require('cheerio');
const child_process = require('child_process');
const fs = require('fs');

(function getSCTrailsPagesStartingWith(url, trails) {
  if (/^\/trails\/trails\/p\//.test(url)) {
    url = `https://www.sctrails.net${url}`;
  } else if (!/^https:\/\/www\.sctrails\.net\/trails\/trails\/p\//.test(url)) {
    console.error(`ERROR: Not an SC Trails preview page: ${url}`);
    return;
  }
  let res = child_process.spawnSync('curl', [url]);
  if (res.error || res.status !== 0) {
    console.error('ERROR: curl failed to execute');
    console.error(res.error);
    console.error(res.status);
    console.error(res.stderr);
    return;
  }
  let $ = cheerio.load(res.stdout);
  $('.trail-preview-info-column').each((i, elem) => {
    let nameElem = $(elem).find('.trail-details-trail-name a');
    let name = nameElem.text();
    let href = nameElem.attr('href');
    let activities = $(elem).find('.activity-list li').map((i, act) => {
      return $(act).text();
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
    fs.writeFile('data.json', JSON.stringify(trails));
  }
}('https://www.sctrails.net/trails/trails/p/1', []));
