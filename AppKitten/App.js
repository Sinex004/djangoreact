// import React, { useState } from "react";
// import {
//   AccessibilityRole,
//   ImageProps,
//   ImageStyle,
//   StyleSheet,
//   TouchableOpacity,
//   View,
//   Text as RNText,
// } from "react-native";
// import {
//   ApplicationProvider,
//   Button,
//   Icon,
//   IconRegistry,
//   Layout,
//   Text,
// } from "@ui-kitten/components";
// import { EvaIconsPack } from "@ui-kitten/eva-icons";
// import { mapping, light, dark } from "@eva-design/eva";

// const heartIcons = ["😻", "💖", "😍", "🥰", "😍", "💝", "😘", "💓", "💕", "🐱"];
// const themes = {
//   light: {
//     theme: light,
//     icon: "sun",
//     text: "LIGHT",
//   },
//   dark: {
//     theme: dark,
//     icon: "moon",
//     text: "DARK",
//   },
// };

// type IconProps = {
//   name: string;
//   style?: ImageStyle;
// };

// type CustomButtonWithIconProps = {
//   accessibilityRole: AccessibilityRole;
//   accessibilityLabel: string;
//   icon: string;
//   iconStyle?: ImageStyle;
//   onPress: () => void;
//   text: string;
//   style: any;
// };

// const renderIcon = ({ name, style }: IconProps) => (
//   <Icon {...style} name={name} />
// );

// const CustomButtonWithIcon = ({
//   accessibilityRole,
//   accessibilityLabel,
//   icon,
//   iconStyle,
//   onPress,
//   text,
//   style,
// }: CustomButtonWithIconProps) => {
//   const ButtonIcon = () => renderIcon({ name: icon, style: iconStyle });
//   return (
//     <Button
//       style={style}
//       icon={ButtonIcon}
//       onPress={onPress}
//       accessibilityRole={accessibilityRole}
//       accessibilityLabel={accessibilityLabel}
//     >
//       {text}
//     </Button>
//   );
// };

// const App = (): React.ReactFragment => {
//   const [icon, setIcon] = useState(heartIcons[0]);
//   const [themeName, setThemeName] = useState("light");
//   const theme = themes[themeName].theme;

//   const changeIcon = () => {
//     const index = Math.floor(Math.random() * heartIcons.length);
//     setIcon(heartIcons[index]);
//   };

//   const changeTheme = () => {
//     setThemeName(themeName === "light" ? "dark" : "light");
//   };

//   const { text: themeButtonText, icon: themeButtonIcon } =
//     themeName === "light" ? themes.dark : themes.light;

//   return (
//     <>
//       <IconRegistry icons={EvaIconsPack} />
//       <ApplicationProvider mapping={mapping} theme={theme}>
//         <Layout style={styles.container}>
//           <Text style={styles.text} category="h1">
//             Welcome to UI Kitten {icon}
//           </Text>
//           <Text style={styles.text} category="s1">
//             It works great in the browser and as a native app!
//           </Text>
//           <Text style={styles.text} appearance="hint">
//             Click some buttons to see it working.
//           </Text>
//           <Button
//             accessibilityRole="button"
//             accessibilityLabel="Change Icon"
//             style={styles.iconButton}
//             onPress={changeIcon}
//           >
//             CHANGE ICON
//           </Button>
//           <CustomButtonWithIcon
//             accessibilityRole="button"
//             accessibilityLabel="UI Kitten Change Theme"
//             style={styles.iconButton}
//             text={`SWITCH TO ${themeButtonText} THEME`}
//             icon={themeButtonIcon}
//             onPress={changeTheme}
//             iconStyle={{ tintColor: "white" }}
//           />
//           <TouchableOpacity
//             accessibilityRole="button"
//             accessibilityLabel="Native Change Theme"
//             onPress={changeTheme}
//           >
//             <View style={styles.nativeButton}>
//               <RNText>NATIVE CHANGE THEME</RNText>
//             </View>
//           </TouchableOpacity>
//         </Layout>
//       </ApplicationProvider>
//     </>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingHorizontal: 10,
//   },
//   text: {
//     textAlign: "center",
//   },
//   iconButton: {
//     marginVertical: 16,
//   },
//   nativeButton: {
//     alignItems: "center",
//     backgroundColor: "#DDDDDD",
//     padding: 10,
//   },
// });

// export default App;
import React, { useState, useRef, useEffect } from 'react';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import * as eva from '@eva-design/eva';
import {SplashScreen} from './components/splash.component';
import { AppNavigator } from './components/navigation.component';
import {baseURL} from './config'
import axios from 'axios'
import Constants from 'expo-constants';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});
export default function App({navigation}) {

  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();
  const yesInBattle = () => {
    ls.set('inBattle','yes' )
  };
  const noInBattle = () => {
    ls.set('inBattle','no' )
  };
  //https://exp-shell-app-assets.s3.us-west-1.amazonaws.com/android/%40sinex/AppKitten-f99035c6f5c94f75a7b9cc0f2bc2d15e-signed.apk
  

  

  useEffect(() => {
    axios.defaults.baseURL = baseURL;
    axios.defaults.timeout = 2000;
    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
      AppNavigator.navigation.navigate('Choose');
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
    {/* <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        <Text>Title: {notification && notification.request.content.title} </Text>
        <Text>Body: {notification && notification.request.content.body}</Text>
        <Text>Data: {notification && JSON.stringify(notification.request.content.data)}</Text>
      </View> */}
      {/* {this.state.isLoading?<SplashScreen />:<AppNavigator/>} */}
      <AppNavigator/>
    </ApplicationProvider>
    </React.Fragment>
    );

}

