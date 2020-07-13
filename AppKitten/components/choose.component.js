import React from 'react';
import { Share, TouchableOpacity,SafeAreaView, View, StyleSheet } from 'react-native';
import { Avatar, Icon, Text, TopNavigation, TopNavigationAction, BottomNavigation, BottomNavigationTab, Layout } from '@ui-kitten/components';
import ls from'local-storage';
import axios from 'axios';

export const ChooseScreen = ({route,navigation}) => {
    // const [battleId, setBattleId] = React.useState();
    
    const BackIcon = (style) => (
        <Icon {...style} name='arrow-back-outline'/>
    );
    
    const onShare = async () => {
        try {
          await Share.share({
            title: 'React Native Share',
            message:
              'Let me share this text with other apps',
          });
    
        } catch (error) {
          console.log(error.message);
        }
      };

    const BackAction = () => (
        <TopNavigationAction icon={BackIcon} onPress={navigateBack} />
    );
    const navigateBack = () => {
        navigation.goBack();
    };
    

    const openWhatsapp = async () =>{
        try {
            await Share.share({
              title: 'EntFun',
              message:
                'Let me share this text with other apps',
            });
      
          } catch (error) {
            console.log(error.message);
          }
        console.log('Whats')

    }

    const openTelegram = () =>{
        console.log('Telegram')

    }

    const openVkontakte = () =>{
        console.log('Vkontakte')

    }

    const findRandom = () =>{
        console.log('Random')
        const payload = {username: ls.get('phone')}
        console.log(ls.get('phone'))
        axios
        .post("GetBattle/", payload)
        .then(response => {
            console.log(response.data)
            // setBattleId(response.data.battleId);
            axios
            .get('/GetSubjects/')
            .then(response2 =>{
                console.log('navigate to battle subjects');
                navigation.navigate('BattleSubjects', {'subjects':response2.data, 'battleId':response.data.battleId})
            })
            .catch(error=>{
                console.log(error)
            });
            

            // const payload2 = {'battleId': response.data.battleId,}
            // const interval = setInterval(()=> {
            // axios
            //     .post("GetQuestionsForBattle/", payload2)
            //     .then(response2=> {
            //     console.log('background')
            //     console.log(response2.data)
            //     if(response2.data.length !=0){
            //         // clearInterval(interval);
            //         // setAcceptStyle({disabled:true, size:'tiny'});
            //         console.log(response2.data)
            //     // setQuestions(response.data);
            //         oppReady(response2.data)

    
            //     }
            //     })
            //     .catch(error => {
            //     console.log(error);
            //     })

            // }, 5000);
        })
        .catch(error => {
            console.log(error)
        })

    }

    const search = () =>{
        console.log('Search')
    }

    // const renderTitle = (props) =>{
    //     <View>
    //         <Text {...props} category='h5'>Выберите соперника</Text>
    //     </View>
    // }

    const renderTitle = (props) => (

          <Text {...props}>Eva Application</Text>
      );


    return(
        <SafeAreaView style={{flex:1}}>
            
            <Layout style={styles.collayout} level='1'>
                <TopNavigation
                    
                    alignment='center'
                    leftControl={BackAction()}
                    title='Выберите соперника'
                    // subtitle='Subtitle'
                />
                <Layout style={styles.rowlayout} level='1'>
                    <TouchableOpacity onPress={openWhatsapp} style={{flex:1, flexDirection:'column',alignItems:'center', padding:10}}>
                    <Avatar shape='square' style={styles.avatar} size='giant' source={require('../assets/logo_whatsapp_telephone_handset_icon_143174.png')}/>
                    <Text status='success' category='h6'>WhatsApp</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity onPress={openTelegram} style={{flex:1, flexDirection:'column',alignItems:'center', padding:10}}>
                    <Avatar style={styles.avatar} size='giant' source={require('../assets/logo_telegram_airplane_air_plane_paper_airplane_icon_143170.png')}/>
                    <Text status='info' category='h6'>Telegram</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={openVkontakte} style={{flex:1, flexDirection:'column',alignItems:'center', padding:10}}>
                    <Avatar shape='square' style={styles.avatar} size='giant' source={require('../assets/logo_vk_vkontakte_icon_143187.png')}/>
                    <Text  status='primary' category='h6'>Вконтакте</Text>
                    </TouchableOpacity>

                </Layout>
                <Layout style={styles.rowlayout} level='1'>

                    <TouchableOpacity onPress={findRandom} style={{flex:1, flexDirection:'column',alignItems:'center', padding:10}}>
                    <Avatar shape='square' style={styles.avatar} size='giant' source={require('../assets/perspective-dice-six-faces-random_38559.png')}/>
                    <Text status='basic' category='h6'>Рандом</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={search} style={{flex:1, flexDirection:'column',alignItems:'center', padding:10}}>
                    <Avatar shape='square' style={styles.avatar} size='giant' source={require('../assets/1-83_icon-icons.com_68859.png')}/>
                    <Text status='primary' category='h6'>Поиск</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{flex:1, flexDirection:'column',alignItems:'center', padding:10}}>
                    <Avatar shape='square' style={styles.avatar} size='giant' source={require('../assets/logo_facebook_icon_143184.png')}/>
                    <Text status='info' category='h6'>Facebook</Text>
                    </TouchableOpacity>
                
                </Layout>
                {/* <Layout style={styles.rowlayout} level='1'>

                    <TouchableOpacity style={{flex:1, flexDirection:'column',alignItems:'center', padding:10}}>
                    <Avatar style={styles.avatar} size='giant' source={require('../assets/search-outline.png')}/>
                    <Text status='warning' category='h6'>Нуржан</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={{flex:1, flexDirection:'column',alignItems:'center', padding:10}}>
                    <Avatar style={styles.avatar} size='giant' source={require('../assets/search-outline.png')}/>
                    <Text status='warning' category='h6'>Нуржан</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{flex:1, flexDirection:'column',alignItems:'center', padding:10}}>
                    <Avatar style={styles.avatar} size='giant' source={require('../assets/search-outline.png')}/>
                    <Text status='warning' category='h6'>Нуржан</Text>
                    </TouchableOpacity>
                
                </Layout> */}
            </Layout>
        </SafeAreaView>
    );
    
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'wrap',
        padding: 8,
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    logo: {
        marginHorizontal: 16,
      },
    avatar: {
        // padding:30,
        // margin:8,
        // borderColor:'blue',
        // borderRadius:30,
        // borderWidth: 2,
    },
    textStyle:{
        
    },
    rowlayout:{
        flexDirection:'row',
        justifyContent:'space-around',
        
    },
    collayout:{
    // flexDirection:'column',
    // justifyContent:'center',
    // alignItems:'center',
        paddingTop:22,
        flex:2,
        alignSelf:'stretch'
    
    },
  });