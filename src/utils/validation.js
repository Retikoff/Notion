import { z } from 'zod'

const passwordValidation = new RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/
)

const passwordMessage =
  'Your pass should contain 1 upper letter, 1 lower letter, 1 number '

export const UserLogin = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: 'Must be at least 8 characters' })
    .regex(passwordValidation, { message: 'Your password is incorrect' }),
})

export const UserSignUp = z
  .object({
    email: z.string().email(),
    password: z
      .string()
      .min(8, { message: 'Must be at least 8 characters' })
      .regex(passwordValidation, {
        message: passwordMessage,
      }),
    confirmPassword: z.string().min(8),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Passwords didnt match',
        path: ['confirmPassword'],
      })
    }
  })

export const Note = z.object({
  title: z.string().min(1, { message: 'Title cant be empty' }),
  body: z.string(),
})
