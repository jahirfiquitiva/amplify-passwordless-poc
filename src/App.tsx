import {useCallback} from 'react';
import {signIn, getCurrentUser, fetchAuthSession, confirmSignIn, signOut} from 'aws-amplify/auth';
// import {Auth} from 'aws-amplify';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
    const logIn = useCallback(async () => {
        console.log('logIn');
        // This is to trigger the PreAuthentication Lambda only
        try {
            const ignoredData= await signIn({
                username: 'cognito@address.com', // Dummy user to trigger the PreAuth
                password: 'user@address.com', // Password doesn't matter
                options: {
                    authFlowType: 'USER_PASSWORD_AUTH',
                    clientMetadata: {
                        "email": "userToLogin@address.com" // Who we really are ogging in
                    },
                },
            });
            console.log(ignoredData);
        } catch (er) {
            alert((er as Error)?.message);
        }

        await signOut();

        try {
            const signInResponse = await signIn({
                username: 'userToLogin@address.com',
                options: {
                    authFlowType: 'CUSTOM_WITHOUT_SRP',
                },
            });
            console.log("SignInResponse:");
            console.log(signInResponse);
        } catch (er) {
            alert((er as Error)?.message);
        }
    }, []);

    const onSubmit = async (event: any) => {
        event.preventDefault();
        const challengeResponse = event.target[0].value;
        console.log(event.target[0].value);
        const data = await confirmSignIn({
            challengeResponse
        });

        if (data.isSignedIn) {
            const session = await fetchAuthSession();
            if (session) {
                const {tokens} = session;
                if (tokens) {
                    const {accessToken, idToken} = tokens;
                    console.log('accessToken', accessToken.toString());
                    console.log('idToken', idToken.toString());
                }
            }
            const user = await getCurrentUser();
            console.log('user', user);
        }
    };

    return (
        <>
            <div>
                <a href='https://vitejs.dev' target='_blank'>
                    <img src={viteLogo} className='logo' alt='Vite logo'/>
                </a>
                <a href='https://react.dev' target='_blank'>
                    <img src={reactLogo} className='logo react' alt='React logo'/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className='card'>
                <button onClick={logIn}>LOG IN</button>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="Enter code"
                    />
                    <button type="submit">Submit</button>
                </form>
                <p>
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className='read-the-docs'>Click on the Vite and React logos to learn more</p>
        </>
    );
}

export default App;
