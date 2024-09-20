import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {Amplify} from 'aws-amplify';
import App from './App.tsx'
import './index.css'

const AWS_AMPLIFY_POOL_ID = '';
const AWS_AMPLIFY_CLIENT_ID = '';

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: AWS_AMPLIFY_POOL_ID,
      userPoolClientId: AWS_AMPLIFY_CLIENT_ID,
    },
  },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
