import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { SearchContextProvider } from './Context/searchContext';
import { AuthContextProvider } from './Context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>

    <SearchContextProvider >
        <App />
      </SearchContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
