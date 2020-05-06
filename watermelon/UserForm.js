import React, { useState } from 'react';
import { View, Text, Modal, Button, TextInput } from 'react-native';
import { useDatabase } from '@nozbe/watermelondb/hooks'

export default function UserForm({isOpen, closeModal, fetchUsers}) {
  
  const db = useDatabase();
  const usersCollection = db.collections.get('users');

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [id, setId] = useState();

  const saveUser = async () => {
    
    await db.action(async () => {
      await usersCollection.create(u => {
        u.name = name;
        u.email = email;
      })
      closeModal();
      fetchUsers();
    })    
  }

  return (
    <Modal 
      animationType="slide"
      visible={isOpen}
    >
      <Text> Name: </Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setName(text)}
        value={name}
      />

      <Text> Email: </Text>
      <TextInput
        style={{ height: 40, borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => setEmail(text)}
        value={email}
      />

      <Button color="green" onPress={ saveUser } title="Salvar user"/>
      <Button onPress={ closeModal } title="Fechar modal"/>
    </Modal>
  );
}
