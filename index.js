const http = require('http');

const server = http.createServer((req, res) => {
  const url = req.url;

  if (url === '/') {
    res.write('<html>');
    res.write('<head><title>Enter Message</title></head>');
    res.write('<body><form action="/message" method="POST">');
    res.write('<input type="text" name="message">'); // Removed the button temporarily
    res.write('<button type="submit">Send</button>');
    res.write('</form></body>');
    res.write('</html>');
    return res.end();
  }

  if (url === '/message' && req.method === 'POST') {
    const body = [];
    req.on('data', (chunk) => {
      body.push(chunk);
    });

    req.on('end', () => {
      const parsedBody = Buffer.concat(body).toString();
      const message = parsedBody.split('=')[1]; // Extract the message from the form data

      res.setHeader('Content-Type', 'text/html');
      res.write('<html>');
      res.write(`<p>${message}</p>`);
      res.write('<form action="/message" method="POST">'); // Add a new form with the same input
      res.write('<input type="text" name="message" value="' + message + '">'); // Set the input's value to the entered message
      res.write('<button type="submit">Send</button>');
      res.write('</form>');
      res.write('</body>');
      res.write('</html>');
      return res.end();
    });
  }

});

server.listen(3000, () => {
  console.log('Server is listening on port 3000');
});



