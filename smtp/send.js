import SibApiV3Sdk from '@getbrevo/brevo';

function sendEmailForVerificationPage(to, token, role) {
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "{{params.subject}}";
    sendSmtpEmail.htmlContent = `<html><body><h1>Verification page link of your ${role} account is {{params.parameter}}</h1></body></html>`;
    sendSmtpEmail.sender = { "name": process.env.BREVO_SENDER_NAME + ' ' + process.env.BREVO_SENDER_SURNAME, "email": process.env.BREVO_SENDER_EMAIL };
    sendSmtpEmail.to = [{ "email": to }];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": `${process.env.DOMAIN}/verification/code/${role}/${token}`, "subject": "Verification page for StoreApp" };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    }, function (error) {
        console.error(error);
    });
};

function sendEmailForVerificationCode(to, code, role) {
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let apiKey = apiInstance.authentications['apiKey'];
    apiKey.apiKey = process.env.BREVO_API_KEY;
    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = "{{params.subject}}";
    sendSmtpEmail.htmlContent = `<html><body><h1>Verification code of your ${role} account is {{params.parameter}}</h1></body></html>`;
    sendSmtpEmail.sender = { "name": process.env.BREVO_SENDER_NAME + ' ' + process.env.BREVO_SENDER_SURNAME, "email": process.env.BREVO_SENDER_EMAIL };
    sendSmtpEmail.to = [{ "email": to }];
    sendSmtpEmail.headers = { "Some-Custom-Name": "unique-id-1234" };
    sendSmtpEmail.params = { "parameter": code, "subject": "Verification code for StoreApp" };

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function (data) {
    }, function (error) {
        console.error(error);
    });
};

export {
    sendEmailForVerificationPage,
    sendEmailForVerificationCode
};