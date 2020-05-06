import React, { useState, useEffect } from 'react';
import database from './db';
import { Text, Button } from 'react-native';

import User from './User';
import ListaUsers from './ListaUsers';
import UserForm from './UserForm';

const Users = () => {

  const usersCollection = database.collections.get('users');
  let [user, setUser] = useState([]);  
  let [lista, setLista] = useState([]);
  let [isModaOpen, setModal] = useState(false);
  
  useEffect( () => {
    fetchUsers()
    return
  },[])

  const fetchUsers = async () => {
    const usrs = await usersCollection.query().fetch();
    setLista(usrs);
  }

  const updateUser = async (id) => {
    usersCollection.find(id).then( u => {
      setUser(u);
    });
  }

  const removeUser = async (id) => {
    const user = await usersCollection.find(id);

    await database.action(async () => {
      await user.markAsDeleted() // syncable
      await user.destroyPermanently() // permanent
      setUser([]);
      fetchUsers()
    })
  }

  const resetDb = async () => {
    await database.action(async () => {
      await database.unsafeResetDatabase()
    });
  }

  return (
    <>
      <Button onPress={ resetDb } title="Reset all"/>
      <Button onPress={ () => { setModal(!isModaOpen) }} title="Abre modal"/>
      <Button onPress={ fetchUsers } title="Fetch users"/>

      <Text>Users:</Text>

      { lista.length ? <ListaUsers users={ lista } onSelect={(id) => { updateUser(id) } } /> : null }

      { user.id ?  <User data={user} onRemove={(id) => removeUser(id)} />:null }

      <UserForm 
        isOpen={isModaOpen} 
        closeModal={() => { setModal(!isModaOpen) }}
        fetchUsers={fetchUsers}
      />
      
    </>
  )
}


export default Users;