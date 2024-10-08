import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { SnackbarProvider } from 'notistack';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);


root.render(
  <React.StrictMode>
    <SnackbarProvider maxSnack={3}>
    <App />
    </SnackbarProvider>
  </React.StrictMode>,
)


