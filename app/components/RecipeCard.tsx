import Image from "next/image"
import { Clock, Users } from "lucide-react"

interface Recipe {
  name: string
  image: string
  prepTime: string
  servings: number
}

export default function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <Image
        src={recipe.image || "/placeholder.svg"}
        alt={recipe.name}
        width={400}
        height={300}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-bold mb-2">{recipe.name}</h2>
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            {recipe.prepTime}
          </div>
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            {recipe.servings} servings
          </div>
        </div>
      </div>
    </div>
  )
}

