import React, { useState, useEffect } from 'react';
import withObservables from '@nozbe/with-observables'
import { Text, View, Button } from 'react-native';

const User = ({ data, onRemove }) => ( 
  <>
    <Text>User selecionado:</Text>
    <Text> --{data.name ? data.name : data.email} --</Text>

    <Button title="Remover" onPress={() => onRemove(data.id)}/>

  </>
)


const enhance = withObservables(['data'], ({ data }) => ({
  data // shortcut syntax for `comment: comment.observe()`
}))

export default enhance(User);