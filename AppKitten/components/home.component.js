import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { ApplicationProvider,IconRegistry,Text, Icon, Input, Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
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
    // navigation.navigate('Main')
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  }

  return (
    <SafeAreaView style={{flex:1}}>
      {/* <Layout level="4" style={{flex:5}}> */}
        {/* <TopNavigation title='Войдите в акканут' alignment='center'style={{marginTop:5}} /> */}
        {/* <Divider/> */}
        <Layout level="3" style={styles.layoutMain}>
          <Layout level='3' style={{flex:1}}>

          </Layout>
          <Layout level="1" style={{flex:2,flexDirection:'column', width:deviceWidth*85/100, padding:10, alignItems:'center', borderRadius:10}} >
            <Text category='h5' status='info' style={{fontSize:20, margin:8}}>Вход/Регистрация</Text>
            <Divider style={{alignSelf:'stretch', borderWidth:0.5}} />
            <Text category='h6' style={{ margin:8, marginBottom:30,color:"#494B4B",marginRight:30}}>Пожалуйста введите номер{"\n"}телефона для входа:</Text>
            <Layout style={{flexDirection:'row',alignItems:'center', marginBottom:10, marginRight:5}}>
              <Text category='h6' style={{marginRight:8,marginBottom:5,marginLeft:5}}>
                +7
              </Text>
              <Input
              placeholder='Номер телефона'
              value={phone}
              onChangeText={setPhone}
              autoCorrect={false}
              autoCapitalize='none'
              maxLength = {10}//7785568094
              textContentType='telephoneNumber'
              style={{flex:1}}
              />
            </Layout>
            {/* <Input
              placeholder='Пароль'
              value={value}
              secureTextEntry={secureTextEntry}
              onChangeText={setValue}
              icon={renderIcon}
              onIconPress={onIconPress}
            /> */}
            <Layout style={styles.rowlayout}>
              <Button style={styles.button} icon={LoginIcon} onPress={loginAction} >Отправить</Button>
              {/* <Button style={styles.button} icon={RegisterIcon} onPress={navigateRegister}>Регистрация</Button> */}
              {/* <Button onPress= {navigateMain}></Button> */}
            </Layout>
          </Layout>
          <Layout level='3' style={{flex:2}}>

          </Layout>
        </Layout>
      {/* </Layout> */}
    </SafeAreaView>
  );
};
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  layoutMain:{
    flexDirection:'column',
    padding: 5,
    flex: 1,
    // justifyContent:'center',
    alignItems:'center',
  },
  rowlayout:{
    flexDirection:'row',
    justifyContent:'space-around',
}
});