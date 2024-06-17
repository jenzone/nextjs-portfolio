import nodemailer from 'nodemailer'

const username = process.env.EMAIL_USERNAME
const myEmail = process.env.MY_EMAIL
const senderEmail = process.env.SENDER_EMAIL
const pass = process.env.EMAIL_PASSWORD

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  service: 'Mailgun',
  secure: true,
  auth: {
    user: username,
    pass,
  },
  tls: {
    ciphers: 'SSLv3',
  },
} as nodemailer.TransportOptions)

transporter.verify(function (error, success) {
  if (error) {
    console.log(error)
  } else {
    console.log('Server is ready to take our messages')
  }
})

export const mailOptions = {
  to: myEmail,
}
