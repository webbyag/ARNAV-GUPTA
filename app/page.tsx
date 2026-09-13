export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-6xl font-bold">
          3DBRAIN
        </h1>

        <p className="mt-4 text-xl text-gray-400">
          Create anything in 3D
        </p>

        <div className="mt-8 flex gap-2">
          <input
            className="w-96 rounded-lg bg-white px-4 py-3 text-black"
            placeholder="Describe anything..."
          />

          <button className="rounded-lg bg-white px-6 py-3 font-semibold text-black">
            Generate
          </button>
        </div>
      </div>
    </main>
  );
}