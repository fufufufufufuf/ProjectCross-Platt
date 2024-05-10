import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import firebase from '../src/Firebase/firebase'

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);