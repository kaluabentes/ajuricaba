import Image from "next/image"
import Link from "next/link"

import { Album } from "@/models/Album"

import styles from "./Albums.module.css"

interface AlbumsProps {
  albums: Album[]
}

export default function Albums({ albums }: AlbumsProps) {
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Albums</h2>
      <div className={styles.grid}>
        {albums.map((album) => (
          <Link
            key={album.id}
            className={styles.link}
            href={`/albums/${album.id}`}
          >
            <article className={styles.album}>
              <Image
                className={styles.cover}
                src={album.cover}
                alt={album.name}
                priority
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: "100%", height: "auto" }}
              />
              <h3 className={styles.albumName}>{album.name}</h3>
              <p className={styles.albumYear}>{album.year}</p>
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}
