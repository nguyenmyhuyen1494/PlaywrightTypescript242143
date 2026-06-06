// Use Interface -> help code cleaner & and more safety
// Separate the interface into a different file -> help code more organized
interface BookingAPI {
    
        "firstname": string,
        "lastname": string,
        "totalprice": number,
        "depositpaid": boolean,
        "additionalneeds": string,
        "bookingdates": BookingDates
      }

      interface BookingDates {
    
          "checkin": string,
          "checkout": string
      }