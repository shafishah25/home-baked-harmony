import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project credentials
const supabaseUrl = 'YOUR_SUPABASE_URL'
const supabaseAnonKey = 'YOUR_SUPABASE_ANON_KEY'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  image_url?: string
  is_featured: boolean
  created_at: string
}

export interface Order {
  id: string
  name: string
  email: string
  phone: string
  product: string
  quantity: number
  delivery_date: string
  special_requests?: string
  created_at: string
}

export interface ContactMessage {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
}