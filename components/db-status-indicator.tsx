"use client"

import { useState, useEffect, useRef } from "react"

type DbStatus = "checking" | "connected" | "error" | "unconfigured"

export function DbStatusIndicator() {
  const [status, setStatus] = useState<DbStatus>("checking")
  const [errorMessage, setErrorMessage] = useState<string>("")
  const [popupOpen, setPopupOpen] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT

  useEffect(() => {
    if (!endpoint) {
      setStatus("unconfigured")
      setErrorMessage("NEXT_PUBLIC_ANALYTICS_ENDPOINT is not set. See DATABASE.md for setup instructions.")
      return
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 8000)

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_name: "connection_check",
        anonymous_id: "health-check",
        properties: {},
      }),
      signal: controller.signal,
    })
      .then((res) => {
        clearTimeout(timeoutId)
        if (res.ok || res.status === 200) {
          setStatus("connected")
          setErrorMessage("")
        } else {
          return res.json().then((data) => {
            setStatus("error")
            setErrorMessage(
              data?.error
                ? `HTTP ${res.status}: ${data.error}${data.detail ? ` — ${data.detail}` : ""}`
                : `HTTP ${res.status}: Unexpected response from endpoint.`,
            )
          })
        }
      })
      .catch((err) => {
        clearTimeout(timeoutId)
        if (err.name === "AbortError") {
          setStatus("error")
          setErrorMessage("Connection timed out after 8 seconds. Check that the PHP endpoint is reachable.")
        } else {
          setStatus("error")
          setErrorMessage(err.message || "Network error: could not reach the analytics endpoint.")
        }
      })

    return () => {
      clearTimeout(timeoutId)
      controller.abort()
    }
  }, [endpoint])

  // Close popup when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setPopupOpen(false)
      }
    }
    if (popupOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [popupOpen])

  const handleClick = () => {
    if (status !== "connected") {
      setPopupOpen((prev) => !prev)
    }
  }

  const dotColor =
    status === "connected"
      ? "bg-green-400"
      : status === "checking"
        ? "bg-yellow-400 animate-pulse"
        : "bg-red-500"

  const dotLabel =
    status === "connected"
      ? "Database connected"
      : status === "checking"
        ? "Checking database connection..."
        : status === "unconfigured"
          ? "Database not configured — click for details"
          : "Database connection error — click for details"

  return (
    <div className="relative flex items-center">
      <button
        ref={buttonRef}
        type="button"
        aria-label={dotLabel}
        title={dotLabel}
        onClick={handleClick}
        className={`w-3 h-3 rounded-full flex-shrink-0 ${dotColor} ${status !== "connected" ? "cursor-pointer" : "cursor-default"} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60`}
      />

      {popupOpen && status !== "connected" && (
        <div
          ref={popupRef}
          role="dialog"
          aria-modal="false"
          aria-label="Database connection error"
          className="absolute top-6 right-0 z-50 w-80 rounded-lg border border-white/20 bg-gray-900 p-4 shadow-xl text-sm text-white"
        >
          <p className="font-semibold mb-1">
            {status === "unconfigured" ? "Database not configured" : "Database connection error"}
          </p>
          <p className="text-white/75 leading-relaxed break-words">{errorMessage}</p>
          {status === "unconfigured" && (
            <p className="mt-2 text-white/50 text-xs">
              See <span className="font-mono">DATABASE.md</span> for setup instructions.
            </p>
          )}
          <button
            type="button"
            onClick={() => setPopupOpen(false)}
            className="mt-3 text-xs text-white/50 hover:text-white/80 underline"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  )
}
