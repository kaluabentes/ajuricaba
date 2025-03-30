import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import Player from "@/components/Player/Player"
import "@/styles/global.css"

import Providers from "./providers"

const font = Poppins({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: "Ajuricaba",
  description:
    "Ajuricaba foi líder da nação indígena dos manáos, no início do século XVIII. Revoltou-se contra os colonizadores portugueses, negando-se a servir como escravo. Deste modo, se tornou um símbolo de resistência e liberdade, além de ser considerado uma figura heroica para os cidadãos de Manaus, cidade cujo nome provém da etnia.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Providers>
          {children}
          <Player />
        </Providers>
      </body>
    </html>
  )
}
