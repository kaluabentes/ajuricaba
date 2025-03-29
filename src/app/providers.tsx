import { ReactNode } from "react"

import { PlayerProvider } from "@/contexts/PlayerContext/PlayerContext"

export default function Providers({ children }: { children: ReactNode }) {
  return <PlayerProvider>{children}</PlayerProvider>
}
