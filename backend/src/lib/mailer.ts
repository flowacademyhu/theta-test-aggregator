import * as nodemailer from 'nodemailer';

 export const  mailer = async() => {
  let message = 'something';
  let receiver = 'szankabal@gmail.com';
  let mailsubject = 'this is subject to change';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'mailtester67',
      pass: 'testmymail11'
    }
  });

  // usr:mailtester67   (@gmail.com)
  // pw:testmymail11

  await transporter.sendMail({
    from: '<mailtester67@gmail.com>',
    to: receiver,
    subject: mailsubject,
    text: message
  });
}

