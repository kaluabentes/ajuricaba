"use client"

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react"

interface Song {
  src: string
  name: string
  cover: string
}

interface PlayerContextData {
  song?: Song
}

const DEFAULT_VALUE = {
  song: {
    cover: "/mvp-cover.png",
    src: "/ajuricaba-inner-core.mp3",
    name: "Inner Core Inner Core Inner Core Inner Core Inner Core",
  },
}

const PlayerContext = createContext<PlayerContextData>(DEFAULT_VALUE)
const PlayerDispatchContext = createContext<Dispatch<
  SetStateAction<PlayerContextData>
> | null>(null)

export function PlayerProvider({ children }: { children: ReactNode }) {
  const [playerContext, setPlayerContext] =
    useState<PlayerContextData>(DEFAULT_VALUE)

  useEffect(() => {
    const fetchSettings = async () => {
      const response = await fetch("/api/Player/settings")
      const responseData = await response.json()
      setPlayerContext((prev) => ({
        ...prev,
        settings: responseData,
      }))
    }

    fetchSettings()
  }, [])

  useEffect(() => {
    const fetchCollections = async () => {
      const response = await fetch("/api/Player/collections")
      const responseData = await response.json()
      setPlayerContext((prev) => ({
        ...prev,
        collections: responseData,
      }))
    }

    fetchCollections()
  }, [])

  return (
    <PlayerContext.Provider value={playerContext}>
      <PlayerDispatchContext.Provider value={setPlayerContext}>
        {children}
      </PlayerDispatchContext.Provider>
    </PlayerContext.Provider>
  )
}

export function usePlayerContext() {
  const playerContext = useContext(PlayerContext)
  const setPlayerContext = useContext(PlayerDispatchContext)

  if (!playerContext || !setPlayerContext) {
    throw new Error("usePlayerContext must be used within a PlayerProvider")
  }

  return {
    playerContext,
    setPlayerContext,
  }
}
