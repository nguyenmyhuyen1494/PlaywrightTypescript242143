import { test, expect } from '@playwright/test';

import postAPIRequest from '../../test-data/api_request/POST_API_Request.json';

test.use({

    baseURL: process.env.BASE_API_URL,
})

test('Create POST API Request using static file in playwright & typescript', async ({ page }) => {

// Create Post API Request
const postAPIResponse = await page.request.post(`/booking`, {data: postAPIRequest});


// Print Json API response in console
const jsonpPOSTAPIRespone = await postAPIResponse.json();
console.log('POST API Response : '+JSON.stringify(jsonpPOSTAPIRespone,null,2));

// Validate Status Code
expect(postAPIResponse.status()).toBe(200);
expect(postAPIResponse.statusText()).toBe('OK');
expect(postAPIResponse.headers()['content-type']).toBe('application/json; charset=utf-8');

//validate Response Body
expect(jsonpPOSTAPIRespone.booking).toHaveProperty('firstname', postAPIRequest.firstname);
expect(jsonpPOSTAPIRespone.booking).toHaveProperty('lastname', postAPIRequest.lastname);
expect(jsonpPOSTAPIRespone.booking).toHaveProperty('totalprice', postAPIRequest.totalprice);
expect(jsonpPOSTAPIRespone.booking).toHaveProperty('depositpaid', postAPIRequest.depositpaid);
expect(jsonpPOSTAPIRespone.booking).toHaveProperty('bookingdates.checkin', postAPIRequest.bookingdates.checkin);
expect(jsonpPOSTAPIRespone.booking).toHaveProperty('bookingdates.checkout', postAPIRequest.bookingdates.checkout);









  
});