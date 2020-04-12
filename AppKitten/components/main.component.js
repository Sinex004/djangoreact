import React from 'react';
import {Image, SafeAreaView, StyleSheet } from 'react-native';
import { Avatar, ApplicationProvider, Icon, Text, Input, Button, Divider, Layout, TopNavigation, IconRegistry } from '@ui-kitten/components';
import axios from 'axios';
import ls from'local-storage';

export const MainScreen = ({navigation}) =>{

  const MainIcon = (style) => (
    <Icon {...style} name='play-circle-outline'/>
  );
  
  const BattleIcon = (style) => (
    <Icon {...style} name='people-outline'/>
  );
  const navigateSubjects = () =>{
    axios
      .get('/GetSubjects/')
      .then(response =>{
        navigation.navigate('Subjects',response.data)
      })
      .catch(error=>{
        console.log(error)
      })    

  }

  return(
    <SafeAreaView style={{flex:1}}>
    <Layout style={styles.layoutMain}>
        {/* <Avatar size='giant' style={styles.avatar} shape='rounded' source={require('../assets/logo.png')}/> */}
        <Image style={styles.avatar} source = {require('../assets/logo.png')} />
        <Layout style={styles.collayout}>
          <Button size='large' style={styles.button} onPress={navigateSubjects} icon={MainIcon}>Быстрый тест</Button>
          <Button size='large' style={styles.button} disabled={true} icon={BattleIcon}>Соревнование</Button>
        </Layout>
    </Layout>
    </SafeAreaView>
  );




};
const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  topNav:{
    marginTop:15,
  },
  avatar:{
    resizeMode:'contain',
    flex:3,
    aspectRatio:0.8,
    

  },
  layoutMain:{
    paddingTop:50,
    padding: 12,
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
    // flexDirection:'column',
    // justifyContent:'center',
    // alignItems:'center',
    marginTop:20,
    flex:2,
    alignSelf:'stretch'
    
  },
  rowTextandInput:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
    margin:5,
  }
});