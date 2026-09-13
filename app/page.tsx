"use client";

import { useState } from "react";
import Viewer from "@/components/viewer/Viewer";

type ModelType = "helmet" | "sphere" | "cube";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<ModelType>("helmet");

  function handleGenerate() {
    const text = prompt.toLowerCase();

    if (
      text.includes("ball") ||
      text.includes("sphere") ||
      text.includes("apple")
    ) {
      setModel("sphere");
      return;
    }

    if (
      text.includes("cube") ||
      text.includes("box") ||
      text.includes("square")
    ) {
      setModel("cube");
      return;
    }

    if (
      text.includes("helmet") ||
      text.includes("head") ||
      text.includes("robot")
    ) {
      setModel("helmet");
      return;
    }

    setModel("helmet");
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center px-6 py-12">

        <h1 className="mt-10 text-6xl font-bold">
          3DBRAIN
        </h1>

        <p className="mt-4 text-xl text-gray-400">
          Create anything in 3D
        </p>

        <div className="mt-10 w-full">
          <Viewer model={model} />
        </div>

        <div className="mt-8 flex w-full max-w-3xl gap-2">
          <input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 rounded-lg bg-white px-4 py-3 text-black outline-none"
            placeholder="Describe anything..."
          />

          <button
            onClick={handleGenerate}
            className="rounded-lg bg-white px-6 py-3 font-semibold text-black hover:bg-gray-200"
          >
            Generate
          </button>
        </div>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => setModel("helmet")}
            className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800"
          >
            Helmet
          </button>

          <button
            onClick={() => setModel("sphere")}
            className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800"
          >
            Ball
          </button>

          <button
            onClick={() => setModel("cube")}
            className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800"
          >
            Cube
          </button>
        </div>

      </section>
    </main>
  );
}