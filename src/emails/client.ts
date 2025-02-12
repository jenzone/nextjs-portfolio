import nodemailer from 'nodemailer'

const username = process.env.EMAIL_USERNAME
const myEmail = process.env.MY_EMAIL
const senderEmail = process.env.SENDER_EMAIL
const pass = process.env.EMAIL_PASSWORD

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  service: process.env.EMAIL_SERVICE,
  secure: false,
  auth: {
    user: username,
    pass,
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
  from: senderEmail,
  to: myEmail,
}
