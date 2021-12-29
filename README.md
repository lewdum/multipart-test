# multipart-test

Minimal example comparing Next's automatic handling of different content types.

The important parts are `/pages/index.jsx`, which makes the request, and `/pages/api/submit.js`, which handles it.

The server basically just echoes back whatever it receives as body, unless the body is unparsed, then it returns a 500 error and prints the body to the console.

As you can see, `req.body` is just the raw multipart string in the multipart case, instead of the parsed body object, like it would be with `json` and `x-www-form-urlencoded`.

Now, you might say "just use JSON then" and that's fine, since it even has the benefit of allowing fields other than strings, but what if I need to send files? This inherently requires multipart, does it not? As in, each file is sent as a separate "part", so how would I go about it?

Thanks. ♥
