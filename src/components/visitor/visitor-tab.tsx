'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { Plus, User } from 'lucide-react'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { VisitorForm } from '@/components/visitor/visitor-form'

type Visitor = {
  id: string
  nome: string
  observacao: string
  dataHora: Date
}

export function VisitorsTab() {
  const [visitors, setVisitors] = useState<Visitor[]>([
    {
      id: '1',
      nome: 'Maria Silva',
      observacao: 'Primeira vez na igreja',
      dataHora: new Date(2023, 4, 15, 9, 30),
    },
    {
      id: '2',
      nome: 'João Oliveira',
      observacao: '',
      dataHora: new Date(2023, 4, 15, 10, 15),
    },
  ])
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddVisitante = (
    novoVisitante: Omit<Visitor, 'id' | 'dataHora'>
  ) => {
    const visitorCompleto: Visitor = {
      ...novoVisitante,
      id: Date.now().toString(),
      dataHora: new Date(),
    }

    setVisitors([visitorCompleto, ...visitors])
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Gerenciamento de Visitantes
        </h2>

        {/* Botão para abrir o dialog em dispositivos móveis */}
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button className="md:hidden" size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Novo Visitante
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Registrar Visitante</DialogTitle>
            </DialogHeader>
            <VisitorForm onSubmit={handleAddVisitante} />
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Formulário visível apenas em desktop */}
        <Card className="hidden md:block">
          <CardHeader>
            <CardTitle>Registrar Visitantes</CardTitle>
            <CardDescription>
              Adicione informações sobre novos visitantes da igreja
            </CardDescription>
          </CardHeader>
          <CardContent>
            <VisitorForm onSubmit={handleAddVisitante} />
          </CardContent>
        </Card>

        {/* Lista de visitantes (ocupa toda a largura em mobile) */}
        <Card className="md:col-span-1 col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Visitantes Recentes</CardTitle>
              <CardDescription>
                Lista de pessoas que visitaram a igreja recentemente
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[400px] pr-4">
              {visitors.length > 0 ? (
                <div className="space-y-4">
                  {visitors.map((visitor) => (
                    <div
                      key={visitor.id}
                      className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                          <User className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {visitor.nome}
                          </h3>
                          {visitor.observacao && (
                            <p className="text-gray-600 mt-1 text-sm">
                              {visitor.observacao}
                            </p>
                          )}
                          <p className="text-gray-400 text-xs mt-2">
                            {format(
                              visitor.dataHora,
                              "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
                              { locale: ptBR }
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  Nenhum visitante registrado ainda
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
