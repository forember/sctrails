# SC Trails Data Downloader

Downloads trail data from the SC Trails website so that it can be better searched.

## Setup

```
$ npm install
$ node download.js
```

## Search Options

### Option 1: Python

Modify `mysearch.py` and run `python3 mysearch.py`.

### Option 2: Tachi

Set up a server in accordance with [tachi][] and upload `data.json` and
`sctrails.ts1`.

[tachi]: https://github.com/forember/tachi

### Option 3: TachibanaSite

Install [TachibanaSite][] and upload `data.json` and `sctrails.ts1` as
`index.markdown.template`.

[TachibanaSite]: https://github.com/forember/tachibanasite
