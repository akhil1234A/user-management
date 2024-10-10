import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Provider} from 'react-redux';
import store from './store/store';
import App from './App.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

createRoot(document.getElementById('root')).render(
 <Provider store={store}>
   <StrictMode>
    <App />
  </StrictMode>,
 </Provider>
)
