import nodemailer from "nodemailer";

 // create reusable transporter object using the default SMTP transport
 const transporter = nodemailer.createTransport({
  service: 'gmail', // Use your email provider
  host: 'smtp.gmail.com',
  port:587,
  auth: {
    user: 'aris.prnm16@gmail.com',
    pass: 'qlwe ytij eyka mjss',
  }
});

export const sendEmail = (to, subject, text, html) => {   
  const mailData = {
    from: "aris.prnm16@gmail.com", // sender address
    to: `${to}`, // list of receivers
    subject: `${subject}`,
    text: `${text}`,
    html: `${html}`,
  };
  transporter.sendMail(mailData, function (err, info) {
    if (err) console.log(err);
    else console.log(info);
  });
};
