const bizSdk = require('facebook-nodejs-business-sdk');

const PageviewController = (req, res) => {
    const token = "EAAFzVMai9U4BAD3FxqeNk2lsV7rCRMQmV1I9OUWZCZALkLoD1ZAHC6EjvBZCZCBKEMK7O3DpHstJRNlJsB5IQRxfPquEtFYcANhhxa4WZCdCjUAPaizymWf2bcZBpKQNFKblqCb4Ca9y29CRZCSNG4yPxsPMaQS9GSC4sC4ZBRKZBu8t9Mp4tkZBs7W";
    const pixel = "447222056213334";


    const Content = bizSdk.Content;
    const CustomData = bizSdk.CustomData;
    const DeliveryCategory = bizSdk.DeliveryCategory;
    const EventRequest = bizSdk.EventRequest;
    const UserData = bizSdk.UserData;
    const ServerEvent = bizSdk.ServerEvent;

    const access_token = token;
    const pixel_id = pixel;
    const api = bizSdk.FacebookAdsApi.init(access_token);

    let current_timestamp = Math.floor(new Date() / 1000);

    const userData = (new UserData())
        .setEmails(['joe@eg.com'])
        .setPhones(['12345678901', '14251234567'])
        // It is recommended to send Client IP and User Agent for Conversions API Events.
        .setClientIpAddress(req.connection.remoteAddress)
        .setClientUserAgent(req.headers['user-agent'])
        .setFbp('fb.1.1558571054389.1098115397')
        .setFbc('fb.1.1554763741205.AbCdEfGhIjKlMnOpQrStUvWxYz1234567890');

    const content = (new Content())
        .setId('TEST67022')
        .setQuantity(1)
        .setDeliveryCategory(DeliveryCategory.HOME_DELIVERY);

    const customData = (new CustomData())
        .setContents([content])
        .setCurrency('usd')
        .setValue(123.45);

        console.log(customData);

    const serverEvent = (new ServerEvent())
        .setEventName('test_event_code')
        .setEventTime(current_timestamp)
        .setUserData(userData)
        .setCustomData({test_event_code: 'TEST67022'})
        .setEventSourceUrl('http://jaspers-market.com/product/123')
        .setActionSource('website');

    const eventsData = [serverEvent];
    const eventRequest = (new EventRequest(access_token, pixel_id))
        .setEvents(eventsData);


    eventRequest.execute().then(
        response => {
            res.json(response);
        },
        err => {
            res.json(err);
        }
    );
    
};

module.exports = PageviewController;