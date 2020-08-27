import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from './home.component';
import { DetailsScreen} from './details.component';
// import {RegistrationScreen} from './registration.component';
import {CodeScreen} from './code.component';
import {MainScreen} from './main.component';
import {BattleInfoScreen} from './battleInfo.component';
import {RatingScreen} from './rating.component';
import {SubjectsScreen} from './subjects.component'
import {QuestionsScreen} from './questions.component';
import {BattleScreen} from './battle.component';
import {LogoutScreen} from './logout.component';
// import {NotScreen} from './not.component';
import {ChooseScreen} from './choose.component';
import {SubjectsforbattleScreen} from './subjectsforbattle.component'
import {BattleListScreen} from './battlelist.component';
import { SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {Icon, BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
// https://expo.io/artifacts/2085781a-f437-4c37-b736-7fb44f910798
const linking = {
  prefixes:['https://expo.io/artifacts/2085781a-f437-4c37-b736-7fb44f910798'],
  config: {
    screens: {
      HomeNavigator:{
        initialRouteName: 'Main',
        screens:{
          Main:'mainpath',
          Accept:{
            path: 'challenge/:enemy',
            parse: {
              enemy: parseInt(enemy),
            },
            stringify: {
              enemy: enemy.toString(),
            },
          },
          Home:'*',
        }
      }
    },

  },
};

const Stack = createStackNavigator();

const HomeNavigator = () => (
  <Stack.Navigator headerMode='none' initialRouteName="Home">
    <Stack.Screen name='Home' component={HomeScreen}/>
    {/* <Stack.Screen name='Registration' component={RegistrationScreen}/> */}
    <Stack.Screen name='Code' component={CodeScreen}/>
    <Stack.Screen name='FirstEnter' component={DetailsScreen}/>
    <Stack.Screen name='Main' component={TabNavigator}/>
    <Stack.Screen name='Subjects' component={SubjectsScreen}/>
    <Stack.Screen name='Questions' component={QuestionsScreen}/>
    <Stack.Screen name='Battle' component={BattleScreen}/>
    <Stack.Screen name='Choose' component={ChooseScreen}/>
    <Stack.Screen name='BattleSubjects' component={SubjectsforbattleScreen}/>
    <Stack.Screen name='BattleInfo' component={BattleInfoScreen}/>
    {/* <Stack.Screen name='Notif' component={NotScreen}/> */}


    

  </Stack.Navigator>
);


const BottomTab = createBottomTabNavigator();

const ProfileIcon = (style) => (
  <Icon {...style} name='person-outline'/>
);

const RatingIcon = (style) => (
  <Icon {...style} name='award-outline'/>
);

const MainIcon = (style) => (
  <Icon {...style} name='play-circle-outline'/>
);

const LogoutIcon = (style) => (
  <Icon {...style} name='log-out-outline'/>
);


const TabNavigator = () => (
  <BottomTab.Navigator tabBar={props => <BottomTabBar {...props} />}>
    <BottomTab.Screen name='Start' component={MainScreen}/>
    <BottomTab.Screen name='Rating' component={RatingScreen}/>
    <BottomTab.Screen name='BattleList' component={BattleListScreen}/>
    <BottomTab.Screen name='Logout' component={LogoutScreen}/>
  </BottomTab.Navigator>
);
const BottomTabBar = ({ navigation, state }) => {

  const onSelect = (index) => {
    navigation.navigate(state.routeNames[index]);
  };

  return (
    <SafeAreaView>
      <BottomNavigation selectedIndex={state.index} onSelect={onSelect}>
        <BottomNavigationTab icon={MainIcon} title='Тесты'/>
        <BottomNavigationTab icon={RatingIcon} title='Рейтинг'/>
        <BottomNavigationTab icon={ProfileIcon} title='Батллы'/>
        <BottomNavigationTab icon={LogoutIcon} title='Выход'/>
      </BottomNavigation>
    </SafeAreaView>
  );
};


export const AppNavigator = () => (
  <NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>
    <HomeNavigator/>
  </NavigationContainer>
);