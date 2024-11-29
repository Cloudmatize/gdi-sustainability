import { Leaf } from 'lucide-react'

export default function LoadingPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-stone-300 via-teal-700/30 to-emerald-800/40 p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center">
          <Leaf className="w-12 h-12 text-emerald-600/50 mb-4 animate-pulse" />
          <div className="flex space-x-3">
            {[0, 1, 2].map((index) => (
              <div
                key={index}
                className="w-2 h-2 bg-emerald-600/30 bg-opacity-10 rounded-full animate-bounce"
                style={{ animationDelay: `${index * 0.1}s` }}
              />
            ))}
          </div>

          <p className="sr-only">Loading, please wait...</p>
        </div>
      </div>
    </div>
  )
}