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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })
  const onSubmit = (data: FormData) => {
    try {
      fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      toast.success('Email sent successfully')
      reset()
    } catch (error) {
      toast.error('An error occurred while sending an email')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
      <input
        {...register('name')}
        placeholder="Name *"
        type="text"
        className={`${errors.name ? 'border-red-500 placeholder-red-400' : ''} w-full border-b-2 border-[var(--primary)] bg-transparent py-2 text-[var(--background)] caret-[var(--primary)] outline-none transition-colors duration-500 ease-linear focus:border-[var(--accent)]`}
      />

      <input
        {...register('email')}
        placeholder="Email *"
        type="email"
        className={`${errors.email ? 'border-red-500 placeholder-red-400' : ''} w-full border-b-2 border-[var(--primary)] bg-transparent py-2 text-[var(--background)] caret-[var(--primary)] outline-none transition-colors duration-500 ease-linear focus:border-[var(--accent)]`}
      />

      <input
        {...register('subject')}
        placeholder="Subject *"
        type="text"
        className={`${errors.subject ? 'border-red-500 placeholder-red-400' : ''} w-full border-b-2 border-[var(--primary)] bg-transparent py-2 text-[var(--background)] caret-[var(--primary)] outline-none transition-colors duration-500 ease-linear focus:border-[var(--accent)]`}
      />

      <textarea
        {...register('message')}
        placeholder="Message *"
        className={`${errors.message ? 'border-red-500 placeholder-red-400' : ''} h-full max-h-[250px] min-h-[100px] w-full border-b-2 border-[var(--primary)] bg-transparent py-2 text-[var(--background)] caret-[var(--primary)] outline-none transition-colors duration-500 ease-linear focus:border-[var(--accent)]`}
      />
      <Button className="mt-4" type="submit">
        Send <PaperAirplaneIcon className="ml-2 size-4" />
      </Button>
    </form>
  )
}

export default ContactForm
