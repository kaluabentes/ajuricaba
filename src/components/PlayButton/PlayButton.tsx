import { BiPause, BiPlay } from "react-icons/bi"

import styles from "./PlayButton.module.css"
import clsx from "clsx"

interface PlayButtonProps {
  isPlaying?: boolean
  variant?: "primary" | "secondary"
  className?: string
}

const variants = {
  primary: styles.primary,
  secondary: styles.secondary,
}

export default function PlayButton({
  isPlaying,
  className,
  variant = "primary",
}: PlayButtonProps) {
  return (
    <button className={clsx(styles.button, className, variants[variant])}>
      {isPlaying ? <BiPause /> : <BiPlay />}
    </button>
  )
}
