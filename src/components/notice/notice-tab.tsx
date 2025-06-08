'use client'

import { useState } from 'react'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { BellRing, Plus, Calendar } from 'lucide-react'
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

import { Badge } from '@/components/ui/badge'
import { NoticeForm } from './notice-form'

type Notice = {
  id: string
  titulo: string
  descricao: string | undefined
  dataPublicacao: Date | undefined
  dataHoraEvento: Date | null
}

export function NoticeTab({
  isProjectionScreen,
}: {
  isProjectionScreen?: boolean
}) {
  const [avisos, setAvisos] = useState<Notice[]>([
    {
      id: '1',
      titulo: 'Culto Especial de Jovens',
      descricao:
        'Neste sábado teremos um culto especial para os jovens com a presença do Pr. Carlos Silva.',
      dataPublicacao: new Date(2023, 4, 14),
      dataHoraEvento: new Date(2023, 4, 20, 19, 0), // 20 de maio às 19h
    },
    {
      id: '2',
      titulo: 'Escola Bíblica Dominical',
      descricao:
        'A EBD deste domingo terá um tema especial sobre família. Não perca!',
      dataPublicacao: new Date(2023, 4, 13),
      dataHoraEvento: new Date(2023, 4, 21, 9, 0), // 21 de maio às 9h
    },
  ])
  const [dialogOpen, setDialogOpen] = useState(false)

  const handleAddAviso = (novoAviso: Omit<Notice, 'id' | 'dataPublicacao'>) => {
    const avisoCompleto: Notice = {
      ...novoAviso,
      id: Date.now().toString(),
      dataPublicacao: new Date(),
    }

    setAvisos([avisoCompleto, ...avisos])
    setDialogOpen(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-700">
          Gerenciamento de Avisos
        </h2>

        {/* Botão para abrir o dialog em dispositivos móveis */}
        {!isProjectionScreen && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <Button className="md:hidden" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Novo Aviso
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Adicionar Aviso</DialogTitle>
              </DialogHeader>
              <NoticeForm
                onSubmit={(data) =>
                  handleAddAviso({
                    ...data,
                    descricao: data.descricao || '',
                  })
                }
              />
            </DialogContent>
          </Dialog>
        )}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Formulário visível apenas em desktop */}
        {!isProjectionScreen && (
          <Card className="hidden md:block">
            <CardHeader>
              <CardTitle>Avisos da Semana</CardTitle>
              <CardDescription>
                Adicione avisos importantes para a comunidade
              </CardDescription>
            </CardHeader>
            <CardContent>
              <NoticeForm
                onSubmit={(data) =>
                  handleAddAviso({
                    ...data,
                    descricao: data.descricao || '',
                  })
                }
              />
            </CardContent>
          </Card>
        )}

        {/* Lista de avisos (ocupa toda a largura em mobile) */}
        <Card className="md:col-span-1 col-span-2">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Avisos Publicados</CardTitle>
              <CardDescription>
                Lista de avisos importantes para a comunidade
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea
              className={`${
                !isProjectionScreen ? 'h-[400px]' : ' h-auto'
              } pr-4`}
            >
              {avisos.length > 0 ? (
                <div className="space-y-4">
                  {avisos.map((aviso) => (
                    <div
                      key={aviso.id}
                      className="p-4 border rounded-lg bg-white shadow-sm"
                    >
                      <div className="flex items-start gap-3">
                        <div className="bg-blue-100 p-2 rounded-full text-blue-600">
                          <BellRing className="h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium text-gray-900">
                            {aviso.titulo}
                          </h3>
                          <p className="text-gray-600 mt-1 text-sm">
                            {aviso.descricao}
                          </p>

                          {aviso.dataHoraEvento && (
                            <div className="mt-2 flex items-center">
                              <Badge
                                variant="outline"
                                className="flex items-center gap-1 text-blue-600 border-blue-200 bg-blue-50"
                              >
                                <Calendar className="h-3 w-3" />
                                {format(
                                  aviso.dataHoraEvento,
                                  "dd 'de' MMMM 'às' HH:mm",
                                  { locale: ptBR }
                                )}
                              </Badge>
                            </div>
                          )}

                          <p className="text-gray-400 text-xs mt-2">
                            Publicado em{' '}
                            {format(
                              aviso.dataPublicacao || new Date(),
                              "dd 'de' MMMM 'de' yyyy",
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
                  Nenhum aviso publicado ainda
                </div>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
