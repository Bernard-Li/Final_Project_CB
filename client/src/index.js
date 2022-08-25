import React from 'react';
import ReactDom from 'react-dom/client';
import App from './App';

import { Auth0Provider} from "@auth0/auth0-react";


const root = ReactDom.createRoot(document.getElementById('root'));


root.render(
  <Auth0Provider  
    domain="dev-l7lcvmhj.us.auth0.com"
    clienId="oRacuBVWpMIxIUqbgaRyZAgaCwgqR5qL"
    redirectUri='http://localhost:3000' //put user page or home page here?
    >
    <App />
    </Auth0Provider>
);