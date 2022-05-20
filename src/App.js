import React from 'react';
import logo from './logo.svg';
import './App.css';
import HomePage from './HomePage'
import {Authenticator} from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css'


function App() {

  //Putting form components and helper functions in the component handling AWS auth
  //causes a weird bug where you can't properly interact with the form
  //and state is not maintained expectedly
  return (
    <Authenticator>
      {({signOut, user}) => (
        <HomePage singOut = {signOut} user = {user} />
      )}
    </Authenticator>
  );
}

export default App;