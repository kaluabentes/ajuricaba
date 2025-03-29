export interface Song {
  id: number
  src: string
  name: string
}

export interface Album {
  id: number
  name: string
  year: string
  cover: string
  songs: Song[]
}
