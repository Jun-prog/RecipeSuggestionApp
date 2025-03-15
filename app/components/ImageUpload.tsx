import type React from "react"
import { useState } from "react"
import { Camera } from "lucide-react"

interface ImageUploadProps {
  onAnalysis: (imageUrl: string) => void
}

export default function ImageUpload({ onAnalysis }: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(null)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      const url = URL.createObjectURL(file)
      setImageUrl(url)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4">材料の写真をアップロード</h2>
      <div className="mb-4">
        <label
          htmlFor="image-upload"
          className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
        >
          {imageUrl ? (
            <img
              src={imageUrl || "/placeholder.svg"}
              alt="Uploaded"
              className="w-full h-full object-cover rounded-lg"
            />
          ) : (
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Camera className="w-12 h-12 text-gray-400 mb-2" />
              <p className="mb-2 text-sm text-gray-500">
                <span className="font-semibold">クリックしてアップロード</span>
                またはドラッグ＆ドロップ
              </p>
            </div>
          )}
          <input id="image-upload" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
        </label>
      </div>
      <button
        onClick={() => imageUrl && onAnalysis(imageUrl)}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-200"
        disabled={!imageUrl}
      >
        解析開始
      </button>
    </div>
  )
}

