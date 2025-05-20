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
import { visitorFormSchema, type VisitorFormData } from './visitor-schema'

type VisitorFormProps = {
  onSubmit: (data: VisitorFormData) => void
}

export function VisitorForm({ onSubmit }: VisitorFormProps) {
  const form = useForm<VisitorFormData>({
    resolver: zodResolver(visitorFormSchema),
    defaultValues: {
      nome: '',
      observacao: '',
    },
  })

  const handleSubmit = (data: VisitorFormData) => {
    onSubmit(data)
    form.reset()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="nome"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome completo</FormLabel>
              <FormControl>
                <Input placeholder="Digite o nome completo" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="observacao"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Observações (opcional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Adicione observações relevantes"
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          <Plus className="mr-2 h-4 w-4" />
          Registrar Visitante
        </Button>
      </form>
    </Form>
  )
}
