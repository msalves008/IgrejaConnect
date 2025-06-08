'use client'

import { Plus } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { noticeFormSchema, type NoticeFormData } from './notice-schema'
import { DateTimePicker } from '@/components/ui/DateTimePicker'

type NoticeFormProps = {
  onSubmit: (data: NoticeFormData) => void
}

export function NoticeForm({ onSubmit }: NoticeFormProps) {
  const form = useForm<NoticeFormData>({
    resolver: zodResolver(noticeFormSchema),
    defaultValues: {
      titulo: '',
      descricao: '',
      dataHoraEvento: null,
    },
  })

  const handleSubmit = (data: NoticeFormData) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="titulo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Título do aviso</FormLabel>
              <FormControl>
                <Input placeholder="Digite o título do aviso" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="dataHoraEvento"
          render={({ field }) => (
            <DateTimePicker
              selectedDate={field?.value || new Date()}
              onDateSelect={field.onChange}
              dateLabel="Data do evento"
              timeLabel="Horário do evento"
              selectedTime={field.value?.toLocaleTimeString() || '19:00'}
              onTimeSelect={field.onChange}
            />
          )}
        />

        <FormField
          control={form.control}
          name="descricao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição do aviso</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descreva os detalhes do aviso"
                  className="min-h-[120px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Adicionar Aviso
        </Button>
      </form>
    </Form>
  )
}
