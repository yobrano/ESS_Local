import React from 'react';
import ReactDOM from 'react-dom';
// import './css/materialdesignicons.min.css';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from './store/store';
// import SimpleReactLightbox from 'simple-react-lightbox'
import ThemeContext from './context/Themecontext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      {/* <SimpleReactLightbox> */}
      <BrowserRouter >
      {/* basename='/react/demo' */}
        <ThemeContext>
          <App />
        </ThemeContext>
        </BrowserRouter>
      {/* </SimpleReactLightbox> */}
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
