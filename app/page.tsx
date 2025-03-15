"use client"

import { useState } from "react"
import ImageUpload from "./components/ImageUpload"
import IngredientAnalysis from "./components/IngredientAnalysis"
import RecipeSuggestions from "./components/RecipeSuggestions"

export default function Home() {
  const [step, setStep] = useState(1)
  const [ingredients, setIngredients] = useState<string[]>([])

  const handleImageAnalysis = async (imageUrl: string) => {
    // 実際のアプリケーションでは、ここでOpenAI Vision APIを呼び出します
    // このデモでは、モックデータを使用します
    const mockIngredients = ["トマト", "レタス", "鶏肉", "オリーブオイル"]
    setIngredients(mockIngredients)
    setStep(2)
  }

  const handleConfirmIngredients = () => {
    setStep(3)
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-blue-100 to-blue-200 p-4">
      <div className="w-full max-w-md">
        {step === 1 && <ImageUpload onAnalysis={handleImageAnalysis} />}
        {step === 2 && <IngredientAnalysis ingredients={ingredients} onConfirm={handleConfirmIngredients} />}
        {step === 3 && <RecipeSuggestions ingredients={ingredients} />}
      </div>
    </main>
  )
}

