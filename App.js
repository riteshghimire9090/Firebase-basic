/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Button
} from 'react-native';
import * as firebase from 'firebase';
import { Item, Input, Label, List, ListItem,  } from 'native-base';
import {firebaseConfig} from './Config';


firebase.initializeApp(firebaseConfig);
export default class App extends Component {
  state={
    text:"",
    mylist:[]
  }
  componentDidMount(){
    var itemlist = firebase.database().ref('mywish')
    itemlist.on('value',snapit=>{
    if (snapit.val()) {
      this.setState({mylist:Object.values(snapit.val())})
    }
     
    })
    
  }
  saveit () {
   let myWish = firebase.database().ref('mywish')
   myWish.push().set({
     name:this.state.text,
     time:Date.now()
   })
   this.setState({text:''})
  }
  removeit(){
   
    firebase.database().ref('mywish').remove()
   
    this.setState({mylist:[]})
  }
  render() {
    console.log(this.state.mylist) 
    const myWishes = this.state.mylist.map(item=>{
      return(
        <ListItem style={styles.text} key={item.time}>
          <Text>
            {item.name}
          </Text>
          <Text >
            {new Date(item.time).toDateString( ) }
          </Text>
          
        </ListItem>
      )
    })
    return (
      <View style={styles.container} >
      
      <Item floatingLabel>
        <Label>Username</Label>
        <Input 
        value={this.state.text}
        onChangeText={(text)=>{this.setState({text})}}

        />
      </Item>
      <View>

      <Button
     
  title="Add"
  color="#841584"
  onPress={()=>this.saveit()}  
  accessibilityLabel="Learn more about this purple button"
/>
<Button
  onPress={()=>this.removeit()} 
  title="Delete All"
  color="#12345678"
  accessibilityLabel="Learn more about this purple button"
/>
            
      </View>
      <View>
        {myWishes}
      </View>
      
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop:40
    
  },
  text:{
    justifyContent:'space-between'
  }
});
