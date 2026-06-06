import { test, expect } from '@playwright/test';
import { getPOSTAPIRequestBody } from '../../src/utils/APIHelper'; 
import { faker } from '@faker-js/faker';
import tokenAPIRequest from '../../test-data/api_request/Token_API_Request.json';

test.use({
    baseURL: process.env.BASE_API_URL,
})
test('Create DELETE API Request then create GET API request using dynamic api request file in playwright & typescript', async ({ request }) => {

//Change hard coded values to dynamic values using faker library
const firstName = faker.name.firstName();
const lastName = faker.name.lastName();
const totalPrice = faker.datatype.number({ min: 100, max: 1000 });
const checkinDate = faker.date.future().toISOString().split('T')[0];

const checkoutDate = faker.date.soon(5,checkinDate).toISOString().split('T')[0];

const postAPIRequest = await getPOSTAPIRequestBody(firstName, lastName, totalPrice, true, "Breakfast", checkinDate, checkoutDate);

// Create Post API Request
const postAPIResponse = await request.post(`/booking`, {data: postAPIRequest});

// Print Json API response in console
const jsonPOSTAPIResponse = await postAPIResponse.json();
console.log('POST API Response : '+JSON.stringify(jsonPOSTAPIResponse,null,2));

// Validate Status Code
expect(postAPIResponse.status()).toBe(200);
expect(postAPIResponse.statusText()).toBe('OK');
expect(postAPIResponse.headers()['content-type']).toBe('application/json; charset=utf-8');

//validate property/ key names
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

    // Create GET API Request
    const bookingID = jsonPOSTAPIResponse.bookingid;
    console.log('Booking ID : '+bookingID);
    
    const getAPIResponse = await request.get(`/booking/${bookingID}`);
    
    // Validate Status Code, status text
    expect(getAPIResponse.status()).toBe(200);
    expect(getAPIResponse.statusText()).toBe('OK');
   const jsonGETAPIResponse  =  await getAPIResponse.json();
   console.log('GET API Response : '+JSON.stringify(jsonGETAPIResponse,null,2));

// Generate Token API Request
const tokenAPIResponse = await request.post(`/auth`, {data: tokenAPIRequest});

//Validate Status Code, status text
expect(tokenAPIResponse.status()).toBe(200);
expect(tokenAPIResponse.statusText()).toBe('OK');

// Print Json API response in console

const jsonTokenAPIResponse = await tokenAPIResponse.json();
const token = jsonTokenAPIResponse.token;
console.log('Token API Response : '+token); 

//Create DELETE API Request
const deleteAPIResponse = await request.delete(`/booking/${bookingID}`, 
    { headers:{'Content-Type':'application/json',
        'Cookie':`token=${token}`}

})
//Validate Status Code, status text
expect(deleteAPIResponse.status()).toBe(201);
expect(deleteAPIResponse.statusText()).toBe('Created');

//Print PATCH API response in console
console.log('DELETE API Response : '+ await deleteAPIResponse.body());

});
