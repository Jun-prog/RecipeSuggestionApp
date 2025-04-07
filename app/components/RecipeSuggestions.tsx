"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp, ThumbsDown, Clock, Users, ChefHat, Heart } from "lucide-react"

interface Recipe {
  name: string
  ingredients: string[]
  instructions: string[]
  prepTime?: string
  servings?: number
  difficulty?: string
  image?: string
}

interface RecipeSuggestionsProps {
  ingredients: string[]
}

export default function RecipeSuggestions({ ingredients }: RecipeSuggestionsProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [likedRecipes, setLikedRecipes] = useState<Set<number>>(new Set())

  useEffect(() => {
    generateRecipes()
  }, [])

  const generateRecipes = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch("/api/generate-recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredients }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      console.log("Received data:", data) // デバッグ用ログ

      if (!data.recipes || !Array.isArray(data.recipes)) {
        throw new Error("Invalid response format")
      }

      setRecipes(data.recipes)
    } catch (error) {
      console.error("レシピの生成に失敗しました:", error)
      setError("レシピの生成に失敗しました。もう一度お試しください。")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSwipe = (direction: "left" | "right") => {
    if (direction === "right") {
      setLikedRecipes(prev => new Set([...prev, currentIndex]))
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length)
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center p-6 bg-red-50 rounded-lg">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={generateRecipes}
          className="bg-blue-500 text-white py-2 px-6 rounded-full hover:bg-blue-600 transition duration-200 shadow-lg hover:shadow-xl"
        >
          再試行
        </button>
      </div>
    )
  }

  if (recipes.length === 0) {
    return (
      <div className="text-center p-6 bg-gray-50 rounded-lg">
        <p className="text-gray-600">レシピが見つかりませんでした。</p>
      </div>
    )
  }

  const currentRecipe = recipes[currentIndex]

  return (
    <div className="max-w-2xl mx-auto">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-500">
            {currentRecipe.image ? (
              <img
                src={currentRecipe.image}
                alt={currentRecipe.name}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <ChefHat className="w-16 h-16 text-white opacity-50" />
              </div>
            )}
            <div className="absolute top-4 right-4">
              {likedRecipes.has(currentIndex) && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="bg-red-500 rounded-full p-2"
                >
                  <Heart className="w-6 h-6 text-white" />
                </motion.div>
              )}
            </div>
          </div>

          <div className="p-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800">{currentRecipe.name}</h3>
            
            <div className="flex gap-4 mb-6 text-gray-600">
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                <span>{currentRecipe.prepTime || "30分"}</span>
              </div>
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-1" />
                <span>{currentRecipe.servings || 2}人前</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">材料:</h4>
              <ul className="grid grid-cols-2 gap-2">
                {currentRecipe.ingredients.map((ingredient, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center text-gray-600"
                  >
                    <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                    {ingredient}
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h4 className="font-semibold text-gray-700 mb-2">手順:</h4>
              <ol className="space-y-2">
                {currentRecipe.instructions.map((step, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start text-gray-600"
                  >
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-100 text-blue-600 mr-2 flex-shrink-0">
                      {index + 1}
                    </span>
                    {step}
                  </motion.li>
                ))}
              </ol>
            </div>

            <div className="flex justify-between mt-8">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe("left")}
                className="p-4 bg-red-100 rounded-full shadow-lg hover:bg-red-200 transition-colors"
              >
                <ThumbsDown className="w-8 h-8 text-red-500" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleSwipe("right")}
                className="p-4 bg-green-100 rounded-full shadow-lg hover:bg-green-200 transition-colors"
              >
                <ThumbsUp className="w-8 h-8 text-green-500" />
              </motion.button>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

