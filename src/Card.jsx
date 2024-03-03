import { useRef } from "react"

import Logo from "./Logo.jsx"

export default function Card({ title, content }) {
  const boundingRef = useRef(null)

  return (
    <div className="[perspective:1000px]">
      <div
        onMouseLeave={() => (boundingRef.current = null)}
        onMouseEnter={(ev) => {
          boundingRef.current = ev.currentTarget.getBoundingClientRect()
        }}
        onMouseMove={(ev) => {
          if (!boundingRef.current) return
          const x = ev.clientX - boundingRef.current.left
          const y = ev.clientY - boundingRef.current.top
          const xPercentage = x / boundingRef.current.width
          const yPercentage = y / boundingRef.current.height
          const xRotation = (0.5 - yPercentage) * 20
          const yRotation = (xPercentage - 0.5) * 20

          ev.currentTarget.style.setProperty("--x-rotation", `${xRotation.toFixed(1)}deg`)
          ev.currentTarget.style.setProperty("--y-rotation", `${yRotation.toFixed(1)}deg`)
          ev.currentTarget.style.setProperty("--x", `${(xPercentage * 100).toFixed(1)}%`)
          ev.currentTarget.style.setProperty("--y", `${(yPercentage * 100).toFixed(1)}%`)
        }}
        className="group flex flex-col relative p-4 text-primary bg-secondary rounded-md transition-transform ease-out hover:[transform:rotateX(var(--x-rotation))_rotateY(var(--y-rotation))_scale(1.1)]"
      >
        <figure className="w-64 h-64 rounded-md mix-blend-multiply [background-image:radial-gradient(at_70%_40%,transparent_30%,currentColor_80%)]" />
        <div className="pt-4">
          <h2 className="text-3xl font-bold">{title}</h2>
          <p className="text-xl">{content}</p>
        </div>
        <footer className="flex flex-row justify-between mt-16">
          <p className="flex items-center px-1 text-xs rounded-sm border border-current uppercase">
            Card{" "}
            <span className="mx-1 w-5 h-full border-x border-current bg-[repeating-linear-gradient(-45deg,currentColor,currentColor_1px,transparent_1px,transparent_2px)]" />{" "}
            {new Date().toLocaleDateString("en-BE", { day: "2-digit", month: "short", year: "numeric" })}
          </p>
          <div className="w-10">
            <Logo />
          </div>
        </footer>
        <div className="pointer-events-none absolute inset-0 rounded-md group-hover:bg-[radial-gradient(at_var(--x)_var(--y),rgba(255,255,255,0.3)_20%,transparent_80%)]" />
      </div>
    </div>
  )
}
