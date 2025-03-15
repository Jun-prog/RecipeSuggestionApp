"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ThumbsUp, ThumbsDown } from "lucide-react"

interface Recipe {
  name: string
  ingredients: string[]
  instructions: string[]
}

interface RecipeSuggestionsProps {
  ingredients: string[]
}

export default function RecipeSuggestions({ ingredients }: RecipeSuggestionsProps) {
  const [recipes, setRecipes] = useState<Recipe[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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
      console.log("Liked recipe:", recipes[currentIndex].name)
    } else {
      console.log("Disliked recipe:", recipes[currentIndex].name)
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % recipes.length)
  }

  if (isLoading) {
    return <div className="text-center">レシピを生成中...</div>
  }

  if (error) {
    return (
      <div className="text-center text-red-500">
        <p>{error}</p>
        <button
          onClick={generateRecipes}
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          再試行
        </button>
      </div>
    )
  }

  if (recipes.length === 0) {
    return <div className="text-center">レシピが見つかりませんでした。</div>
  }

  const currentRecipe = recipes[currentIndex]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">レシピ提案</h2>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -300 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        >
          <h3 className="text-xl font-semibold mb-2">{currentRecipe.name}</h3>
          <h4 className="font-medium mb-2">材料:</h4>
          <ul className="list-disc list-inside mb-4">
            {currentRecipe.ingredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
          <h4 className="font-medium mb-2">手順:</h4>
          <ol className="list-decimal list-inside mb-6">
            {currentRecipe.instructions.map((step, index) => (
              <li key={index}>{step}</li>
            ))}
          </ol>
        </motion.div>
      </AnimatePresence>
      <div className="flex justify-between mt-4">
        <button onClick={() => handleSwipe("left")} className="p-2 bg-red-100 rounded-full shadow-lg">
          <ThumbsDown className="w-8 h-8 text-red-500" />
        </button>
        <button onClick={() => handleSwipe("right")} className="p-2 bg-green-100 rounded-full shadow-lg">
          <ThumbsUp className="w-8 h-8 text-green-500" />
        </button>
      </div>
    </div>
  )
}

