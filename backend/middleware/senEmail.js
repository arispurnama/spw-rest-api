import nodemailer from "nodemailer";

 // create reusable transporter object using the default SMTP transport
 const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  auth: {
    user: 'aris.prnm16@gmail.com',
    pass: 'b41k1234',
  }
});

export const sendEmail = (to, subject, text) => {   
  const mailData = {
    from: "aris.prnm16@gmail.com", // sender address
    to: "aris.purnama.1616@gmail.com", // list of receivers
    subject: "Sending Email using Node.js",
    text: "That was easy!",
    html: "<b>Hey there! </b><br> This is our first message sent with Nodemailer<br/>",
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
