import Image from "next/image"

import { Image as ImageType } from "@/models/Image"

import styles from "./Header.module.css"

interface HeaderProps {
  cover: ImageType
  logo: ImageType
  title: string
  subtitle: string
}

export default function Header({ cover, logo, title, subtitle }: HeaderProps) {
  return (
    <header className={styles.header}>
      <Image
        className={styles.cover}
        src={cover.src}
        alt={cover.alt}
        priority
        width={0}
        height={0}
        sizes="100vw"
        style={{ width: "100%", height: "auto" }}
      />
      <div className={styles.titleContainer}>
        <Image
          className={styles.logo}
          src={logo.src}
          alt={logo.alt}
          priority
          width={0}
          height={0}
          sizes="100vw"
          style={{ width: "100%", height: "auto" }}
        />
        <div className={styles.text}>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
      </div>
    </header>
  )
}
