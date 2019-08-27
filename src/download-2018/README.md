# download-2018 #

An attempt to scrape the artists from the [Download website Artist A-Z page](https://downloadfestival.co.uk/artists-a-z/) with a hope to use these in a spreadsheet when working out which bands I intend on seeing and possibly even creating my own timetable once the times are released.

## Running ##

To print to the console:

```console
node scrape.js
```

To save to a CSV:

```console
node scrape.js > bands.csv
```

## Dependencies ##

### Internal Dependencies ###

None

### External Dependencies ###

* [cheerio](https://github.com/cheeriojs/cheerio)
* [request](https://github.com/request/request)
* [request-promise](https://github.com/request/request-promise)
