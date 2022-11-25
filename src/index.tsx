import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from 'antd';
import App from './app'

import './global.scss'


const dom = document.getElementById('root')

if (dom) {
  ReactDOM.createRoot(dom).render(<ConfigProvider theme={{ token: { colorPrimary: "#ff7722" } }}>
    <App />
  </ConfigProvider>)
}
