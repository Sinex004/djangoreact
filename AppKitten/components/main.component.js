import React from 'react';
import {View,  Image, SafeAreaView, StyleSheet } from 'react-native';
import { Spinner, Card, Modal, ApplicationProvider, Icon, Text, Input, Button, Divider, Layout, TopNavigation, IconRegistry } from '@ui-kitten/components';
import axios from 'axios';
import ls from'local-storage';

export const MainScreen = ({navigation}) =>{
  const [questions, setQuestions] = React.useState();
  const [visible, setVisible] = React.useState(false);
  const [battleId, setBattleId] = React.useState();
  // const [opponent, setOpponent] = React.useState(false);
  const [loading1, setLoading1] = React.useState(false);
  const [loading2, setLoading2] = React.useState(false);

  const LoadingIndicator = (props) => (
    <ActivityIndicator color='blue' size='large' />
    );

  const MainIcon = (style) => (
    <Icon {...style} name='play-circle-outline'/>
  );
  // const [acceptStyle,setAcceptStyle] =React.useState({disabled:true, size:'tiny'})
  const BattleIcon = (style) => (
    <Icon {...style} name='people-outline'/>
  );
  const navigateSubjects = () =>{
    setLoading1(true);
    // const payload={username:'7785568094',password:'sinex'}
    // axios
    //   .post('/auth/login/', payload)
    //   .then(response => {
    // const { token, user } = response.data;
    // console.log('login succeeeeeeeeeees')
    // ls.set('phone', '7785568094');
    
    // We set the returned token as the default authorization header
    // axios.defaults.headers.common.Authorization = `Token ${token}`;
    // axios.defaults.headers.common.user = user;
    // Navigate to the home screen
    axios
      .get('/GetSubjects/')
      .then(response =>{
        navigation.navigate('Subjects',response.data)
      })
      .catch(error=>{
        console.log(error)
        setLoading1(false)
      });  
      // })
      // .catch(error=>console.log(error))  
  };

    
  // const Header = (props) => (
  //   <View {...props}  style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
  //     <Layout >
  //     <Text status='primary' category='h5'>Подождите</Text>
  //     {/* <Divider/> */}
  //     <Text status='primary' category='s1'>подбираем противника...</Text>
  //     </Layout>
  //     <Spinner style={{padding:0}} size='large'/>
  //   </View>
  // );

  // const closeWait = () => {
  //   console.log(questions);
  //   setVisible(false);
  //   clearInterval(interval);
  //   // console.log(acceptStyle);
  // };
  
  // const oppReady = (ques) =>{
  //   // setAcceptStyle({disabled:false, size:'tiny'});
  //   console.log(ques)
  //   setQuestions(ques['questions']);
  //   setVisible(false);
  //   navigation.navigate('Battle', {battleId:battleId, questions:questions})
  //   console.log('ACCEPT');
  // };

  const navigateChoose = () => {
    setLoading2(true);
    navigation.navigate('Choose')
  }

  const openWait = () => {
    setVisible(true);
    const payload = {username: ls.get('phone')}
    axios
      .post("GetBattle/", payload)
      .then(response => {
        console.log(response.data)
        setBattleId(response.data.battleId);
        const payload2 = {'battleId': response.data.battleId, 'stat': response.data.stat}
        const interval = setInterval(()=> {
          axios
            .post("GetQuestionsForBattle/", payload2)
            .then(response2=> {
              console.log('background')
              console.log(response2.data)
              if(response2.data.length !=0){
                clearInterval(interval);
                // setAcceptStyle({disabled:true, size:'tiny'});
                console.log(response2.data)
              // setQuestions(response.data);
                oppReady(response2.data)

  
              }
            })
            .catch(error => {
              console.log(error);
            })

        }, 5000);
      })
      .catch(error => {
        console.log(error)
      })
  };

  // const acceptBattle = () => {
  //   setVisible(false);
  //   navigation.navigate('Battle', {battleId:battleId, questions:questions})
  //   console.log('ACCEPT');

  // };

  // const Footer = (props) => (
  //   <View {...props} style={styles.footerContainer}>
  //     <Button
  //       style={styles.footerControl}
  //       size='medium'
  //       status='basic'
  //       onPress= {closeWait}
  //       >
  //       Отмена
  //     </Button>
  //     {/* <Button
  //       {...acceptStyle}
  //       style={styles.footerControl}
  //       onPress={acceptBattle}
  //       >
  //       Принять
  //     </Button> */}
  //   </View>
  // );

  return(
    <SafeAreaView style={{flex:1}}>
    <Layout style={styles.layoutMain}>
        {/* <Avatar size='giant' style={styles.avatar} shape='rounded' source={require('../assets/logo.png')}/> */}
        <Image style={styles.avatar} source = {require('../assets/logo.png')} />
          
        <Layout style={styles.collayout}>
          {loading1?<Button appearance='outline' size='large' style={styles.button} icon={LoadingIndicator}>Загрузка...</Button>:<Button size='large' style={styles.button} onPress={navigateSubjects} icon={MainIcon}>Быстрый тест</Button>}
          {loading2?<Button appearance='outline' size='large' style={styles.button} icon={LoadingIndicator}>Загрузка...</Button>:<Button size='large' style={styles.button} onPress={navigateChoose}  icon={BattleIcon}>Соревнование</Button>}
        </Layout>
        {/* <Modal
          visible={visible}
          backdropStyle={styles.backdrop}
          onBackdropPress={closeWait}
          >
          <Card disabled={true} footer={Footer} style={{padding:15}}>
            <Layout style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
              <Layout >
                <Text status='primary' category='h5'></Text>
                <Text status='primary' category='s1'>подбираем противника...</Text>
              </Layout>
              <Spinner style={{padding:0}} size='large'/>
            </Layout>
          </Card>
        </Modal> */}
    </Layout>
    </SafeAreaView>
  );




};
const styles = StyleSheet.create({
  button: {
    margin: 8,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  topNav:{
    marginTop:15,
  },
  avatar:{
    resizeMode:'contain',
    flex:3,
    aspectRatio:0.8,
  },
  footerContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  footerControl: {
    marginHorizontal: 5,
  },
  layoutMain:{
    paddingTop:50,
    padding: 12,
    flex: 1,
    // justifyContent:'center',
    alignItems:'center',
    flexDirection:'column',
  },
  rowlayout:{
    flexDirection:'row',
    justifyContent:'space-around',
    
  },
  collayout:{
    // flexDirection:'column',
    // justifyContent:'center',
    // alignItems:'center',
    marginTop:20,
    flex:2,
    alignSelf:'stretch'
    
  },
  rowTextandInput:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent:'space-around',
    margin:5,
  }
});