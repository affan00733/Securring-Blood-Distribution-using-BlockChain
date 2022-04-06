import * as emailjs from "emailjs-com";

function SendEmail(data) {
  const SERVICE_ID = "service_6xyjvya";
  const TEMPLATE_ID = "template_ek94ow9";
  const USER_ID = "user_h9dNZVhx5uG9TfKZLLVta";
  emailjs.send(SERVICE_ID, TEMPLATE_ID, data, USER_ID).then(
    function (response) {
      console.log(response.status, response.text);
    },
    function (err) {
      console.log(err);
    }
  );
}

export default SendEmail;
