import React, { Component } from 'react'
import { Text, View } from 'react-native'
import SearchBar from './component/SearchBar/SearchBar'

export class App extends Component {
  render() {
    return (
      <View style={{width:'100%',height:'100%'}}>
        
        <SearchBar/>
      </View>
    )
  }
}

export default App
