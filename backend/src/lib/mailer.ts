import * as nodemailer from 'nodemailer';

 export const  mailer = async(receiver: string) => {
  const message = 'A recent test Failed.';
  const mailsubject = 'Test Failed';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAILER_USER,
      pass: process.env.MAILER_PASSWORD
    }
  });

  await transporter.sendMail({
    from: process.env.MAILER_FROM,
    to: receiver,
    subject: mailsubject,
    text: message
  });
}

