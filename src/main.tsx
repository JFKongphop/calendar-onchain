import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { WagmiConfig } from 'wagmi';
import { config } from './wagmi';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux';
import store from './redux/store';


ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
    <WagmiConfig config={config}>
      <BrowserRouter>
        <Provider store={store}>
          <App/>
        </Provider>
      </BrowserRouter>
    </WagmiConfig>
  // </React.StrictMode>,
)
