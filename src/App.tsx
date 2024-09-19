import { useCallback } from 'react';
import { signIn, getCurrentUser, fetchAuthSession } from 'aws-amplify/auth';
// import {Auth} from 'aws-amplify';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
  const logIn = useCallback(async () => {
    console.log('logIn');
    try {
      const data = await signIn({
        username: 'xyz@xyz.com',
        options: { authFlowType: 'CUSTOM_WITHOUT_SRP' },
      });
      if (data.isSignedIn) {
        const session = await fetchAuthSession();
        if (session) {
          const { tokens } = session;
          if (tokens) {
            const { accessToken, idToken } = tokens;
            console.log('accessToken', accessToken);
            console.log('idToken', idToken);
          }
        }
        const user = await getCurrentUser();
        console.log('user', user);
      }
    } catch (er) {
      alert((er as Error)?.message);
    }
  }, []);

  return (
    <>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={logIn}>LOG IN</button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
    </>
  );
}

export default App;
