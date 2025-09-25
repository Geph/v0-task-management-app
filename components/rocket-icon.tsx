"use client"

import Image from "next/image"

export function RocketIcon({ className }: { className?: string }) {
  return <Image src="/rocket-logo.svg" alt="Rocket Logo" width={32} height={32} className={className} />
}
