"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

type ModelType = "helmet" | "sphere" | "cube";

type ViewerProps = {
  model: ModelType;
};

function Helmet() {
  const { scene } = useGLTF("/models/helmet.glb");

  return <primitive object={scene} scale={2} />;
}

function Sphere() {
  return (
    <mesh>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial color="red" />
    </mesh>
  );
}

function Cube() {
  return (
    <mesh>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial color="royalblue" />
    </mesh>
  );
}

function SelectedModel({ model }: ViewerProps) {
  if (model === "helmet") {
    return <Helmet />;
  }

  if (model === "sphere") {
    return <Sphere />;
  }

  if (model === "cube") {
    return <Cube />;
  }

  return null;
}

export default function Viewer({ model }: ViewerProps) {
  return (
    <div className="h-[500px] w-full overflow-hidden rounded-xl bg-slate-900">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />

        <directionalLight
          position={[5, 5, 5]}
          intensity={2}
        />

        <Suspense fallback={null}>
          <SelectedModel model={model} />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
        />
      </Canvas>
    </div>
  );
}