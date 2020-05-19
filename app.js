const express = require(express);
const morgan = require(morgan);
const cors = require(cors);
const path = require(path);
const fs = require('fs');

const app = express();

app.use(cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})
app.use(express.json());
app.use(express.urlencoded());

app.use(morgan('combined', {
    skip: function(req, res) {
        return res.statusCode < 400
    },
    stream: fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})
}))

app.use('/api/', require('./api/controllers'));