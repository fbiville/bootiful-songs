# Bootiful songs

It's gonna be awesome.
One day.

## Getting started

Make sure Maven, Yarn and Nginx are installed.
Then, just run: `./start-all` and browse `http://localhost:8888`.

## Dude, where is my data?

At first, the random video endpoint returns a `204 No Content`, until some videos end up in the database.

Just POST a video (or more!) as follows:

```
$> curl -X POST -H 'Content-Type:application/json' --data '{"url": "https://www.youtube.com/watch?v=dQw4w9WgXcQ"}' http://localhost:8080/api/videos
```

## End-to-end tests

1. run Nginx (`nginx -c $(pwd)/nginx.conf &`, port will be `8888`)
2. run fake-server (`yarn start-fake-backend` in `interwebz`)
3. run the e2e tests as usual (`yarn e2e` in `interwebz`)
