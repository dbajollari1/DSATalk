import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';
import './index.css';
import {BrowserRouter} from 'react-router-dom';

import fbconfig from './firebase/FirebaseConfig';
import {initializeApp} from 'firebase/app';
import { getAuth, setPersistence, browserSessionPersistence } from 'firebase/auth';

const app = initializeApp(fbconfig);
const auth = getAuth();
setPersistence(auth, browserSessionPersistence).then(() => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
});
