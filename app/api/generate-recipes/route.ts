import { NextResponse } from "next/server"
import { dummyRecipes } from "@/app/data/dummy-recipes"

export async function POST(req: Request) {
  try {
    // ダミーデータをシャッフルして返す
    const shuffledRecipes = [...dummyRecipes].sort(() => Math.random() - 0.5)

    // レスポンスの形式を明示的に指定
    return NextResponse.json({ recipes: shuffledRecipes })
  } catch (error) {
    console.error("レシピの取得に失敗しました:", error)
    return NextResponse.json({ error: "レシピの取得に失敗しました" }, { status: 500 })
  }
}

