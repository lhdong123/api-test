const nodemailer = require("nodemailer");
const { google } = require('googleapis');

// These id's and secrets should come from .env file.
const CLIENT_ID = '660685950439-oskm4ugkok2lo30m0h22p7k0ifadrrhu.apps.googleusercontent.com';
const CLEINT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04eqKRVvWWxSQCgYIARAAGAQSNwF-L9Irk5ph541Qs6Djs_vNF8FAm604nLgeMqqCMXh8eQUEE6T9Il9VDA7yMOXi1ruXXAT9mMQ';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLEINT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


const saltRounds = 10;
let count;
let email;
let globalOTP = "";

async function configEmailToSend (account, OTP) {
    const smtpTransport = nodemailer.createTransport('smtps://ptudwnc.classroom%40gmail.com:hcmusk18%40ddl@smtp.gmail.com');
    const mail = {
        from: "ptudwnc.classroom@gmail.com",
        to: account,
        subject: "MÃ XÁC NHẬN",
        html: "<b>Mã xác nhận của bạn là: </b>" + OTP
    }
    return {smtpTransport,mail};
}

async function configEmailToSend1 (account, OTP) {
    const accessToken = await oAuth2Client.getAccessToken();

    const smtpTransport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'ptudwnc.classroom@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLEINT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const mail = {
        from: "ptudwnc.classroom@gmail.com",
        to: account,
        subject: "INVITE LINK",
        html: "<b>Invite link: </b>" + OTP
    }
    return {smtpTransport,mail};
}

exports.sendmail = async (email,content) => {
    
    console.log("sendmail");
    console.log(email);
    const mailer = await configEmailToSend(email,content);
    const smtpTransport = (await mailer).smtpTransport;
    const mail = (await mailer).mail;

    smtpTransport.sendMail(mail);
};

exports.sendmailInvite = async (email,content) => {
    
    //console.log("sendmail");
    //console.log(email);
    const mailer = await configEmailToSend1(email,content);
    const smtpTransport = (await mailer).smtpTransport;
    const mail = (await mailer).mail;

    smtpTransport.sendMail(mail);
};