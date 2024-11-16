import z from 'zod'

const UpdateHelperSchema = z.object({
    experienceDescription: z.string(),
    resumeUploaded: z.string(),
    servicesOffered: z.string(),
    hourlyRate: z.string()
}).partial()

export default UpdateHelperSchema

export type UpdateHelperDto = z.infer<typeof UpdateHelperSchema>