export enum ItemFilters {
  ALL = 'ALL',
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
}

export enum ItemType {
  NONE = 'NONE',
  SERIE = 'SERIE',
  MOVIE = 'MOVIE',
  COMIC = 'COMIC',
  ANIME = 'ANIME',
  BOOK = 'BOOK',
  MANGA = 'MANGA',
  MANHUA = 'MANHUA',
  MANHWA = 'MANHWA',
}

export interface Item {
  id: string,
  profile_id: string,
  type: ItemType,
  label: string,
  season?: string,
  episode?: string,
  volume?: string,
  chapter?: string,
  completed?: boolean,
  link?: string,
  updated_at: Date,
  created_at: Date,
}

export type EditableItem = Omit<Item, 'id' | 'profile_id' | 'updated_at' | 'created_at'>
