const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();

app.use(cors());
app.use(express.json());

//app.use('/medAppRESTAPI', proxy('http://localhost:4000'))

// app.use('/adminapi', proxy('http://localhost:7000'))
function selectProxyHost(str, port) {
    if (process.env.AM_DOCKER) {
        return 'http://'+str+':'+port
    }
    else{
        return 'http://localhost:'+port
    }
}

app.use('/adminapi',  proxy(selectProxyHost('adminAPI', '7000')))
app.use('/userapi',  proxy(selectProxyHost('userAPI', '7500')))


app.listen(9000, () => {
    console.log('Gateway is Listening to Port 9000')
})
