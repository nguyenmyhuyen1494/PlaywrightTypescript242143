import { test, expect } from '@playwright/test';
import {formatAPIRequest} from '../../src/utils/APIHelper'; 
import path from 'path';
import fs from 'fs';

test.use({
    baseURL: process.env.BASE_API_URL,
})

test('Create POST API Request using dynamic api request file in playwright & typescript', async ({ request }) => {

//Reading json file
const filePath = path.join(__dirname, '../../test-data/api_request/Dynamic_POST_API_Request.json');
const jsonTemplate = fs.readFileSync(filePath, 'utf-8');

const values = ['Huyen', 'Nguyen', 150, '2025-01-01', '2025-01-11'];
//Updating POST API Request dynamically
const postAPIRequest = await formatAPIRequest(jsonTemplate, values);

// Create Post API Request
const postAPIResponse = await page.request.post(`/booking`, {data: JSON.parse(postAPIRequest)});

// Print Json API response in console
const jsonPOSTAPIResponse = await postAPIResponse.json();
console.log('POST API Response : '+JSON.stringify(jsonPOSTAPIResponse,null,2));

// Validate Status Code
expect(postAPIResponse.status()).toBe(200);
expect(postAPIResponse.statusText()).toBe('OK');
expect(postAPIResponse.headers()['content-type']).toBe('application/json; charset=utf-8');

//validate Response Body
expect(jsonPOSTAPIResponse.booking).toHaveProperty('firstname');
expect(jsonPOSTAPIResponse.booking).toHaveProperty('lastname');
expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkin');
expect(jsonPOSTAPIResponse.booking.bookingdates).toHaveProperty('checkout');

// Validate API response body
expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0);
expect(jsonPOSTAPIResponse.booking.firstname)
  .toBe('Huyen');
expect(jsonPOSTAPIResponse.booking.lastname)
  .toBe('Nguyen');
expect(jsonPOSTAPIResponse.booking.bookingdates.checkin)
  .toBe('2025-01-01');
expect(jsonPOSTAPIResponse.booking.bookingdates.checkout)
  .toBe('2025-01-11');
});