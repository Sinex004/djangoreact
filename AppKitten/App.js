import React, { useState, useRef, useEffect } from 'react';
import { ApplicationProvider, IconRegistry, Text } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import { AppNavigator } from './components/navigation.component';
import {baseURL} from './config'
import axios from 'axios'
import * as Notifications from 'expo-notifications';
import { NavigationContainer } from '@react-navigation/native';
import * as Linking from 'expo-linking';
import * as RootNavigation from './config/RootNavigation';

const prefix = Linking.makeUrl('/');
const linking = {
  prefixes:[prefix],
  config: {
    screens: {
      HomeNavigator:{
        initialRouteName: 'Main',
        screens:{
          Main:'mainpath',
          Accept:'challenge/:enemy',
          Home:'*',
        }
      }
    },
  },
};

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App() {

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const yesInBattle = () => {
    ls.set('inBattle','yes' )
  };
  
  const noInBattle = () => {
    ls.set('inBattle','no' )
  };

  useEffect(() => {
    axios.defaults.baseURL = baseURL;
    axios.defaults.timeout = 2000;
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
      console.log('1111111111111111')
      console.log(notification)
      RootNavigation.navigate('Accept',{'enemy':'7785568094'})

      console.log('22222222222222')

    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      // RootNavigation.navigate('Accept')
      console.log('naaaaaaaaaaaaaaaaaaaaaaaaaatttttttttttt')
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);
  // UNSAFE_componentWillMount() {
  //   axios.defaults.baseURL = baseURL;
  //   axios.defaults.timeout = 2000;
  // };

  // registerForPushNotificationsAsync = async () => {
  //   if (Constants.isDevice) {
  //     console.log('start')
  //     const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
  //     let finalStatus = existingStatus;
  //     if (existingStatus !== 'granted') {
  //       const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
  //       finalStatus = status;
  //     }
  //     if (finalStatus !== 'granted') {
  //       alert('Failed to get push token for push notification!');
  //       return;
  //     }
  //     console.log('start2')
  //     const token = await Notifications.getExpoPushTokenAsync();
  //     console.log(token);
  //     console.log('start3')
      
  //     this.setState({ expoPushToken: token });
  //   } else {
  //     alert('Must use physical device for Push Notifications');
  //   }
  
  //   if (Platform.OS === 'android') {
  //     Notifications.createChannelAndroidAsync('default', {
  //       name: 'default',
  //       sound: true,
  //       priority: 'max',
  //       vibrate: [0, 250, 250, 250],
  //     });
  //   }
  //   };
  // async componentDidMount() {
  //   // Preload data from an external API
  //   // Preload data using AsyncStorage
  //   const data = await this.performTimeConsumingTask();
  //   console.log('start');
  //   if (data !== null) {
  //     this.setState({ isLoading: false });
  //   }
  // };

  // performTimeConsumingTask = async() => {
  //   return new Promise((resolve) =>
  //     setTimeout(
  //       () => { console.log('ggggg'); resolve('result') },
  //       2000
  //     )
  //   );
  // }

  return(
    <React.Fragment>
    <IconRegistry icons={EvaIconsPack}/>
    <ApplicationProvider {...eva} mapping={eva.mapping} theme={eva.light}>
      <NavigationContainer ref={RootNavigation.navigationRef} linking={linking} fallback={<Text>Loading...</Text>}>
        <AppNavigator/>
      </NavigationContainer>
    </ApplicationProvider>
    </React.Fragment>
    );

}

