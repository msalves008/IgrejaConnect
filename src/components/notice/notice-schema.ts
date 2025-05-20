import { z } from 'zod'

export const noticeFormSchema = z.object({
  titulo: z
    .string()
    .min(3, 'O título obrigatório')
    .max(100, 'O título deve ter no máximo 100 caracteres'),
  descricao: z
    .string()
    .max(1000, 'A descrição deve ter no máximo 1000 caracteres')
    .optional(),
  dataHoraEvento: z.date().nullable(),
})

export type NoticeFormData = z.infer<typeof noticeFormSchema>

export type Notice = NoticeFormData & {
  id: string
  dataCriacao: Date
}
