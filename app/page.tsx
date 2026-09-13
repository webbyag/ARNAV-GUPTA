"use client";

import { useState } from "react";
import Viewer from "@/components/viewer/Viewer";

type ModelType = "helmet" | "sphere" | "cube";

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState<ModelType>("helmet");
  const [status, setStatus] = useState("Ready");

  async function handleGenerate() {
    if (!prompt.trim()) {
      setStatus("Please describe something first.");
      return;
    }

    setStatus("3DBRAIN is thinking...");

    try {
      const response = await fetch("http://localhost:8000/api/brain", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: prompt,
        }),
      });

      if (!response.ok) {
        throw new Error("Brain API request failed");
      }

      const data = await response.json();

      setModel(data.model);

      setStatus(
        `Brain: ${data.entity} (${Math.round(data.confidence * 100)}% confidence)`
      );
    } catch (error) {
      console.error(error);
      setStatus("Could not connect to the 3DBRAIN brain.");
    }
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
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleGenerate();
              }
            }}
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

        <p className="mt-4 text-sm text-gray-400">
          {status}
        </p>

        <div className="mt-6 flex gap-3">
          <button
            onClick={() => {
              setModel("helmet");
              setStatus("Showing helmet");
            }}
            className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800"
          >
            Helmet
          </button>

          <button
            onClick={() => {
              setModel("sphere");
              setStatus("Showing ball");
            }}
            className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800"
          >
            Ball
          </button>

          <button
            onClick={() => {
              setModel("cube");
              setStatus("Showing cube");
            }}
            className="rounded-lg border border-gray-700 px-4 py-2 hover:bg-gray-800"
          >
            Cube
          </button>
        </div>

      </section>
    </main>
  );
}