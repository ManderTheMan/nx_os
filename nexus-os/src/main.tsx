import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { FasciaProvider } from './6-energy/FasciaContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <FasciaProvider>
      <App />
    </FasciaProvider>
  </React.StrictMode>,
)