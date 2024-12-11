import { Button } from "@/components/ui/button"
import type { DictionaryContextType } from "@/context/DictionaryContext"
import { FileQuestion } from "lucide-react"
import Link from "next/link"


function NotFound({ dict }: DictionaryContextType['dict']) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-md mx-auto text-center">
        <FileQuestion className="w-24 h-24 mx-auto mb-6 text-primary-foreground" />
        <h1 className="text-4xl font-bold text-gray-900 mb-2">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">{dict?.notFound.title}</h2>
        <p className="text-gray-600 mb-8">
          {dict?.notFound.description}
        </p>
        <Button
          asChild
          variant={'outline'}
          className="text-primary-foreground shadow-primary font-semibold py-2 px-6 rounded-full transition duration-300 ease-in-out transform hover:scale-105"
        >
          <Link href="/">
            {dict?.notFound.link}
          </Link>
        </Button>
      </div>
    </div>
  )
}

export default NotFound
