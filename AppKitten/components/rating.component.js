import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import {Icon, List, ListItem, BottomNavigation, BottomNavigationTab,Button, Layout, Text } from '@ui-kitten/components';

const dataa = new Array(8).fill({
    title: 'Title for Item',
    description: 'Description for Item',
});

export const RatingScreen = () => {

    const renderItemAccessory = (style) => (
        <Button style={style}>Бросить вызов</Button>
    );
    
    const renderItemIcon = (style) => (
        <Icon {...style} name='person'/>
    );
    
    const renderList = ({ item, index }) => (
        <ListItem
            title={`${item.title} ${index + 1}`}
            description={`${item.description} ${index + 1}`}
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
            <List style={styles.list}
            data={dataa}
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