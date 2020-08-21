import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import { Divider,Input,Card, Modal, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import ls from'local-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';
import * as Notifications from 'expo-notifications';

export const LogoutScreen = ({ navigation }) => {
  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

  },[]);
  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('UNSAFE PROFILE');
      axios
        .post("ProfileGet/",{username:ls.get('phone')})
        .then(response =>{
          console.log(response.data);
          setProfile(response.data)
          setCity(response.data.city);
          setName(response.data.first_name);
          setSurname(response.data.last_name);
          setSchool(response.data.school);
          setRating(response.data.rating);
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
  const [profile, setProfile] = React.useState(null)
  const [name, setName] = React.useState(null);
  const [surname, setSurname] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [school, setSchool] = React.useState(null);
  const [rating, setRating] = React.useState(0)
  const [expoPushToken, setExpoPushToken] = React.useState(null)

  const [visible, setVisible] = React.useState(false);

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

  const buttonSave = () =>{
    console.log(expoPushToken);
    const payload = {username:ls.get('phone'),name:name,surname:surname,city:city,school:school,pushToken:expoPushToken}
    axios
      .post('/Profile/', payload)
      .then(response =>{
      })
      .catch(error=>{
        console.log(error)
      });
      setVisible(true)
  }
  const sendPush = () =>{
    const payload = {username:ls.get('phone'),enemy:'7785568094'}
    axios
      .post('/sendPush/', payload)
      .then(response =>{
      })
      .catch(error=>{
        console.log(error)
      });
  }

  const LogoutIcon = (style) => (
    <Icon {...style} name='log-out-outline'/>
  );

  return (
    <SafeAreaView style={{ flex: 1, marginTop:20 }}>
      <Layout style={{flexDirection:'row', justifyContent:'center'}}>
      <Text style={{margin:8}}  category='h4'>Профиль</Text>
      </Layout>
      <Divider/>
      <Layout>
      <Text category='h6' style={{marginBottom:10}}>Номер телефона: +7{ls.get("phone")}</Text>
            <Text category='h6' style={{marginBottom:20}}>Рейтинг: {rating}</Text>
        <Layout style={styles.fieldStyle}>
          <Text status='info' category='h6'>Фамилию:</Text>
          <Input
              placeholder={surname}
              autoCorrect={false}
              value={surname}
              status='success'
              autoCapitalize='words'
              onChangeText={nextValue => setSurname(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='info' category='h6'>Имя:</Text>
          <Input
              placeholder={name}
              autoCorrect={false}
              status='success'
              value={name}
              autoCapitalize='words'
              onChangeText={nextValue => setName(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='info' category='h6'>Город:</Text>
          <Input
              placeholder={city}
              autoCorrect={false}
              status='success'
              value={city}
              autoCapitalize='words'
              onChangeText={nextValue => setCity(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='info' category='h6'>Школа:</Text>
          <Input
              placeholder={school}
              autoCorrect={false}
              status='success'
              value={school}
              autoCapitalize='words'
              onChangeText={nextValue => setSchool(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Button style={{margin:5}} onPress={buttonSave} size='medium' >Сохранить</Button>
        <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          >
          <Card disabled={true}>

            <Text style={{marginBottom:10}}  status='success'  category='h4'>Изменения сохранены</Text>
            <Button onPress={() => setVisible(false)}>
              Закрыть
            </Button>
          </Card>
        </Modal>
        <Button onPress={logout} icon={LogoutIcon}>Выйти</Button>
        <Button onPress={sendPush} icon={LogoutIcon}>Отправить пуш</Button>

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
    token = (await Notifications.getExpoPushTokenAsync()).data;
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
    margin:5,
  },
  textInputStyle: {
    paddingTop:5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
});

