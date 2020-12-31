import React from 'react';
import { Dimensions, SafeAreaView, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Icon, Input, Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import Constants from 'expo-constants';
import { RotationGestureHandler } from 'react-native-gesture-handler';




export const AcceptScreen = ({route, navigation }) => {
  const [phone, setPhone] = React.useState('');
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);
  
  
  const renderCheckIcon = (style) => (
    <Icon {...style} height={29} width={29} name='checkmark-outline'/>
  );

  const renderCloseIcon = (style) => (
    <Icon {...style} height={30} width={30} name='close-outline'/>
  );
  
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
          {/* <Layout level='3' style={{flex:1}}>
          
          </Layout> */}
          <Layout level="1" style={{ width:deviceWidth*85/100,height:deviceHeight*35/100, padding:10, borderRadius:10}} >
            <Layout style={{flex:2}}>
            <Text category='h5' status='info' style={{fontSize:26, marginHorizontal:8}}>{route.params.enemy}</Text>
            <Text category='h5' status='info' style={{fontSize:20, marginHorizontal:8}}>бросил вам вызов</Text>
            <Divider style={{alignSelf:'stretch', borderWidth:0.5}} />
            </Layout>
            {/* <Layout style={{flexDirection:'row',alignItems:'center', marginBottom:10, marginRight:5}}>
            </Layout> */}
            <Layout style={styles.rowlayout}> 
              {loading1?<Button appearance='outline' style={styles.button} icon={LoadingIndicator}>Отправка...</Button>:<Button textStyle={{fontSize: 16}} status='success' style={styles.button} icon={renderCheckIcon} onPress={acceptBattle} >Принять</Button>}
              {loading2?<Button appearance='outline' style={styles.button} icon={LoadingIndicator}>Отправка...</Button>:<Button textStyle={{fontSize: 16}} status='danger' style={styles.button} icon={renderCloseIcon} onPress={navigateMain} >Отказаться</Button>}
            </Layout>
          </Layout>
          {/* <Layout level='3' style={{flex:2}}>

          </Layout> */}
        </Layout>
      {/* </Layout> */}
    </SafeAreaView>
  );
};
var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;


const styles = StyleSheet.create({
  button: {
    margin: 4,

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
    justifyContent:'space-evenly',
  },
  rowlayout:{
    flex:3
    // flexDirection:'row',
    // justifyContent:'space-around',
}
});