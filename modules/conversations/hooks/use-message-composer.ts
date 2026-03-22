"use client"

import { useState, useRef, useEffect } from "react"

export function useMessageComposer(onSend?: (text: string) => void) {
  const [text, setText] = useState("")
  const [recording, setRecording] = useState(false)
  const [recordingSeconds, setRecordingSeconds] = useState(0)
  const [showAttachMenu, setShowAttachMenu] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const attachRef = useRef<HTMLDivElement>(null)

  // Auto-resize textarea
  useEffect(() => {
    const el = textareaRef.current
    if (!el) return
    el.style.height = "auto"
    el.style.height = `${Math.min(el.scrollHeight, 160)}px`
  }, [text])

  // Recording timer
  useEffect(() => {
    if (recording) {
      timerRef.current = setInterval(() => setRecordingSeconds((s) => s + 1), 1000)
    } else {
      if (timerRef.current) clearInterval(timerRef.current)
      setRecordingSeconds(0)
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [recording])

  // Close attach menu on outside click
  useEffect(() => {
    function handler(e: MouseEvent) {
      if (attachRef.current && !attachRef.current.contains(e.target as Node)) {
        setShowAttachMenu(false)
      }
    }
    document.addEventListener("mousedown", handler)
    return () => document.removeEventListener("mousedown", handler)
  }, [])

  const formatRecording = (s: number) => {
    const m = Math.floor(s / 60)
    const sec = s % 60
    return `${m}:${sec.toString().padStart(2, "0")}`
  }

  const handleSend = () => {
    const trimmed = text.trim()
    if (!trimmed) return
    onSend?.(trimmed)
    setText("")
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return {
    text,
    setText,
    recording,
    setRecording,
    recordingSeconds,
    showAttachMenu,
    setShowAttachMenu,
    textareaRef,
    attachRef,
    formatRecording,
    handleSend,
    handleKeyDown,
  }
}
