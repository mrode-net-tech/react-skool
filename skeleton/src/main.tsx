import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { App } from '@/app'
import { Gallery } from '@/dev/gallery'
import './index.css'

const isGallery = new URLSearchParams(window.location.search).has('gallery')

createRoot(document.getElementById('root')!).render(
  <StrictMode>{isGallery ? <Gallery /> : <App />}</StrictMode>,
)
