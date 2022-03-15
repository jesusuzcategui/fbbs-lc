//const bizSdk = require('facebook-nodejs-business-sdk');
const axios = require('axios');
const moment = require('moment');
const { PromiseHandler } = require('../helper');

const PageviewController = PromiseHandler(async (req, res, next) => {
    const token = "EAAFzVMai9U4BAPXO0TEroDxPadOCYCMnjNZC02QLNkqTPZBrepRZCfd59nj6k6JHw39m4gI3CDe8CmpPMOMoZBf5NUccfEitQ4065CmfE8BkxMjcBZAJ1quz7wFGHZBvZAncCpmtEnSZBG3cTEsdHLKLZA5VZAZBU5Pl76cvb2eFbQ2bX2lql9ECUuzzoDX2FI6pZCMZD";
    const pixel = "447222056213334";
    const version = "v13.0";

    let UriEvent = `https://graph.facebook.com/${version}/${pixel}/events?access_token=${token}`;

    console.log(UriEvent);

    let myStartDate = moment().subtract(1, 'm').format();

    const params = {
        "data": [
            {
                "event_name": "ViewContent",
                "event_time": myStartDate,
                "event_id": "event.id.123",
                "event_source_url": "https://comprapindev.tk",
                "user_data": { "client_ip_address": "186.119.104.71", "client_user_agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.51 Safari/537.36" }
            }
        ]
    }

    console.log(params);

    try {
        const { data, status } = await axios.post(UriEvent, params);
        console.log("data", data, status);
        res.json(data);
    } catch (error) {
        console.log("", error);
        res.json({error: error});
    }

});

module.exports = PageviewController;