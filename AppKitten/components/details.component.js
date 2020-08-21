import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import { Divider,Input, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import ls from'local-storage';
import axios from 'axios';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

export const DetailsScreen = ({ navigation }) => {

  // const navigateBack = () => {
  //   navigation.goBack();
  // };

  
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [city, setCity] = React.useState('');
  const [school, setSchool] = React.useState('');
  const [expoPushToken, setExpoPushToken] = React.useState(null)

  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
    
  },[]);

  const buttonSave = () =>{
    const payload = {username:ls.get('phone'),name:name,surname:surname,city:city,school:school,pushToken:expoPushToken}
    axios
      .post('/Profile/', payload)
      .then(response =>{
      })
      .catch(error=>{
        console.log(error)
      }); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  }

  return (
    <SafeAreaView style={{ flex: 1, marginTop:20 }}>
      <Layout style={{flexDirection:'row', justifyContent:'center'}}>
      <Text style={{margin:5}}  category='h5'>Профиль</Text>
      </Layout>
      <Divider/>
      <Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='success' category='h6'>Введите фамилию:</Text>
          <Input
              placeholder="Фамилия"
              autoCorrect={false}
              value={surname}
              status='success'
              autoCapitalize='words'
              onChangeText={nextValue => setSurname(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='danger' category='h6'>Введите имя:</Text>
          <Input
              placeholder="Имя"
              autoCorrect={false}
              status='danger'
              value={name}
              autoCapitalize='words'
              onChangeText={nextValue => setName(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='warning' category='h6'>Введите город:</Text>
          <Input
              placeholder="Город"
              autoCorrect={false}
              status='warning'
              value={city}
              autoCapitalize='words'
              onChangeText={nextValue => setCity(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='info' category='h6'>Введите школу:</Text>
          <Input
              placeholder="Школа"
              autoCorrect={false}
              status='info'
              value={school}
              autoCapitalize='words'
              onChangeText={nextValue => setSchool(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Button onPress={buttonSave} size='medium' >Сохранить</Button>
      </Layout>
    </SafeAreaView>
  );
};

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
    const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    token = await Notifications.getExpoPushTokenAsync();
    console.log(token);
  } else {
    alert('Must use physical device for Push Notifications');
  }
  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}
const styles = StyleSheet.create({
  fieldStyle: {
    flexDirection: 'column',
    // alignItems: 'center',
    margin:10,
  },
  textInputStyle: {
    paddingTop:5,
  },
});