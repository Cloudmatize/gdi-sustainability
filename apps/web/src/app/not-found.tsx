import { Button } from "@/components/ui/button"
import { FileQuestion } from 'lucide-react'
import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <FileQuestion className="w-24 h-24 mx-auto mb-6" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Página não encontrada</h2>
        <p className="text-gray-600 mb-8">
          Desculpe, a página que você está procurando não existe.
        </p>
        <Button 
          asChild
          variant={'outline'}
          className=" font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Link href="/">
            Voltar para a página inicial
          </Link>
        </Button>
      </div>
    </div>
  )
}