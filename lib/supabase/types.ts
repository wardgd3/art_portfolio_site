export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      artworks: {
        Row: {
          id: string
          slug: string
          title: string
          year: number | null
          medium: string | null
          subject: string[]
          width_in: number | null
          height_in: number | null
          width_cm: number | null
          height_cm: number | null
          orientation: 'portrait' | 'landscape' | 'square' | null
          framed: boolean
          description: string
          status: 'available' | 'sold' | 'reserved'
          type: 'original' | 'print'
          price_cents: number | null
          cover_image_url: string | null
          images: string[]
          tags: string[]
          created_at: string
          updated_at: string
          published: boolean
        }
        Insert: {
          id?: string
          slug: string
          title: string
          year?: number | null
          medium?: string | null
          subject?: string[]
          width_in?: number | null
          height_in?: number | null
          width_cm?: number | null
          height_cm?: number | null
          orientation?: 'portrait' | 'landscape' | 'square' | null
          framed?: boolean
          description?: string
          status?: 'available' | 'sold' | 'reserved'
          type?: 'original' | 'print'
          price_cents?: number | null
          cover_image_url?: string | null
          images?: string[]
          tags?: string[]
          created_at?: string
          updated_at?: string
          published?: boolean
        }
        Update: {
          id?: string
          slug?: string
          title?: string
          year?: number | null
          medium?: string | null
          subject?: string[]
          width_in?: number | null
          height_in?: number | null
          width_cm?: number | null
          height_cm?: number | null
          orientation?: 'portrait' | 'landscape' | 'square' | null
          framed?: boolean
          description?: string
          status?: 'available' | 'sold' | 'reserved'
          type?: 'original' | 'print'
          price_cents?: number | null
          cover_image_url?: string | null
          images?: string[]
          tags?: string[]
          created_at?: string
          updated_at?: string
          published?: boolean
        }
      }
      editions: {
        Row: {
          id: string
          artwork_id: string
          label: string
          edition_size: number
          remaining: number
          price_cents: number
          sku: string
          created_at: string
        }
        Insert: {
          id?: string
          artwork_id: string
          label: string
          edition_size?: number
          remaining?: number
          price_cents: number
          sku: string
          created_at?: string
        }
        Update: {
          id?: string
          artwork_id?: string
          label?: string
          edition_size?: number
          remaining?: number
          price_cents?: number
          sku?: string
          created_at?: string
        }
      }
      newsletter_subscribers: {
        Row: {
          id: string
          email: string
          created_at: string
        }
        Insert: {
          id?: string
          email: string
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          created_at?: string
        }
      }
      inquiries: {
        Row: {
          id: string
          artwork_id: string | null
          edition_id: string | null
          name: string
          email: string
          message: string
          country: string | null
          status: 'new' | 'replied' | 'closed'
          created_at: string
        }
        Insert: {
          id?: string
          artwork_id?: string | null
          edition_id?: string | null
          name: string
          email: string
          message?: string
          country?: string | null
          status?: 'new' | 'replied' | 'closed'
          created_at?: string
        }
        Update: {
          id?: string
          artwork_id?: string | null
          edition_id?: string | null
          name?: string
          email?: string
          message?: string
          country?: string | null
          status?: 'new' | 'replied' | 'closed'
          created_at?: string
        }
      }
    }
  }
}
