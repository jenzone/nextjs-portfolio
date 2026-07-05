'use client'

import * as yup from 'yup'
import toast from 'react-hot-toast'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'

import { Button } from '@/components/ui/button'

type FormData = {
  name?: string
  email: string
  subject: string
  message: string
}

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
})
const ContactForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const resData = await response.json()
      if (response.ok && resData.success) {
        toast.success('Email sent successfully')
        reset()
      } else {
        const errorMsg = typeof resData.error === 'string'
          ? resData.error
          : resData.error?.message || resData.error?.response || 'Failed to send email'
        throw new Error(errorMsg)
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred while sending an email')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <input
        {...register('name')}
        placeholder="Name *"
        type="text"
        className={`${errors.name ? 'border-red-500 placeholder-red-400' : 'placeholder:text-(--section-text)/40'} w-full border-b-2 border-(--primary) bg-transparent py-2 text-(--section-text) caret-(--primary) outline-hidden transition-colors duration-500 ease-linear focus:border-(--accent)`}
      />

      <input
        {...register('email')}
        placeholder="Email *"
        type="email"
        className={`${errors.email ? 'border-red-500 placeholder-red-400' : 'placeholder:text-(--section-text)/40'} w-full border-b-2 border-(--primary) bg-transparent py-2 text-(--section-text) caret-(--primary) outline-hidden transition-colors duration-500 ease-linear focus:border-(--accent)`}
      />

      <input
        {...register('subject')}
        placeholder="Subject *"
        type="text"
        className={`${errors.subject ? 'border-red-500 placeholder-red-400' : 'placeholder:text-(--section-text)/40'} w-full border-b-2 border-(--primary) bg-transparent py-2 text-(--section-text) caret-(--primary) outline-hidden transition-colors duration-500 ease-linear focus:border-(--accent)`}
      />

      <textarea
        {...register('message')}
        placeholder="Message *"
        className={`${errors.message ? 'border-red-500 placeholder-red-400' : 'placeholder:text-(--section-text)/40'} h-full max-h-[250px] min-h-[100px] w-full border-b-2 border-(--primary) bg-transparent py-2 text-(--section-text) caret-(--primary) outline-hidden transition-colors duration-500 ease-linear focus:border-(--accent)`}
      />
      <Button className="mt-4" type="submit" disabled={isSubmitting}>
        {isSubmitting ? (
          <>
            Sending
            <svg className="animate-spin ml-2 size-4 text-current" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          </>
        ) : (
          <>
            Send <PaperAirplaneIcon className="ml-2 size-4" />
          </>
        )}
      </Button>
    </form>
  )
}

export default ContactForm
