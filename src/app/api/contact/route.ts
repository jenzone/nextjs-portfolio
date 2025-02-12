import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

import { mailOptions, transporter } from '@/emails/client'

export async function POST(req: NextRequest) {
  const data = await req.json()

  const templatePath = path.join(
    process.cwd(),
    'src',
    'emails',
    'contact-form_v2.html',
  )

  const template = fs.readFileSync(templatePath, 'utf-8')

  const htmlEmailContent = template
    .replace(/{{name}}/g, data.name)
    .replace(/{{email}}/g, data.email)
    .replace(/{{subject}}/g, data.subject)
    .replace(/{{message}}/g, data.message)

  try {
    await transporter.sendMail(
      {
        ...mailOptions,
        // from: `${data.name} <${data.email}>`,
        subject: data.subject,
        replyTo: data.email,
        html: htmlEmailContent,
      },
      (error, info) => {
        if (error) {
          console.error('Error: ', error)
        } else {
          console.log('Email sent!')
        }
      },
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error(error)

    return NextResponse.json({ success: false }, { status: 500 })
  }
}
