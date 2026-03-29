import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import FloatingElements from "./FloatingElements";

export default function Scene3D(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props}>
      <Canvas
        style={{ width: "100%", height: "100%" }}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          preserveDrawingBuffer: false,
          stencil: false,
          depth: true,
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
        }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight position={[2, 2, 2]} intensity={1.0} />

        <Suspense fallback={null}>
          <FloatingElements />
        </Suspense>

        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={false}
          autoRotate
          autoRotateSpeed={0.45}
        />
      </Canvas>
    </div>
  );
}