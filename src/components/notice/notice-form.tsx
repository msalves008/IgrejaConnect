'use client'

import type React from 'react'

import { useState } from 'react'
import { Plus, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Calendar as CalendarComponent } from '@/components/ui/calendar'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { cn } from '@/lib/utils'
// import { TimePicker } from "@/components/ui/time-picker"

type NoticeFormProps = {
  onSubmit: (data: {
    titulo: string
    descricao: string
    dataHoraEvento: Date | null
  }) => void
}

export function NoticeForm({ onSubmit }: NoticeFormProps) {
  const [titulo, setTitulo] = useState('')
  const [descricao, setDescricao] = useState('')
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [time, setTime] = useState<string | undefined>(undefined)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!titulo.trim() || !descricao.trim()) return

    let dataHoraEvento: Date | null = null

    if (date) {
      dataHoraEvento = new Date(date)

      if (time) {
        const [hours, minutes] = time.split(':').map(Number)
        dataHoraEvento.setHours(hours || 0, minutes || 0)
      }
    }

    onSubmit({
      titulo,
      descricao,
      dataHoraEvento,
    })

    setTitulo('')
    setDescricao('')
    setDate(undefined)
    setTime(undefined)
  }

  // const handleTimeChange = (value: string) => {
  //   setTime(value)
  // }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="titulo">Título do aviso</Label>
        <Input
          id="titulo"
          placeholder="Digite o título do aviso"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="descricao">Descrição do aviso</Label>
        <Textarea
          id="descricao"
          placeholder="Descreva os detalhes do aviso"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="min-h-[120px]"
          required
        />
      </div>
      <div className="space-y-2">
        <Label>Data do evento</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-full justify-start text-left font-normal',
                !date && 'text-muted-foreground'
              )}
            >
              <Calendar className="mr-2 h-4 w-4" />
              {date ? (
                format(date, 'PPP', { locale: ptBR })
              ) : (
                <span>Selecione uma data</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarComponent
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
              locale={ptBR}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        {/* <TimePicker value={time} onChange={handleTimeChange} disabled={!date} /> */}
      </div>
      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Adicionar Aviso
      </Button>
    </form>
  )
}
