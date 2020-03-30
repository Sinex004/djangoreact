import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { ApplicationProvider, Icon, Text, Input, Button, Divider, Layout, TopNavigation, IconRegistry } from '@ui-kitten/components';
import axios from 'axios';
import ls from'local-storage';

export const MainScreen = () =>{

  
    return(
            <Layout style={styles.layoutMain}>
                <Text category='s2'>Вы вошли</Text>
            </Layout>
    );




};
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