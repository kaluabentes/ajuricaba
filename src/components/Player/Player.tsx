"use client"

import Image from "next/image"

import { usePlayerContext } from "@/contexts/PlayerContext/PlayerContext"

import styles from "./Player.module.css"
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"
import PlayButton from "../PlayButton/PlayButton"
import { useCallback, useEffect, useRef } from "react"
import { albums } from "@/app/data"

export default function Player() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const {
    playerContext: { song },
    setPlayerContext,
  } = usePlayerContext()

  const handlePlaySong = () => {
    setPlayerContext((prev) => ({
      song: {
        ...prev.song!,
        isPlaying: !Boolean(prev.song?.isPlaying),
      },
    }))
  }

  const handlePrev = () => {
    const album = albums.find((album) => album.id === song?.albumId)

    if (!album) return null

    const currentIndex = album.songs.findIndex(
      (songx) => songx.name === song?.name
    )

    if (currentIndex === 0 && audioRef.current) {
      audioRef.current.currentTime = 0
      setPlayerContext((prev) => ({
        song: {
          ...prev.song!,
          isPlaying: true,
        },
      }))
      return
    }

    const prevSong = album.songs[currentIndex! - 1]

    setPlayerContext(() => ({
      song: {
        albumId: album.id,
        name: prevSong.name,
        src: prevSong.src,
        cover: album.cover,
        isPlaying: true,
      },
    }))
  }

  const handleNext = useCallback(() => {
    const album = albums.find((album) => album.id === song?.albumId)

    if (!album) return null

    const currentIndex = album?.songs.findIndex(
      (songx) => songx.name === song?.name
    )

    let nextSong = album.songs[currentIndex! + 1]

    if (currentIndex === album.songs.length - 1) {
      nextSong = album.songs[0]
    }

    setPlayerContext(() => ({
      song: {
        albumId: album.id,
        name: nextSong.name,
        src: nextSong.src,
        cover: album.cover,
        isPlaying: true,
      },
    }))
  }, [setPlayerContext, song?.albumId, song?.name])

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    const handleCanPlay = () => {
      if (song?.isPlaying) {
        audio.play()
      }
    }

    const handleSongEnd = () => {
      handleNext()
    }

    audio.addEventListener("canplaythrough", handleCanPlay)
    audio.addEventListener("ended", handleSongEnd) // Evento quando a música acaba

    return () => {
      audio.removeEventListener("canplaythrough", handleCanPlay)
      audio.removeEventListener("ended", handleSongEnd)
    }
  }, [song?.src, song?.isPlaying, handleNext]) // Monitorando mudanças na música

  useEffect(() => {
    if (song?.isPlaying && audioRef.current) {
      audioRef.current.play()
    }

    if (!song?.isPlaying && audioRef.current) {
      audioRef.current.pause()
    }
  }, [song?.isPlaying])

  if (!song) return null

  return (
    <footer className={styles.container}>
      <div className={styles.inner}>
        <div className={styles.info}>
          <Image
            className={styles.cover}
            src={song.cover}
            alt={song.name}
            priority
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <h3 className={styles.songName}>{song.name}</h3>
        </div>
        <div className={styles.controls}>
          <button onClick={handlePrev} className={styles.selectButton}>
            <BiSkipPrevious />
          </button>
          <PlayButton
            isPlaying={song.isPlaying}
            onClick={handlePlaySong}
            variant="secondary"
          />
          <button onClick={handleNext} className={styles.selectButton}>
            <BiSkipNext />
          </button>
        </div>
      </div>
      <audio ref={audioRef} src={song.src}></audio>
    </footer>
  )
}
