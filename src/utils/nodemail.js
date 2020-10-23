const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
      host: 'smtp.ethereal.email',
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'nikki.jenkins8@ethereal.email',
        pass: '2g1bQXN8kunW4cBzjj'
      },
      tls: {
        rejectUnauthorized: false
      }
    },
    {
      from: 'Админка BUVUD <nikki.jenkins8@ethereal.email>',
    }
);

const mailer = message => {
  transporter.sendMail(message, (err, info) => {
    if (err) return  console.log(err)
    console.log('Email sent: ', info)
  })
}

module.exports = mailer