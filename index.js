const axios = require('axios').default;

const bodyParser = require('body-parser')
const express = require('express')
const app = express()

const cfg = require('./config.json')

let its_result = {'Result':true}

async function proxyPost(url,data) {
    try {
      await axios.post(url, data);
    } catch (error) {
      console.error(error);
    }
}

app.use(bodyParser.json({limit: '50mb',type:"*/json"}))
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/NotificationInfo/TollgateInfo', (req, res) => {
    proxyPost(cfg.BS_TOLL_PATH,req.body)
    res.json(its_result)
})

app.post('/NotificationInfo/KeepAlive', (req, res) => {
    proxyPost(cfg.BS_HB_PATH,req.body)
    res.json(its_result)
})

app.listen(cfg.PORT, () => {
  console.log('Start proxy server')
})