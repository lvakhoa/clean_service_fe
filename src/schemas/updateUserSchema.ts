import z from 'zod'
import { Gender } from '@/configs/enum'

const UpdateUserSchema = z.object({
    profilePicture: z.string(),
    gender: z.nativeEnum(Gender, {
        errorMap: () => ({ message: "Gender type must be Male, Female, or Other" })
    }),
    fullName: z.string(),
    dateOfBirth: z.coerce.date(),
    identityCard: z.string(),
    address: z.string(),
    phoneNumber: z.string()
}).partial()
export default UpdateUserSchema

export type UpdateUserDto = z.infer<typeof UpdateUserSchema>