import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage'
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'


function App() {

  return (
    <Authenticator>
      {({signOut, user}) => (
        <HomePage singOut = {signOut} user = {user} />
      )}
    </Authenticator>
  );
}

export default App;