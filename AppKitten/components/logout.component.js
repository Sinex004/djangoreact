import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import { ApplicationProvider, Icon, Text, Input, Button, Divider, Layout, TopNavigation, IconRegistry } from '@ui-kitten/components';
import axios from 'axios';
import ls from'local-storage';

export const LogoutScreen = ({navigation}) =>{
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
    }
    const ratingList = () =>{
        axios
          .get("GetRating/")
          .then(response =>{
            console.log(response.data)
          })
          .catch(error =>{
            console.log(error);
          });
      }
    const rating = () =>{
        const payload = {username: ls.get('phone')}
        axios
            .post("GetRating/", payload)
            .then(response =>{
            console.log(response.data)
            })
            .catch(error =>{
            console.log(error);
            });
    }
    const LogoutIcon = (style) => (
        <Icon {...style} name='log-out-outline'/>
      );
      return(
        <Layout style={{flex:1,paddingTop:35}}>
            <Text style={{marginBottom:10}}>Номер телефона: +7{ls.get("phone")}</Text>
            <Text style={{marginBottom:20}}>Рейтинг: 1000</Text>
            <Button onPress={rating} icon={LogoutIcon}>1 Rating</Button>

            <Button onPress={ratingList} icon={LogoutIcon}>All Rating</Button>
        </Layout>
      );
  }
  