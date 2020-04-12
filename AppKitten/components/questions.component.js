import React ,{useEffect} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Alert} from 'react-native';
import { RadioGroup, Radio, ViewPager, Divider, Icon, List, ListItem, BottomNavigation, BottomNavigationTab,Button, Layout, Text } from '@ui-kitten/components';




export class QuestionsScreen extends React.Component {
  state={
    questions:null,
    header:1,
    sIndex:0,
    started: true
  }
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

  UNSAFE_componentWillMount() {
    // const { route,navigation } = thi s.props;

    if(this.state.started){
      console.log('staaaaart');
      var shuffle = require('shuffle-array');
      const questions = this.props.route.params;  
      // console.log(questions)
      for (let i = 0; i<questions.length;i++){
        questions[i]['userAnswer']= null;
        questions[i]['variants'] = shuffle([questions[i].answer, questions[i].var1, questions[i].var2, questions[i].var3]);
      }
      // started = false;
      this.setState({started:false})
      this.setState({questions:questions})
      console.log(questions)
      console.log('eeeeeeeeeeeennnndddddd');

    }else{
      console.log("elseeeeee")
    }
  }
  // const [questions, setQuestions]= React.useState(start());
  // const [header, setHeader] = React.useState(1);
  // const [sIndex, setsIndex] = React.useState(0);
  // const [started,setStarted] = React.useState(true)
  renderLeftIcon = (style) => (
    <Icon {...style} name='arrow-circle-left-outline' width={30} height={30}/>
  );

  renderRightIcon = (style) => (
    <Icon {...style} name='arrow-circle-right-outline' width={30} height={30}/>
  );
  
  renderSubmitIcon = (style) => (
    <Icon {...style} name='checkmark-circle-outline' width={30} height={30}/>
  );
  AnswerChange = e =>{
    console.log(e);
    this.state.questions[this.state.sIndex].userAnswer=e;
  };
  renderPage = (ii) => {
    return (
      <Layout key={ii.id}
        level='2'
        style={styles.tab}>
        <Layout style={styles.questionTop}>
          <Text category='h5'>{ii.question}</Text>
        </Layout>
        <Layout level='4' style={{flex:4, alignItems:'center'}}>
          <RadioGroup
          selectedIndex={ii.userAnswer}
          onChange={this.AnswerChange}>
            <Radio style={styles.radio} text={ii.variants[0]} /> 
            <Radio style={styles.radio} text={ii.variants[1]} />
            <Radio style={styles.radio} text={ii.variants[2]} />
            <Radio style={styles.radio} text={ii.variants[3]} />
          </RadioGroup>
        </Layout>
      </Layout>
    );
  };
  
  prevPage = () => {
    this.setState({header:this.state.header-1});
    this.setState({sIndex:this.state.sIndex - 1});
  };
  nextPage = () => {
    this.setState({header:this.state.header+1});
    this.setState({sIndex:this.state.sIndex + 1});
  };
  selectPage = (number) => {
    console.log(number)
    this.setState({header:number+1})
    this.setState({sIndex:number});
  };
  submitHandle = () => {
    var result=0;
    for (let i = 0; i<this.state.questions.length;i++){
      if(this.state.questions[i].variants[this.state.questions[i].userAnswer]==this.state.questions[i].answer){
        result = result + 1;
      };
    };
    Alert.alert("У тебя " + result.toString() +" правильных ответов из 10")
    this.props.navigation.navigate('Main')
  }
  render(){
    return(
      <SafeAreaView style={{flex:1}}>
        <Layout style={styles.head}>
          <Button size='tiny' onPress={this.prevPage} appearance='ghost' icon={this.renderLeftIcon}></Button>
          <Text category='h5'>Вопрос {this.state.header}/10</Text>
          <Button size='tiny' onPress={this.nextPage} appearance='ghost' icon={this.renderRightIcon}></Button>

        </Layout>
        <ViewPager style={{flex:8}}
        selectedIndex={this.state.sIndex}
        onSelect={this.selectPage}>
        
        {this.state.questions.map(item=>this.renderPage(item))}
        </ViewPager>
        <Layout>
          <Button onPress={this.submitHandle} icon={this.renderSubmitIcon}  ></Button>
        </Layout>
      </SafeAreaView>
    );
  }
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