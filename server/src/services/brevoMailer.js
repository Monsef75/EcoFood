const envFile = process.env.NODE_ENV === 'production' ? '.env.production' : '.env.development'
require('dotenv').config({ path: envFile })
const SibApiV3Sdk = require('sib-api-v3-sdk')
const defaultClient = SibApiV3Sdk.ApiClient.instance

// Configure API key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.AZUE_API;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
var sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail()

async function brevoMailer({ fullName, phone, Value, Added_At }) {
    sendSmtpEmail = {
        sender: { name: 'Azue', email: process.env.AZUE_EMAIL },
        to: [{ email: process.env.ADMIN_EMAIL }],
        subject: `🛒 New Order Created (Azue)`,
        textContent: `New order from ${fullName}`,
        htmlContent: `
            <h2>New Order Created In Your Website:</h2>
            <p> Full Name: <b>${fullName}</b> </p>
            <p> Phone Number: <b>${phone}</b>. </p>
            <p> Order Total: <b>${Value}</b><i>Alf</i>. </p>
            <h4> Check 'My Orders' for more details.</h4>
            <p> Created At <b>${Added_At}</b></p>
        `,
    }
    try {
        const response = await apiInstance.sendTransacEmail(sendSmtpEmail);
        return response
    } catch (error) {
        return error
    }
}

module.exports = brevoMailer

// const brevoMailer = require('./services/brevoMailer.js')
// const Email = await brevoMailer({ fullName, phone, Value, Added_At })
//      in router.js

// https://app.brevo.com/senders/list
//      to get sernder --> { name: From Name,email: From Email} from edit section
// https://app.brevo.com/settings/keys/api
//      to get apiKey.apiKey --> API / MCP key