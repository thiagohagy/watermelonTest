
import React from 'react';
import DatabaseProvider from '@nozbe/watermelondb/DatabaseProvider'

import { Text } from 'react-native';
import Users from './Users';
import db from './db';



const App = () => {
  return (
    <DatabaseProvider database={db}>
      <Text>App</Text>
      <Users/>    
    </DatabaseProvider>
  );
};

export default App;
