# Test folder — local server

This folder contains `test.js` (an HTML snippet saved with a .js extension). A minimal Node server is provided to serve that file locally.

How to run (cmd.exe):

```bat
cd "C:\Users\frank\Documents\Personal Projects\HTTPHacks"
node Test\server.js
```

Open http://localhost:3000/ in your browser. The server maps `/` to `Test/test.js` and serves it with `text/html`.

Notes:
- If you want to rename `test.js` to `test.html`, you can — the server will still serve it if you request the filename.
- To change the port, set the `PORT` environment variable before running the command.
