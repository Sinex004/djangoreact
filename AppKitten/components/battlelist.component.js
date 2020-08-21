import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import {Divider, Icon, List, ListItem, BottomNavigation, BottomNavigationTab,Button, Layout, Text, Avatar } from '@ui-kitten/components';
import axios from 'axios';
import ls from'local-storage';
import { useFocusEffect } from '@react-navigation/native';

export const BattleListScreen = ({navigation}) => {
  
  const [battlesList, setBattlesList] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('UNSAFE battles list');
      axios
        .post("battleGet/",{username:ls.get('phone')})
        .then(response =>{
          console.log(response.data);
          // const temp = response.data;
          // for (let i = 0; i<temp.length;i++){
          // }
          setBattlesList(response.data)
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
  
  const onButtonPress = (index) =>{
    navigation.navigate('BattleInfo',{battleId:battlesList[index].battleId})

  };
  
  const renderItemAccessory = (style, index) => (
    <Button key={index} onPress={onButtonPress} style={style} >Играть</Button>
  );
  
  const renderItemIcon = (style) => (
    <Avatar {...style} style={{height:48, width:42}}  size='giant'  source={require('../assets/shaking-hands_39468.png')} />
  );
  const renderDuringIcon = (style) => (
    <Avatar {...style} style={{height:48, width:42}}  size='giant'  source={require('../assets/crossed-swords_39260.png')} />
  );
  const renderWinIcon = (style) => (
    <Avatar {...style} style={{height:48, width:42}}  size='giant'  source={require('../assets/queen-crown_38957.png')} />
  );
  const renderLoseIcon = (style) => (
    <Avatar {...style} style={{height:48, width:42}}  size='giant'  source={require('../assets/broken-shield_39326.png')} />
  );
  
  const createRatingList = () =>{
    axios
      .get("GetRating/")
      .then(response =>{
        console.log(response.data)
      })
      .catch(error =>{
        console.log(error);
      });
  }
  const renderList = ({ item, index }) => (
    item.result==ls.get('phone')?
      <ListItem
          key={index}
          descriptionStyle={{fontSize:16, color:'black'}}
          titleStyle={{fontSize:18, fontWeight:'bold',color:'#0032FF'}}
          title={`${item.user1}      VS      ${item.user2}`}
          description={`         ${item.total1}                                  ${item.total2} `}
          icon={renderWinIcon}
          onPress={()=>onButtonPress(index)}
          style={{backgroundColor:'green'}}
          
          />
      :
      item.result=='11111'?
        <ListItem
            key={index}
            descriptionStyle={{fontSize:16, color:'black'}}
            titleStyle={{fontSize:18, fontWeight:'bold',color:'#0032FF'}}
            title={`${item.user1}      VS      ${item.user2}`}
            description={`         ${item.total1}                                  ${item.total2} `}
            icon={renderItemIcon}
            onPress={()=>onButtonPress(index)}
            style={{backgroundColor:'yellow'}}

            />
        :
        item.result=='0'?
          <ListItem
              key={index}
              descriptionStyle={{fontSize:16, color:'black'}}
              titleStyle={{fontSize:18, fontWeight:'bold',color:'#0032FF'}}
              title={`${item.user1}      VS      ${item.user2}`}
              description={`         ${item.total1}                                  ${item.total2} `}
              icon={renderDuringIcon}
              onPress={()=>onButtonPress(index)}
              />
          :
          <ListItem
              key={index}
              descriptionStyle={{fontSize:16, color:'black'}}
              titleStyle={{fontSize:18, fontWeight:'bold',color:'#0032FF'}}
              title={`${item.user1}      VS      ${item.user2}`}
              description={`         ${item.total1}                                  ${item.total2} `}
              icon={renderLoseIcon}
              onPress={()=>onButtonPress(index)}
              style={{backgroundColor:'red'}}
              />

  );
  const separator = () =>(
    <>
    <Divider style={{backgroundColor:'#4187FF'}}/>
    <Divider style={{backgroundColor:'#4187FF'}}/>
    </>
  )

  return(
      <Layout style={styles.layoutMain}>
          <Layout  style={styles.head}>
              <Icon style={{marginTop:3,marginRight:10}} name='star-outline' width={33} height={33} fill='black' />
              <Text category='h2'>Батлы</Text>
          </Layout>
          <Divider style={{backgroundColor:'#4187FF'}} />
          <Divider style={{backgroundColor:'#4187FF'}} />
          <List style={styles.list}
          data={battlesList}
          ItemSeparatorComponent={separator}

          renderItem={renderList}
          />
      </Layout>
  );
  
};
const styles = StyleSheet.create({
    head:{
      flexDirection:'row',
      alignSelf:'center',
      margin:5
    },
    button: {
      margin: 8,
    },
    topNav:{
      marginTop:15,
    },
    avatar:{
      margin:8,
    },
    list:{
      margin:10,
    },
    layoutMain:{
      paddingTop:30,
      flex: 1,
    //   justifyContent:'center',
    //   alignItems:'center',
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