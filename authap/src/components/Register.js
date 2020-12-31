import React, { Component} from 'react';
import { View, Alert, Text,TextInput, ScrollView, Button} from 'react-native';
// import LoginOrCreateForm from './common/LoginOrCreateForm';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import ls from 'local-storage';


class Register extends Component {
  state = {
    username: '',
    password: '',
  };

  // GenerateRandomNumber=()=>
  // {
  // var RandomNumber = Math.floor(Math.random() * 100000) + 1 ;
  // this.setState({
  //   code : RandomNumber
  // })
  // }

  onUsernameChange(text) {
    this.setState({ username: text });
    
  }

  handleRequest() {
    if (this.state.username.length == 10){
    
      const payload = {phone: this.state.username, code: ''};
      // payload.code = (Math.floor(Math.random() * 100000) + 1).toString()
      console.log(this.state);
      console.log(payload);
      
      ls.set('PhoneNumberForExpo', this.state.username);
      // ls.set('CodeForExpo', payload.code)

      axios
        .post(`/auth/send/`,payload)
        .then(response => {
          Actions.check();

        })
        .catch(error => console.log(error));
    }else{
      Alert.alert('Номер телефона', 'Телефон должен состоять из 10 цифр');
    }
  }

  render() {
    return (
      // <View style={{ flex: 1 }}>
      //   <LoginOrCreateForm create/>
      // </View>
      <ScrollView style={{padding: 20}}>
        <Text style={{fontSize:27}}>
          Registration
        </Text>
        <TextInput
          placeholder="Phone"
          autoCorrect={false}
          autoCapitalize="none"
          maxLength = {10}
          onChangeText={this.onUsernameChange.bind(this)}
          style={{
            flex: 1,
            padding: 15
          }}
        />
        <Button title="Sign in" onPress={this.handleRequest.bind(this)} />
      </ScrollView>
    );
  }
}

export default Register;
