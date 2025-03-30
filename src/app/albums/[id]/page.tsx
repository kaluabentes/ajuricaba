"use client"

import { albums } from "@/app/data"
import AlbumView from "@/views/AlbumView/AlbumView"

import { useParams } from "next/navigation"

export default function AlbumPage() {
  const { id } = useParams()

  const album = albums.find((album) => album.id === Number(id))

  return <AlbumView album={album!} />
}
