
// There was some error of twilio will add later


const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+919022688778'
   })
  .then(message => console.log(message.sid));


  //Account SID AC086d0aab3ae4744d67293c5a73eceb63
  //Auth Token 3dd793ce39b187347c56d3eed1ab3b93

//   MG3d994b5c98f3539e8e0a354834b11f83