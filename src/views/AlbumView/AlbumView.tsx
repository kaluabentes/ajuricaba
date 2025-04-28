"use client"

import Image from "next/image"

import { Album, Song } from "@/models/Album"

import styles from "./AlbumView.module.css"
import Link from "next/link"
import { BiArrowBack, BiDownload } from "react-icons/bi"
import PlayButton from "@/components/PlayButton/PlayButton"
import { usePlayerContext } from "@/contexts/PlayerContext/PlayerContext"
import clsx from "clsx"

interface AlbumViewProps {
  album: Album
}

export default function AlbumView({ album }: AlbumViewProps) {
  const { playerContext, setPlayerContext } = usePlayerContext()

  const handlePlayFirst = () => {
    const song = album.songs[0]
    setPlayerContext((prev) => ({
      song: {
        albumId: album.id,
        name: song.name,
        src: song.src,
        cover: album.cover,
        isPlaying: !Boolean(prev.song?.isPlaying),
      },
    }))
  }

  const handlePlaySong = (song: Song) => {
    setPlayerContext(() => ({
      song: {
        albumId: album.id,
        name: song.name,
        src: song.src,
        cover: album.cover,
        isPlaying: true,
      },
    }))
  }

  return (
    <>
      <header className={styles.pageHeader}>
        <Link className={styles.backButton} href="/">
          <BiArrowBack />
        </Link>
        <p className={styles.albumTopline}>Album</p>
      </header>
      <article className={styles.container}>
        <header className={styles.header}>
          <Image
            className={styles.cover}
            src={album.cover!}
            alt={album.name!}
            priority
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: "100%", height: "auto" }}
          />
          <div className={styles.info}>
            <h1 className={styles.albumName}>{album?.name}</h1>
            <div className={styles.metadata}>
              <p>{album?.year}</p>
              <p>{album?.songs.length} músicas</p>
            </div>
            <PlayButton
              isPlaying={
                playerContext.song?.isPlaying &&
                playerContext.song?.albumId === album.id
              }
              onClick={handlePlayFirst}
              className={styles.playButton}
            />
          </div>
        </header>
        <ul className={styles.playlist}>
          {album.songs.map((song) => (
            <li className={styles.songItem} key={song.id}>
              <button
                onClick={() => handlePlaySong(song)}
                className={clsx(
                  styles.song,
                  playerContext.song?.name === song.name && styles.active
                )}
              >
                {song.name}
              </button>
              <Link
                className={styles.downloadButton}
                target="_blank"
                href={song.src}
                download
              >
                <BiDownload />
              </Link>
            </li>
          ))}
        </ul>
      </article>
    </>
  )
}
