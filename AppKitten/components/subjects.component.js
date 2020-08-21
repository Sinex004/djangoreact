import React from 'react';
import { Alert, Dimensions, SafeAreaView, StyleSheet } from 'react-native';
import axios from 'axios';
import {List,ListItem, ApplicationProvider,IconRegistry,Text, Icon, Input, Button, Divider, Layout, TopNavigation } from '@ui-kitten/components';
import ls from'local-storage';


// var subjects = ["Математическая грамотность","Грамотность чтения","История","Математика","Физика"];

export const SubjectsScreen = ({route, navigation }) => {
    const subjects = route.params
    // const renderItemAccessory = (style) => (
    //     <Button style={style}>Выбрать</Button>
    // );

    const renderItemIcon = (style) => (
        <Icon width={35} height={35} fill="#3366FF" name='book-outline'/>
    );
    const ChooseSubject = (subject) => {
      const payload =  { subject_id:subject }
      axios
        .post('/GetQuestions30/',payload )
        .then(response =>{
          
          navigation.navigate('Questions',{questions:response.data})
        })
        .catch(error=>{
          console.log(error)
        }) 
    }
        
    const renderList = ({ item, index }) => (
        <Layout>
        <ListItem
            titleStyle={{fontSize:15}}
            title={item["subject_name"]}
            // description={`${item.description} ${index + 1}`}
            icon={renderItemIcon}
            onPress={ChooseSubject.bind(this, item["id"])}
            // accessory={renderItemAccessory}
            />
            {/* <Divider style={{borderWidth:0.3, borderColor:'aqua'}} /> */}
            <Divider/>
            </Layout>
    );

    


    return(
        <Layout level="3" style={styles.layoutMain}>
            <Layout level="1"  style={styles.head}>
                <Icon fill="black" style={{marginTop:3,marginRight:10}} name='book-open-outline' width={35} height={35} />
                <Text category='h2'>Предметы</Text>
            </Layout>
            <Divider style={{borderWidth:0.5, borderColor:'blue'}} />
            {console.log("b")}
            {console.log(subjects)}
            {console.log("z")}
            <Layout level='1'style={{paddingTop:7}}>
                <List style={styles.list}
                data={subjects}
                renderItem={renderList}
                />
            </Layout>
        </Layout>
    );
};

var deviceWidth = Dimensions.get("window").width;
var deviceHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  head:{
    
    paddingTop:30,
    flexDirection:'row',
    justifyContent:'center',
    alignItems:'center',
    padding:5,
    paddingBottom:10,
    borderRadius:3
  },
  button: {
    margin: 8,
  },
  topNav:{
    marginTop:15,
  },
  hideText:{

  },
  list:{
    
  },
  layoutMain:{
    
    padding: 8,
    flex: 1,
    // justifyContent:'center',
    // alignItems:'center',
    flexDirection:'column',
    borderRadius:10
  },
  layoutMain2:{
    flex:2,
    flexDirection:'column',
    width:deviceWidth*85/100,
    padding:10,
    alignItems:'center',
    borderRadius:10
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