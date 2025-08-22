import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import { App } from './App.tsx'
import { BrowserRouter } from 'react-router-dom';
import { ContentTypeProvider } from "./context/ContentTypeContext";
import React from "react";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter >
      <React.StrictMode>
        <ContentTypeProvider>
          <App />
        </ContentTypeProvider>
      </React.StrictMode>
    </BrowserRouter >
  </StrictMode>,
)
