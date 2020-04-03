import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ApplicationProvider, Icon, Text, Input, Button, Divider, Layout, TopNavigation, IconRegistry } from '@ui-kitten/components';
import axios from 'axios';
import ls from'local-storage';

export const CodeScreen = ({navigation}) =>{
    const [code, setCode] = React.useState('');
    
    const navigateMain = () => {
        navigation.navigate('Main');
      };

    const navigateRegister = () =>{
        navigation.navigate('Registration')
      };

    const onChangeCheck = () => {
        if(code.length == 6){
            const payload = {username: ls.get('phone'), cod: code}
            console.log(payload.username)
            axios
                .post('/auth/check/', payload)
                .then(response => {  
                  console.log("check succeeeeees")       
                  axios
                    .post('/auth/login/', payload)
                    .then(response => {
                        const { token, user } = response.data;
                        console.log('login succeeeeeeeeeees')
                        // We set the returned token as the default authorization header
                        axios.defaults.headers.common.Authorization = `Token ${token}`;
                        // axios.defaults.headers.common.user = user;
                        // Navigate to the home screen
                        navigateMain();
                    })
                    .catch(error2 => {
                      console.log('whyyyyyyyyyyyyyyy')
                      console.log(error2)
                      console.log('login faileeeeeeeeeeeeeeeeeeeeeeeeeeeeed')
                      axios
                        .post(`/auth/register/`, payload)
                        .then(response => {
                          const { token, user } = response.data;
                  
                          // We set the returned token as the default authorization header
                          axios.defaults.headers.common.Authorization = `Token ${token}`;
                          // axios.defaults.headers.common.user = user;
                          // Navigate to the home screen
                          navigateMain();
                        })
                        .catch(error3 => {
                          console.log(error3)
                        });
                      });
                })
                .catch(error1 => {
                    console.log(error1);
                    console.log('error when check');

                });
        }
    };

    return(
        <SafeAreaView style={{flex:1}}>
            <TopNavigation title='Регистрация' alignment='center' style={styles.topNav}/>
            <Divider/>
            <Layout style={styles.layoutMain}>
                <Text category='s2'>Мы отправили смс с кодом на ваш телефон, введите его:</Text>
                <Input
                    placeholder='Код'
                    value={code}
                    onChangeText={setCode}
                    autoCorrect={false}
                    autoCapitalize="none"
                    maxLength = {6}//7785568094
                    textContentType='telephoneNumber'
                    style={{marginTop:10, marginBottom:10}}
                />
                <Button style={styles.button} onPress={onChangeCheck} >Подтвердить</Button>

            </Layout>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  topNav:{
    marginTop:15,
  },
  hideText:{

  },
  layoutMain:{
    paddingTop:20,
    padding: 8,
    flex: 1,
    // justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
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