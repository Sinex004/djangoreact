import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import { Divider,Input,Card, Modal, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import ls from'local-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


export const BattleInfoScreen = ({ route, navigation }) => {

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      console.log('UNSAFE battle info');
      axios
        .post("searchbattle/",{battleId:route.params.battleId, phone:ls.get('phone')})
        .then(response =>{
          console.log('heeeey');
          console.log(response.data);
          setBattleId(response.data.battle.id);
          

          setround1_1(response.data.battle.user1Round1.split(''));
          setround1_2(response.data.battle.user1Round2.split(''));
          setround1_3(response.data.battle.user1Round3.split(''));
          setround1_4(response.data.battle.user1Round4.split(''));

          setround2_1(response.data.battle.user2Round1.split(''));
          setround2_2(response.data.battle.user2Round2.split(''));
          setround2_3(response.data.battle.user2Round3.split(''));
          setround2_4(response.data.battle.user2Round4.split(''));
          setName(response.data.users.name1);
          setName2(response.data.users.name2);
          settotal1(response.data.battle.user1Total);
          settotal2(response.data.battle.user2Total);
          if(response.data.users.you==1){
            if(response.data.battle.started==1 || response.data.battle.started==4 || response.data.battle.started==5 || response.data.battle.started==8){
              setEnableButton(false)
            }
          }else{
            if(response.data.battle.started==2 || response.data.battle.started==3 || response.data.battle.started==6 || response.data.battle.started==7){
              setEnableButton(false)
            }
          }

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

  
  const [battleId, setBattleId] = React.useState('')
  const [enableButton, setEnableButton] = React.useState(true);
  const [started, setStarted] = React.useState(null);
  const [name, setName] = React.useState(null);
  const [name2, setName2] = React.useState(null);
  const [round1_1, setround1_1] = React.useState('0');
  const [round1_2, setround1_2] = React.useState('0');
  const [round1_3, setround1_3] = React.useState('0');
  const [round1_4, setround1_4] = React.useState('0');

  const [round2_1, setround2_1] = React.useState('0');
  const [round2_2, setround2_2] = React.useState('0');
  const [round2_3, setround2_3] = React.useState('0');
  const [round2_4, setround2_4] = React.useState('0');
  const [total1, settotal1] = React.useState(null);
  const [total2, settotal2] = React.useState(null);

  const addFriendIcon = (style) => (
    <Icon {...style} name='person-add-outline'/>
    );
  
  const renderansIcon = (ans) => (
    ans=='1'?
    <Icon   fill='#62E200'  style={styles.icon}  name='checkmark-outline'/>
      :
    <Icon   fill="#FD0006"	 style={styles.icon} name='close-outline'/>

  );

  const renderNoIcon = () => (
    <Icon   fill="#445D69"	 style={styles.icon} name='radio-button-off-outline'/>
  );

  
  const buttonSave = () =>{
    axios
      .get('/GetSubjects/')
      .then(response2 =>{
          console.log('navigate to battle subjects');
          navigation.navigate('BattleSubjects', {'subjects':response2.data, 'battleId':battleId})
      })
      .catch(error=>{
          console.log(error)
      });
  }


  return (
    <SafeAreaView style={{ flex: 1, marginTop:20 }}>
      <Layout style={{flexDirection:'row', justifyContent:'space-around'}}>
      <Text style={{margin:8}}  category='h4'>{name}</Text>
      <Layout style={{flexDirection:'row'}}>
      <Text style={{margin:8}}  category='h4'>{name2}</Text>
      <Icon onPress={()=>{console.log('gggggggg')}} fill="#445D69" style={{height:30,width:30,marginLeft:10, marginTop:8}} size='giant' name='person-add-outline'/>
      </Layout>
      </Layout>
      <Divider/>
      <Layout style={{flexDirection:'column', flex:1,alignItems:'stretch', justifyContent:'flex-start'}}>
      <Layout style={{flexDirection: 'row',
    // alignItems: 'center',
    justifyContent:'space-around',
    // marginHorizontal:40,
    marginTop:10,
    flex:1,}}>
          <Layout style={{flexDirection:'row'}}>
            <Text category='h5' status='primary'>{total1}  </Text>
          </Layout>
          <Layout style={{flexDirection:'row'}}>
            <Text category='h5' status='primary'>  {total2}</Text>
          </Layout>
        </Layout>

        <Text style={{alignSelf:'center'}} status='info' category='h6'>Раунд 1</Text>
        <Layout style={styles.fieldStyle}>
          {round1_1!='0'?
            <Layout style={{flexDirection:'row'}}>
              {round1_1.map(value=>renderansIcon(value))}
            </Layout>
            :
            <Layout style={{flexDirection:'row'}}>
              {renderNoIcon()}{renderNoIcon()}{renderNoIcon()}
            </Layout>
          }
          {round2_1!='0'?
            <Layout style={{flexDirection:'row'}}>
              {round2_1.map(value=>renderansIcon(value))}
            </Layout>
            :
            <Layout style={{flexDirection:'row'}}>
              {renderNoIcon()}{renderNoIcon()}{renderNoIcon()}
            </Layout>
          }
      </Layout>

        <Text style={{alignSelf:'center'}} status='info' category='h6'>Раунд 2</Text>
        <Layout style={styles.fieldStyle}>
          {round1_2!='0'?
            <Layout style={{flexDirection:'row'}}>
              {round1_2.map(value=>renderansIcon(value))}
            </Layout>
            :
            <Layout style={{flexDirection:'row'}}>
              {renderNoIcon()}{renderNoIcon()}{renderNoIcon()}
            </Layout>
          }
          {round2_2!='0'?
            <Layout style={{flexDirection:'row'}}>
              {round2_2.map(value=>renderansIcon(value))}
            </Layout>
            :
            <Layout style={{flexDirection:'row'}}>
              {renderNoIcon()}{renderNoIcon()}{renderNoIcon()}
            </Layout>
          }
      </Layout>
      
        <Text style={{alignSelf:'center'}} status='info' category='h6'>Раунд 3</Text>

        <Layout style={styles.fieldStyle}>
          {round1_3!='0'?
            <Layout style={{flexDirection:'row'}}>
              {round1_3.map(value=>renderansIcon(value))}
            </Layout>
            :
            <Layout style={{flexDirection:'row'}}>
              {renderNoIcon()}{renderNoIcon()}{renderNoIcon()}
            </Layout>
          }
          {round2_3!='0'?
            <Layout style={{flexDirection:'row'}}>
              {round2_3.map(value=>renderansIcon(value))}
            </Layout>
            :
            <Layout style={{flexDirection:'row'}}>
              {renderNoIcon()}{renderNoIcon()}{renderNoIcon()}
            </Layout>
          }
        </Layout>

        <Text style={{alignSelf:'center'}} status='info' category='h6'>Раунд 4</Text>

        <Layout style={styles.fieldStyle}>
          {round1_4!='0'?
            <Layout style={{flexDirection:'row'}}>
              {round1_4.map(value=>renderansIcon(value))}
            </Layout>
            :
            <Layout style={{flexDirection:'row'}}>
              {renderNoIcon()}{renderNoIcon()}{renderNoIcon()}
            </Layout>
          }
          {round2_4!='0'?
            <Layout style={{flexDirection:'row'}}>
              {round2_4.map(value=>renderansIcon(value))}
            </Layout>
            :
            <Layout style={{flexDirection:'row'}}>
              {renderNoIcon()}{renderNoIcon()}{renderNoIcon()}
            </Layout>
          }
        </Layout>
        
        <Button style={{margin:5}} onPress={buttonSave} disabled={enableButton} size='medium' >Играть</Button>
        
        
      </Layout>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fieldStyle: {
    flexDirection: 'row',
    // alignItems: 'center',
    justifyContent:'space-between',
    margin:5,
    flex:2,
  },
  textInputStyle: {
    paddingTop:5,
  },
  backdrop: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  icon: {
    width: 32,
    height: 32,
  },
});