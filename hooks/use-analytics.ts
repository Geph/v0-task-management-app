"use client"

import { useEffect, useRef, useCallback } from "react"

// Generates a random ID and persists it across calls within the same scope.
function getOrCreate(key: string, sessionScoped = false): string {
  const storage = sessionScoped ? sessionStorage : localStorage
  const existing = storage.getItem(key)
  if (existing) return existing
  const id = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`
  storage.setItem(key, id)
  return id
}

export function useAnalytics() {
  const endpoint = process.env.NEXT_PUBLIC_ANALYTICS_ENDPOINT
  // anonymous_id persists across browser sessions (localStorage)
  // session_id resets each time the tab is closed (sessionStorage)
  const anonymousIdRef = useRef<string>("")
  const sessionIdRef = useRef<string>("")
  const sessionStartedRef = useRef(false)

  useEffect(() => {
    if (typeof window === "undefined" || !endpoint) return

    anonymousIdRef.current = getOrCreate("analytics_anonymous_id", false)
    sessionIdRef.current = getOrCreate("analytics_session_id", true)

    // Fire session_start only once per session
    if (!sessionStartedRef.current) {
      sessionStartedRef.current = true
      sendEvent(endpoint, anonymousIdRef.current, "session_start", {
        session_id: sessionIdRef.current,
        referrer: document.referrer || null,
        user_agent: navigator.userAgent,
      })
    }

    // Inactivity heartbeat — fires every 5 minutes if the tab is visible
    const HEARTBEAT_MS = 5 * 60 * 1000
    const heartbeatId = setInterval(() => {
      if (!document.hidden) {
        sendEvent(endpoint, anonymousIdRef.current, "inactivity_heartbeat", {
          session_id: sessionIdRef.current,
        })
      }
    }, HEARTBEAT_MS)

    return () => clearInterval(heartbeatId)
  }, [endpoint])

  const track = useCallback(
    (eventName: string, properties: Record<string, unknown> = {}) => {
      if (!endpoint || !anonymousIdRef.current) return
      sendEvent(endpoint, anonymousIdRef.current, eventName, {
        session_id: sessionIdRef.current,
        ...properties,
      })
    },
    [endpoint],
  )

  return { track }
}

// Fire-and-forget POST — does not throw or block the UI
function sendEvent(
  endpoint: string,
  anonymousId: string,
  eventName: string,
  properties: Record<string, unknown>,
) {
  fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event_name: eventName, anonymous_id: anonymousId, properties }),
    keepalive: true, // survives page unload
  }).catch(() => {
    // Silently ignore network errors — analytics must never break the app
  })
}
