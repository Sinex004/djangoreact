import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ApplicationProvider, Icon, Text, Input, Button, Divider, Layout, TopNavigation, IconRegistry } from '@ui-kitten/components';
import axios from 'axios';
import ls from'local-storage';


export const RegistrationScreen = ({ navigation }) => {

  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [phone, setPhone] = React.useState('');
  const [voidUser, setVoidUser] =React.useState(false);
  const [voidPass, setVoidPass] = React.useState(false);
  const LoginIcon = (style) => (
    <Icon {...style} name='log-in'/>
  );

  const RegisterIcon = (style) => (
    <Icon {...style} name='person-add-outline'/>
    );
  const onIconPress = () =>{
    setSecureTextEntry(!secureTextEntry);
  };
  
  const renderIcon = (style) => (
    <Icon {...style}
    name={!secureTextEntry ? 'eye': 'eye-off'}
    />
  );
  const checkUsername = () => {
    if(phone.length<=9){
      setVoidUser(true);
    }else{
      setVoidUser(false);
      checkPass();
    };
  
  };
  const checkPass = () => {
    if(value!=''){
      setVoidPass(false);
      loginAction();
    }else{
      setVoidPass(true);
    }
  };
  const loginAction = () => {
    const payload = { username: phone, password: value } 
    axios
      .post(`/auth/send/`, payload)
      .then(response => {
        ls.set('phone', phone);
        ls.set('password', value);
        // const { token, user } = response.data;

        // We set the returned token as the default authorization header
        // axios.defaults.headers.common.Authorization = `Token ${token}`;
        // axios.defaults.headers.common.user = user;
        // Navigate to the home screen
        navigateCode();
      })
      .catch(error => {
        console.log(error);
      });
  };
  const navigateCode = () => {
    navigation.navigate('Code');
  };
  const navigateMain = () => {
    navigation.navigate('Main');
  };
  // justifyContent: 'center', alignItems: 'center'
  return (
    <SafeAreaView style={{flex:1}}>
      <TopNavigation title='Регистрация' alignment='center' style={{marginTop:5} }/>
      <Divider/>
      <Layout style={styles.layoutMain}>
      <Layout style={styles.rowTextandInput}>
          <Text style={{flex:1}} category='s2'>Введите номер телефона:</Text>
          <Input
          placeholder='Номер телефона'
          value={phone}
          onChangeText={setPhone}
          autoCorrect={false}
          autoCapitalize="none"
          maxLength = {10}//7785568094
          textContentType='telephoneNumber'
          style={{flex:1}}
          />
      </Layout>
      <Layout style={styles.rowTextandInput}>
          <Text style={{flex:1}} category='s2'>Введите пароль:</Text>
          <Input
          placeholder='Пароль'
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={setValue}
          icon={renderIcon}
          onIconPress={onIconPress}
          style={{flex:1}}
        
          />
      </Layout>
          <Layout style={styles.collayout}>
            {
              voidUser ? <Text style={styles.hideText} status='warning' category='s2'>Введите номер телефона без +7</Text>:null
            } 
            {
              voidPass ? <Text style={styles.hideText} status='warning' category='s2'>Пароль не может быть пустым</Text>:null
            }
          <Button style={styles.button} icon={RegisterIcon} onPress={checkUsername} >Создать</Button>
          </Layout>
      </Layout>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  hideText:{

  },
  layoutMain:{
    padding: 8,
    flex: 1,
    justifyContent:'center',
  },
  rowlayout:{
    flexDirection:'row',
    justifyContent:'space-around',
  },
  collayout:{
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
  },
  rowTextandInput:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
    margin:5,
  }
});