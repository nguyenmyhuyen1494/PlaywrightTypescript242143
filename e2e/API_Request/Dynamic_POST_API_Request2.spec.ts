import { test, expect } from '@playwright/test';
import {formatAPIRequest} from '../../src/utils/APIHelper'; 
import path from 'path';
import fs from 'fs';
import { faker } from '@faker-js/faker';

test.use({
    baseURL: process.env.BASE_API_URL,
})

test('Create POST API Request using dynamic api request file in playwright & typescript 2', async ({ request }) => {

//Reading json file
const filePath = path.join(__dirname, '../../test-data/api_request/Dynamic_POST_API_Request.json');
const jsonTemplate = fs.readFileSync(filePath, 'utf-8');

//Change hard coded values to dynamic values using faker library
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const totalPrice = faker.datatype.number({ min: 100, max: 1000 });
const checkinDate = faker.date.future().toISOString().split('T')[0];
const checkoutDate = faker.date.future().toISOString().split('T')[0];

// Store dynamic values in array
const values = [firstName, lastName, totalPrice, checkinDate, checkoutDate];
//Updating POST API Request dynamically
const postAPIRequest = await formatAPIRequest(jsonTemplate, values);

// Create Post API Request
const postAPIResponse = await request.post(`/booking`, {data: JSON.parse(postAPIRequest)});

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

// Validate API response body by using dynamic values
expect(jsonPOSTAPIResponse.bookingid).toBeGreaterThan(0);
expect(jsonPOSTAPIResponse.booking.firstname)
  .toBe(firstName);
expect(jsonPOSTAPIResponse.booking.lastname)
  .toBe(lastName);
  expect(jsonPOSTAPIResponse.booking.bookingdates.checkin)
  .toBe(checkinDate);
expect(jsonPOSTAPIResponse.booking.bookingdates.checkout)
  .toBe(checkoutDate);
});