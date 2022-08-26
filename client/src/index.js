import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';

import { Auth0Provider} from "@auth0/auth0-react";
import GlobalStyles from './components/GlobalStyles';


const root = ReactDom.createRoot(document.getElementById('root'));
const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

root.render(
  <Auth0Provider  
    domain={domain}
    clientId={clientId}
    redirectUri='http://localhost:3000' //put user page or home page here?
    >
    
    <App />
    </Auth0Provider>
);