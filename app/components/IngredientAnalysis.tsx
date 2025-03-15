interface IngredientAnalysisProps {
  ingredients: string[]
  onConfirm: () => void
}

export default function IngredientAnalysis({ ingredients, onConfirm }: IngredientAnalysisProps) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">解析結果</h2>
      <p className="mb-4">以下の材料が検出されました：</p>
      <ul className="list-disc list-inside mb-6">
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <button
        onClick={onConfirm}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
      >
        レシピを提案する
      </button>
    </div>
  )
}

