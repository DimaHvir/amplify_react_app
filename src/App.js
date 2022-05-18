import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'

function App() {
  return (
    <Authenticator>
      {({signOut, user}) => (
        <main>
          <h1>Oh hi {user.username}, you're authenticated</h1>
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
    </Authenticator>
  );
}

export default App;