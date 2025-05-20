import { z } from 'zod'

export const visitorFormSchema = z.object({
  nome: z
    .string()
    .min(3, 'O nome obrigatório')
    .max(100, 'O nome deve ter no máximo 100 caracteres'),
  observacao: z
    .string()
    .max(800, 'A observação deve ter no máximo 800 caracteres')
    .optional(),
})

export type VisitorFormData = z.infer<typeof visitorFormSchema>

export type Visitor = VisitorFormData & {
  id: string
  dataHora: Date
}
