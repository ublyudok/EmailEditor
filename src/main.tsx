import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { Home } from './components/pages/home/Home.tsx'
import { Provider } from './Provider.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider>
      <Home />
    </Provider>
  </React.StrictMode>,
)
