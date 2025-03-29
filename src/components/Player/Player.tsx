"use client"

import Image from "next/image"

import { usePlayerContext } from "@/contexts/PlayerContext/PlayerContext"

import styles from "./Player.module.css"
import { BiSkipNext, BiSkipPrevious } from "react-icons/bi"
import PlayButton from "../PlayButton/PlayButton"

export default function Player() {
  const {
    playerContext: { song },
  } = usePlayerContext()

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
          <button className={styles.selectButton}>
            <BiSkipPrevious />
          </button>
          <PlayButton isPlaying variant="secondary" />
          <button className={styles.selectButton}>
            <BiSkipNext />
          </button>
        </div>
      </div>
    </footer>
  )
}
