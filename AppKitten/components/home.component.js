import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ApplicationProvider,IconRegistry, Icon, Input, Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import axios from 'axios';
import ls from'local-storage';

export const HomeScreen = ({ navigation }) => {

  // const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [phone, setPhone] = React.useState('');
  // const []
  const LoginIcon = (style) => (
    <Icon {...style} name='log-in'/>
  );

  // const RegisterIcon = (style) => (
  //   <Icon {...style} name='person-add-outline'/>
  //   );
  const onIconPress = () =>{
    setSecureTextEntry(!secureTextEntry);
  };
  
  const renderIcon = (style) => (
    <Icon {...style}
    name={!secureTextEntry ? 'eye': 'eye-off'}
    />
  );
  const navigateCode = () => {
    navigation.navigate('Code');
  };
  const navigateDetails = () => {
    console.log(phone)
    navigation.navigate('Details');
  };
  const loginAction = () => {
    const payload = { username: phone} 
    axios
      .post(`/auth/send/`, payload)
      .then(response => {
        ls.set('phone', phone);
       
        navigateCode();
      })
      .catch(error => {
        console.log(error);
      });

  };
  const navigateRegister = () =>{
    navigation.navigate('Registration')
  }
  const navigateMain = () => {
    navigation.navigate('Main')
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <TopNavigation title='Войдите в акканут' alignment='center'style={{marginTop:5}} />
      <Divider/>
      <Layout style={styles.layoutMain}>
        <Input
        placeholder='Номер телефона'
        value={phone}
        onChangeText={setPhone}
        autoCorrect={false}
        autoCapitalize="none"
        maxLength = {10}//7785568094
        textContentType='telephoneNumber'
        />
        {/* <Input
          placeholder='Пароль'
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={setValue}
          icon={renderIcon}
          onIconPress={onIconPress}
        /> */}
        <Layout style={styles.rowlayout}>
          <Button style={styles.button} icon={LoginIcon} onPress={loginAction} >Войти</Button>
          {/* <Button style={styles.button} icon={RegisterIcon} onPress={navigateRegister}>Регистрация</Button> */}
          <Button onPress= {navigateMain}></Button>
        </Layout>
      </Layout>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  layoutMain:{
    padding: 5,
    flex: 1,
    justifyContent:'center',
  },
  rowlayout:{
    flexDirection:'row',
    justifyContent:'space-around',
}
});