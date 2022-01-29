const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

//app.use('/medAppRESTAPI', proxy('http://localhost:4000'))
app.use('/adminapi', proxy('http://localhost:7000'))
app.use('/userapi', proxy('http://localhost:7500'))


app.listen(7800, () => {
    console.log('Gateway is Listening to Port 7800')
})