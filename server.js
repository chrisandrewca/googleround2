const fs = require('fs/promises');
const http = require('http');

const index = fs.readFile('index.html');

http.createServer(async (req, res) => {

  let content;

  if (req.url.startsWith('/programs')) {

    res.setHeader('Content-Type', 'text/javascript');

    content = await fs.readFile(`.${req.url}.js`);
  } else {

    content = await index;
  }

  res.write(content);
  res.end();

}).listen(8080);