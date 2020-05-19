const http = require('http');
const app = require('./app')

const port = process.env.PORT || 4000;
app.set('port', port);

const server = http.createServer(app);

server.listen(port, (req, res, err) => {
    if(err) {
        console.log(err)
    }
    console.log("Server listenning on port " + port);
})