import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import {Divider, Icon, List, ListItem, BottomNavigation, BottomNavigationTab,Button, Layout, Text } from '@ui-kitten/components';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';

export const RatingScreen = ({navigation}) => {
  
  const [ratingList, setRatingList] = React.useState(null);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('UNSAFE RATINGSCREEN');
      axios
        .get("GetRating/")
        .then(response =>{
          console.log(response.data);
          setRatingList(response.data)
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
  
  const renderItemAccessory = (style) => (
      <Button style={style}>Бросить вызов</Button>
  );
  
  const renderItemIcon = (style) => (
      <Icon {...style} name='person'/>
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
      <ListItem
          title={`+7${item.username}`}
          description={`Очки: ${item.rating}`}
          icon={renderItemIcon}
          accessory={renderItemAccessory}
          />
  );
  
  return(
      <Layout style={styles.layoutMain}>
          <Layout  style={styles.head}>
              <Icon style={{marginTop:3,marginRight:10}} name='star-outline' width={33} height={33} fill='black' />
              <Text category='h2'>Рейтинг</Text>
          </Layout>
          <Divider/>
          <List style={styles.list}
          data={ratingList}
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