import React ,{useEffect} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Alert} from 'react-native';
import { RadioGroup, Radio, ViewPager, Divider, Icon, List, ListItem, BottomNavigation, BottomNavigationTab,Button, Layout, Text } from '@ui-kitten/components';




export const QuestionsScreen = ({route, navigation }) => {
  // useEffect(() => {
  //   console.log('staaaaart');
  //   var shuffle = require('shuffle-array');
  //   const questions = route.params;  
  //   for (let i = 0; i<questions.length;i++){
  //     questions[i]['userAnswer']= React.useState(null);
  //     questions[i]['variants'] = shuffle([questions[i].answer, questions[i].var1, questions[i].var2, questions[i].var3]);
  //   }
  //   // started = false;
  //   console.log('eeeeeeeeeeeennnndddddd');
  //   setQuestions(questions)
  // }, []);

  const start = () =>{
    if(started){
      console.log('staaaaart');
      var shuffle = require('shuffle-array');
      const questions = route.params;  
      for (let i = 0; i<questions.length;i++){
        questions[i]['userAnswer']= React.useState(null);
        questions[i]['variants'] = shuffle([questions[i].answer, questions[i].var1, questions[i].var2, questions[i].var3]);
      }
      // started = false;
      console.log('eeeeeeeeeeeennnndddddd');
      setStarted(false)
      return(questions)
    }else{
      return(questions)
    }
  }
  const [questions, setQuestions]= React.useState(start());
  const [header, setHeader] = React.useState(1);
  const [sIndex, setsIndex] = React.useState(0);
  const [started,setStarted] = React.useState(true)
  const renderLeftIcon = (style) => (
    <Icon {...style} name='arrow-circle-left-outline' width={30} height={30}/>
  );

  const renderRightIcon = (style) => (
    <Icon {...style} name='arrow-circle-right-outline' width={30} height={30}/>
  );
  
  const renderSubmitIcon = (style) => (
    <Icon {...style} name='checkmark-circle-outline' width={30} height={30}/>
  );
  const renderPage = (ii) => {
    return (
      <Layout key={ii.id}
        level='2'
        style={styles.tab}>
        <Layout style={styles.questionTop}>
          <Text category='h5'>{ii.question}</Text>
        </Layout>
        <Layout level='4' style={{flex:4, alignItems:'center'}}>
          <RadioGroup
          selectedIndex={ii.userAnswer[0]}
          onChange={ii.userAnswer[1]}>
            <Radio style={styles.radio} text={ii.variants[0]} /> 
            <Radio style={styles.radio} text={ii.variants[1]} />
            <Radio style={styles.radio} text={ii.variants[2]} />
            <Radio style={styles.radio} text={ii.variants[3]} />
          </RadioGroup>
        </Layout>
      </Layout>
    );
  };
  
  const prevPage = () => {
    setHeader(header-1);
    setsIndex(sIndex - 1);
  };
  const nextPage = () => {
    setHeader(header+1);
    setsIndex(sIndex + 1);
  };
  const selectPage = (number) => {
    setHeader(number+1)
    setsIndex(number);
  };
  const submitHandle = () => {
    var result=0;
    for (let i = 0; i<questions.length;i++){
      if(questions[i].variants[questions[i].userAnswer[0]]==questions[i].answer){
        result = result + 1;
      };
    };
    Alert.alert(result)
    navigation.navigate('Main')
  }
  return(
    <SafeAreaView style={{flex:1}}>
      <Layout style={styles.head}>
        <Button size='tiny' onPress={prevPage} appearance='ghost' icon={renderLeftIcon}></Button>
        <Text category='h5'>Вопрос {header}/10</Text>
        <Button size='tiny' onPress={nextPage} appearance='ghost' icon={renderRightIcon}></Button>

      </Layout>
      <ViewPager style={{flex:8}}
      selectedIndex={sIndex}
      onSelect={selectPage}>
      
      {questions.map((item)=> renderPage(item))}
      </ViewPager>
      <Layout>
        <Button onPress={submitHandle} icon={renderSubmitIcon}  ></Button>
      </Layout>
    </SafeAreaView>
  );
};
var deviceHeight = Dimensions.get("window").height;
const styles = StyleSheet.create({
    head:{
      flex:1,
      flexDirection:'row',
      marginTop:20,
      padding:10,
      justifyContent:'space-between',
      alignItems:'center',
    },
    radio:{
      marginVertical:8,
    },
    button: {
      margin: 8,
    },
    hideText:{
  
    },
    questionTop:{
      flex:3,
      alignItems:'center',
      paddingTop:20,
    },
    tab: {
      flex:1,
      height: deviceHeight/2,
      padding:50,
      // alignItems: 'center',
      // justifyContent: 'center',
      flexDirection:'column',
    },
    layoutMain:{
      // paddingTop:20,
      // padding: 8,
      flexDirection:'column',
      height:deviceHeight,
      // justifyContent:'center',
    //   alignItems:'center',
    //   flexDirection:'column',
    },
    layoutMain2:{
      flex:2,
      flexDirection:'column',
    //   width:deviceWidth*85/100,
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