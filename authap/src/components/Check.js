import React, { Component } from 'react';
import { View, Text, TextInput, ScrollView, Button } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import ls from'local-storage';

class Check extends Component {
    state={
        usertypecode: '',
        username: ls.get('PhoneNumberForExpo'),
        password: ls.get('PhoneNumberForExpo'),
        
    };
    onCodeChange(text) {
        this.setState({ usertypecode: text });
    }
    
    handleRequest() {
        console.log(this.state)
        // const code = ls.get("CodeForExpo");
        const number = {phone: this.state.username, code: this.state.usertypecode}
        axios
        .post('/auth/check/', number )
        .then(response=>{
            console.log(response.status.toString())
        // if ( code == this.state.usertypecode){
            const payload = {username: this.state.username, password: this.state.username};
            
            
            console.log(payload);
            
            axios
            .post(`/auth/register/`, payload)
            .then(response => {
                const { token, user } = response.data;
                
                // We set the returned token as the default authorization header
                axios.defaults.headers.common.Authorization = `Token ${token}`;
                ls.set('TokenForExpo', token);
                
                // Navigate to the home screen
                Actions.main();
            })
            .catch(error => {
                // payload = {username: this.state.username, password: this.state.username};
                axios
                .post(`/auth/login/`, payload)
                .then(response => {
                    const { token, user } = response.data;
                    
                    // We set the returned token as the default authorization header
                    axios.defaults.headers.common.Authorization = `Token ${token}`;
                    ls.set('TokenForExpo', token);
                    
                    // Navigate to the home screen
                    Actions.main();
                    console.log(error);
                })
            });
            
        })
        .catch(error => {
            console.log(error);
        })
      }
    
    render() {
        return (
            <ScrollView style={{padding: 20}}>
            <Text style={{fontSize:15}}>
                Enter your code from sms:
            </Text>
            <TextInput
                placeholder="Code"
                autoCorrect={false}
                autoCapitalize="none"
                onChangeText={this.onCodeChange.bind(this)}
                style={{
                    flex: 1,
                    padding: 15
                }}
            />
            <Button title="Check" onPress={this.handleRequest.bind(this)} />
        </ScrollView>
        );
    }
}


export default Check;
