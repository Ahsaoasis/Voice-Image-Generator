const express = require('express');
const proxy = require('express-http-proxy');
path = require('path')
const app = express();
const PORT = process.env.PORT || 3000;

// serve the frontend statically
app.use(express.static(path.join(__dirname,  'build')))


// proxy the requests to the backend
app.use('/api', proxy('localhost:5000', {
    proxyReqPathResolver: function (req) {
      return req.url.replace("/api","");
    }
  }));

app.get('*', async (req,res)=> {
    res.sendFile(path.join(__dirname, 'build','index.html'));
})
// running the server on the specific port
app.listen(PORT, () => {
    console.log(`frontend is listening on port ${PORT}`)
  });