import { ItemType } from '~/types'

export const ALERTS_STORE_ID = 'ALERTS_STORE_ID'
export const ITEMS_STORE_ID = 'ITEMS_STORE_ID'
export const LOCALES_STORE_ID = 'LOCALES_STORE_ID'
export const PROFILES_STORE_ID = 'PROFILES_STORE_ID'

export const LOCALE_STORAGE_KEY = 'LOCALE_STORAGE_KEY'

export enum SupportedLocales {
  EN = 'en',
  PT = 'pt',
}

export enum SupportedDirections {
  RTL = 'rtl',
  LTR = 'ltr',
}

export const TYPE_OPTIONS = Object.values(ItemType).map((itemType) => {
  return {
    name: itemType,
    label: `item-types.${itemType}`
  }
})
