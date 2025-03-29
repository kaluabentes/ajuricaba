"use client"

import Image from "next/image"

import { Album, Song } from "@/models/Album"

import styles from "./AlbumView.module.css"
import Link from "next/link"
import { BiArrowBack, BiChevronLeft } from "react-icons/bi"
import Footer from "@/components/Footer/Footer"
import PlayButton from "@/components/PlayButton/PlayButton"
import { usePlayerContext } from "@/contexts/PlayerContext/PlayerContext"

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
            src={album?.cover!}
            alt={album?.name!}
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
              isPlaying={playerContext.song?.isPlaying}
              onClick={handlePlayFirst}
              className={styles.playButton}
            />
          </div>
        </header>
        <ul className={styles.playlist}>
          {album.songs.map((song) => (
            <li key={song.id}>
              <button
                onClick={() => handlePlaySong(song)}
                className={styles.song}
              >
                {song.name}
              </button>
            </li>
          ))}
        </ul>
      </article>
    </>
  )
}
