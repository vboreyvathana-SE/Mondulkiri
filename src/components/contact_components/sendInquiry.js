// Fake "send" for now. The PHP backend doesn't have a contact endpoint yet,
// so this just logs the form and waits a bit like a real request would.
// When the endpoint exists, put a fetch() in here and keep the function name.

export function sendInquiry(formData) {
  console.log("Inquiry (not sent anywhere yet):", formData);

  return new Promise(function (resolve) {
    setTimeout(resolve, 800);
  });
}
