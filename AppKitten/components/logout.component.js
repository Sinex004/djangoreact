import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { ApplicationProvider, Icon, Text, Input, Button, Divider, Layout, TopNavigation, IconRegistry } from '@ui-kitten/components';
import axios from 'axios';
import ls from'local-storage';
import { useFocusEffect } from '@react-navigation/native';


export const LogoutScreen = ({navigation}) =>{
  const [rating, setRating] = React.useState(0)
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      axios
      .post("GetRating/", {username: ls.get('phone')})
      .then(response =>{
        console.log("respoooooonse")
        setRating(response.data.rating)
      })
      .catch(error =>{
      console.log(error);
      });
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
      };
    }, [])
  );
    const logout = () =>{
        axios
        .get('auth/logout/')
        .then(response =>{
            console.log(response);
            console.log('logout success');
            axios.defaults.headers.common.Authorization = null;
            navigation.reset({
            index: 0,
            routes: [{ name: 'Home' }],
            });
    
        })
        .catch(error=>{
            console.log(error);
            
        });
    };
    const loggin = () =>{
    const payload={username:'7015276566',password:'sinex'}
      axios
      .post('/auth/login/', payload)
      .then(response => {
          const { token, user } = response.data;
          console.log('login succeeeeeeeeeees')
          ls.set('phone', '7015276566');
          
          // We set the returned token as the default authorization header
          axios.defaults.headers.common.Authorization = `Token ${token}`;
      })
      .catch(error =>{
        console.log(error)
      });
    };
    
    const LogoutIcon = (style) => (
        <Icon {...style} name='log-out-outline'/>
      );
      return(
        <Layout style={{flex:1,paddingTop:35}}>
            <Text style={{marginBottom:10}}>Номер телефона: +7{ls.get("phone")}</Text>
            <Text style={{marginBottom:20}}>Рейтинг: {rating}</Text>
            <Button onPress={logout} icon={LogoutIcon}>Выйти</Button>
            {/* <Button onPress={loggin} icon={LogoutIcon}>Войти</Button> */}

        </Layout>
      );
  }
  