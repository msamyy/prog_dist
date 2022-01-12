const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/medAppRESTAPI', proxy('http://localhost:4000'))
app.use('/adminAPI', proxy('http://localhost:7000'))


app.listen(6000, () => {
    console.log('Gateway is Listening to Port 6000')
})