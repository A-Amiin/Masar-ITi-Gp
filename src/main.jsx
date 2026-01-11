import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "@fontsource/amiri";
import "@fontsource/amiri/700.css";
import "@fontsource/amiri/400-italic.css";
import "@fontsource/amiri/700-italic.css";
import App from './App.jsx'
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
