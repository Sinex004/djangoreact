import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ApplicationProvider,IconRegistry, Icon, Input, Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import axios from 'axios';

export const HomeScreen = ({ navigation }) => {

  const [value, setValue] = React.useState('');
  const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [phone, setPhone] = React.useState('');
  // const []
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

  const navigateDetails = () => {
    console.log(value)
    console.log(phone)
    navigation.navigate('Details');
  };
  const loginAction = () => {
    const payload = { username: phone, password: value } 
    axios
      .post(`/auth/login/`, payload)
      .then(response => {
        const { token, user } = response.data;

        // We set the returned token as the default authorization header
        axios.defaults.headers.common.Authorization = `Token ${token}`;
        axios.defaults.headers.common.user = user;
        // Navigate to the home screen
        navigateMain();
      })
      .catch(error => console.log(error));
  }
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
        <Input
          placeholder='Пароль'
          value={value}
          secureTextEntry={secureTextEntry}
          onChangeText={setValue}
          icon={renderIcon}
          onIconPress={onIconPress}
        />
        <Layout style={styles.rowlayout}>
          <Button style={styles.button} icon={LoginIcon} onPress={loginAction} >Войти</Button>
          <Button style={styles.button} icon={RegisterIcon} onPress={navigateRegister}>Регистрация</Button>
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