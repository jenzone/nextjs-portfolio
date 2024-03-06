import nodemailer from 'nodemailer'

const myEmail = process.env.MY_EMAIL
const senderEmail = process.env.SENDER_EMAIL
const pass = process.env.EMAIL_PASSWORD

export const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  service: 'Gmail',
  secure: true,
  auth: {
    user: myEmail,
    pass,
  },
  tls: {
    ciphers: 'SSLv3',
  },
} as nodemailer.TransportOptions)

export const mailOptions = {
  from: senderEmail,
  to: myEmail,
}
