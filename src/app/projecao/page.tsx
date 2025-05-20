import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { VisitorsTab } from '@/components/visitor/visitor-tab'
import { NoticeTab } from '@/components/notice/notice-tab'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-600">IgrejaConnect</h1>
            <p className="text-gray-500 text-sm">
              Sistema de gerenciamento para igrejas
            </p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <Tabs defaultValue="visitantes" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="visitantes">Visitantes</TabsTrigger>
            <TabsTrigger value="avisos">Avisos</TabsTrigger>
          </TabsList>

          <TabsContent value="visitantes">
            <VisitorsTab isProjectionScreen={true} />
          </TabsContent>

          <TabsContent value="avisos">
            <NoticeTab isProjectionScreen={true} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
