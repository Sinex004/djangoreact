import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Icon, Input, Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import axios from 'axios';
import ls from'local-storage';
import Constants from 'expo-constants';
import { RotationGestureHandler } from 'react-native-gesture-handler';




export const AcceptScreen = ({route, navigation }) => {
  // const [value, setValue] = React.useState('');
  // const [secureTextEntry, setSecureTextEntry] = React.useState(true);
  const [phone, setPhone] = React.useState('');
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  
  
  const renderCheckIcon = (style) => (
    <Icon {...style} name='checkmark-outline'/>
  );

  const renderCloseIcon = (style) => (
    <Icon {...style}  name='close-outline'/>
  );
  // const RegisterIcon = (style) => (
  //   <Icon {...style} name='person-add-outline'/>
  //   );
  // const onIconPress = () =>{
  //   setSecureTextEntry(!secureTextEntry);
  // };
  
  // const renderIcon = (style) => (
  //   <Icon {...style}
  //   name={!secureTextEntry ? 'eye': 'eye-off'}
  //   />
  // );
  // const navigateDetails = () => {
  //   console.log(phone)
  //   navigation.navigate('Details');
  // };
  const LoadingIndicator = (props) => (
    <ActivityIndicator {...props} color='blue' size='large' />
    );

  const acceptBattle = () =>{
      navigation.navigate('Logout')
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
            <Text category='h5' status='info' style={{fontSize:20, margin:8}}>Вам бросил вызов {route.params.enemy}</Text>
            <Divider style={{alignSelf:'stretch', borderWidth:0.5}} />
            <Layout style={{flexDirection:'row',alignItems:'center', marginBottom:10, marginRight:5}}>
              
            </Layout>
            <Layout style={styles.rowlayout}> 
              {loading1?<Button appearance='outline' style={styles.button} icon={LoadingIndicator}>Отправка...</Button>:<Button status='success' style={styles.button} icon={renderCheckIcon} onPress={acceptBattle} >Принять</Button>}
              {loading2?<Button appearance='outline' style={styles.button} icon={LoadingIndicator}>Отправка...</Button>:<Button status='danger' style={styles.button} icon={renderCloseIcon} onPress={navigateMain} >Принять</Button>}
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
  indicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  layoutMain:{
    flexDirection:'column',
    padding: 5,
    flex: 1,
    height:deviceHeight*90/100,
    // justifyContent:'center',
    alignItems:'center',
  },
  rowlayout:{
    flexDirection:'row',
    justifyContent:'space-around',
}
});