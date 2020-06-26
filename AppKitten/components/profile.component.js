import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import { Divider,Input,Card, Modal, Icon, Layout, Text, TopNavigation, TopNavigationAction, Button } from '@ui-kitten/components';
import ls from'local-storage';
import axios from 'axios';
import { useFocusEffect } from '@react-navigation/native';


export const ProfileScreen = ({ navigation }) => {

  // useFocusEffect(
  //   React.useCallback(() => {
  //     // Do something when the screen is focused
  //     console.log('UNSAFE PROFILE');
  //     axios
  //       .post("battleGet/",{username:ls.get('phone')})
  //       .then(response =>{
         
  //       })
  //       .catch(error =>{
  //         console.log(error);
  //       });
  //     return () => {
  //       // Do something when the screen is unfocused
  //       // Useful for cleanup functions
  //     };
  //   }, [])
  // );
  const [profile, setProfile] = React.useState(null)
  const [name, setName] = React.useState(null);
  const [name2, setName2] = React.useState(null);
  const [round1_1, setround1_1] = React.useState(null);
  const [round1_2, setround1_2] = React.useState(null);
  const [round1_3, setround1_3] = React.useState(null);
  const [round1_4, setround1_4] = React.useState(null);

  const [round2_1, setround2_1] = React.useState(null);
  const [round2_2, setround2_2] = React.useState(null);
  const [round2_3, setround2_3] = React.useState(null);
  const [round2_4, setround2_4] = React.useState(null);
  const [total1, settotal1] = React.useState(null);
  const [total2, settotal2] = React.useState(null);


  const renderrightIcon = () => (
    <Icon   fill='#62E200'  style={styles.icon}  name='checkmark-outline'/>
  );

  const renderfalseIcon = () => (
    <Icon   fill="#FD0006"	 style={styles.icon} name='close-outline'/>
  );
  

  const buttonSave = () =>{
    const payload = {username:ls.get('phone'),}
    axios
      .post('/Profile/', payload)
      .then(response =>{
      })
      .catch(error=>{
        console.log(error)
      });
      setVisible(true)
  }


  return (
    <SafeAreaView style={{ flex: 1, marginTop:20 }}>
      <Layout style={{flexDirection:'row', justifyContent:'center'}}>
      <Text style={{margin:8}}  category='h4'>Нуржан vs Нурасыл</Text>
      </Layout>
      <Divider/>
      <Layout style={{flexDirection:'column',flex:1}}>
        <Text style={{alignSelf:'center'}} status='info' category='h6'>Раунд 1</Text>
        
        <Layout style={styles.fieldStyle}>
          <Layout style={{flexDirection:'row'}}>
          {renderrightIcon()}
          {renderrightIcon()}
          {renderfalseIcon()}
          </Layout>
          <Layout style={{flexDirection:'row'}}>
          {/* {renderrightIcon()}{renderfalseIcon()}{renderfalseIcon()} */}
          </Layout>
        </Layout>
        <Text style={{alignSelf:'center'}} status='info' category='h6'>Раунд 2</Text>

        <Layout style={styles.fieldStyle}>
          <Layout style={{flexDirection:'row'}}>
          {/* {renderfalseIcon()}
          {renderrightIcon()}
          {renderfalseIcon()} */}
          </Layout>
          <Layout style={{flexDirection:'row'}}>
          {/* {renderrightIcon()}{renderfalseIcon()}{renderfalseIcon()} */}
          </Layout>
        </Layout>
        <Text style={{alignSelf:'center'}} status='info' category='h6'>Раунд 3</Text>

        <Layout style={styles.fieldStyle}>
          <Layout style={{flexDirection:'row'}}>
          {/* {renderfalseIcon()}
          {renderrightIcon()}
          {renderfalseIcon()} */}
          </Layout>
          <Layout style={{flexDirection:'row'}}>
          {/* {renderrightIcon()}{renderfalseIcon()}{renderfalseIcon()} */}
          </Layout>
        </Layout>
        <Text style={{alignSelf:'center'}} status='info' category='h6'>Раунд 4</Text>

        <Layout style={styles.fieldStyle}>
          <Layout style={{flexDirection:'row'}}>
          {/* {renderfalseIcon()}
          {renderrightIcon()}
          {renderfalseIcon()} */}
          </Layout>
          <Layout style={{flexDirection:'row'}}>
          {/* {renderrightIcon()}{renderfalseIcon()}{renderfalseIcon()} */}
          </Layout>
        </Layout>
        <Button style={{margin:5}} disabled={true} onPress={buttonSave} size='medium' >Играть</Button>
        
        
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
    flex:1,
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