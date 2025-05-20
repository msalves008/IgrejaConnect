'use client'

import type React from 'react'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

type VisitorFormProps = {
  onSubmit: (data: { nome: string; observacao: string }) => void
}

export function VisitorForm({ onSubmit }: VisitorFormProps) {
  const [nome, setNome] = useState('')
  const [observacao, setObservacao] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!nome.trim()) return

    onSubmit({
      nome,
      observacao,
    })

    setNome('')
    setObservacao('')
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="nome">Nome completo</Label>
        <Input
          id="nome"
          placeholder="Digite o nome completo"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="observacao">Observações (opcional)</Label>
        <Textarea
          id="observacao"
          placeholder="Adicione observações relevantes"
          value={observacao}
          onChange={(e) => setObservacao(e.target.value)}
          className="min-h-[100px]"
        />
      </div>
      <Button type="submit" className="w-full">
        <Plus className="mr-2 h-4 w-4" />
        Registrar Visitante
      </Button>
    </form>
  )
}
