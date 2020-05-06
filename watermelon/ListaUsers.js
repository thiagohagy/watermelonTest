import React, { useState, useEffect } from 'react';
import withObservables from '@nozbe/with-observables'
import { Text, View, Button, TouchableOpacity } from 'react-native';

const ListaUsers = ({ users, onSelect }) => {

  return (
    <>
      <Text>Lista de usuarios:</Text>
      { users.map((o) => {
        return (
          <View key={o.id}>
            <TouchableOpacity onPress={() => {onSelect(o.id)}}>
            <Text>{o.id} - {o.name}</Text>
            </TouchableOpacity>
          </View>
        )
      } ) }
    </>
  );
};


const enhance = withObservables(['users'], ({ users }) => ({
  lista: users, // shortcut syntax for `comment: comment.observe()`
}))

export default enhance(ListaUsers);

