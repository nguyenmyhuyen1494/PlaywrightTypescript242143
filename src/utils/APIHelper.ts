export function formatAPIRequest(
  template: string,
  values: (string | number)[]
): string {
  return template.replace(/\{(\d+)\}/g, (_, index) => {
    return values[Number(index)]?.toString() ?? `{${index}}`;
  });
}

export async function getPOSTAPIRequestBody(fname:string, lname:string, price:number, depositepaid:boolean, additionalneeds:string, checkin:string, checkout:string) {
  const apiRequest = {
    firstname: fname,
    lastname: lname,
    totalprice: price,
    depositpaid: depositepaid,
    additionalneeds: additionalneeds,
    bookingdates: {
      checkin: checkin,
      checkout: checkout
    }
  }

  return apiRequest;
}