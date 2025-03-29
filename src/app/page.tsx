import Header from "@/components/Header/Header"
import { albums, bandGenre, bandName } from "./data"
import Albums from "@/components/Albums/Albums"
import Footer from "@/components/Footer/Footer"

export default function Home() {
  return (
    <>
      <Header
        title={bandName}
        subtitle={bandGenre}
        cover={{ src: "/cover.png", alt: "Ajuricaba capa" }}
        logo={{ src: "/logo.png", alt: "Ajuricaba logo" }}
      />
      <Albums albums={albums} />
      <Footer />
    </>
  )
}
