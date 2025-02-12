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
    await transporter.sendMail({
      ...mailOptions,
      subject: data.subject,
      replyTo: data.email,
      html: htmlEmailContent,
    })

    console.log('Email sent successfully')
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error sending email:', error)
    return NextResponse.json({
      status: 500,
      success: false,
      error: error,
    })
  }
}
