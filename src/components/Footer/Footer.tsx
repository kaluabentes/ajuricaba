import { bandName } from "@/app/data"

import styles from "./Footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p className={styles.text}>
        &copy; {bandName} {new Date().getFullYear()} - Todos os direitos
        reservados
      </p>
    </footer>
  )
}
