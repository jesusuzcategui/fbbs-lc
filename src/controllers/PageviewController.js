//const bizSdk = require('facebook-nodejs-business-sdk');
const axios = require('axios');
const moment = require('moment');
const { PromiseHandler } = require('../helper');

const PageviewController = PromiseHandler(async (req, res, next) => {
    const token = req.headers['access_fb_token'];
    const pixel = req.params.pixelId;
    const version = req.params.version;

    let UriEvent = `https://graph.facebook.com/${version}/${pixel}/events?access_token=${token}`;

    const params = {
        "data": [
            {
                "event_name": "ViewContent",
                "event_time": moment().subtract(1, 'm').format(),
                "event_id": "event.id.123",
                "event_source_url": req.body.url,
                "user_data": { 
                    "client_ip_address": req.headers['x-forwarded-for'] || req.socket.remoteAddress, 
                    "client_user_agent": req.get('User-Agent')
                }
            }
        ]
    };

    try {
        const { data, status } = await axios.post(UriEvent, params);
        res.json(data);
    } catch (error) {
        res.json({ error: error }).status(400);
    }

});

module.exports = PageviewController;