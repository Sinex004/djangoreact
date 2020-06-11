import React ,{useEffect} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Alert} from 'react-native';
import { RadioGroup, Radio, ViewPager, Divider, Icon, List, ListItem, BottomNavigation, BottomNavigationTab,Button, Layout, Text } from '@ui-kitten/components';
import ls from'local-storage';
import axios from 'axios';
import moment from "moment";



export class BattleScreen extends React.Component {
  state={
    questions:null,
    header:1,
    sIndex:0,
    checked:false,
    result:0,
    submitButton:{status:'primary'},
    eventDate:moment.duration().add({minutes:5,seconds:0}), // add 9 full days, 3 hours, 40 minutes and 50 seconds
    mins:0,
    secs:0,
  };

  componentDidMount(){
    this.updateTimer()
  }

  updateTimer=()=>{
    
    const x = setInterval(()=>{
        let { eventDate} = this.state

        if(eventDate <=0){
            clearInterval(x)
        }else {
            eventDate = eventDate.subtract(5,"s")
            const mins = eventDate.minutes()
            const secs = eventDate.seconds()
            if (eventDate<=15){
                let submitButton = {status:'warning'}
                this.setState({
                    submitButton,
                    mins,
                    secs,
                    eventDate
                })
            }else{
                this.setState({
                    mins,
                    secs,
                    eventDate
                })
            }
        }
    },5000)

  }

  UNSAFE_componentWillMount() {
    // if(this.state.started){
      var shuffle = require('shuffle-array');
      const questions = this.props.route.params.questions;  
      for (let i = 0; i<questions.length;i++){
        questions[i]['userAnswer']= null;
        questions[i]['variants'] = shuffle([questions[i].answer, questions[i].var1, questions[i].var2, questions[i].var3]);
        questions[i]['correctIndex'] = questions[i].variants.indexOf(questions[i].answer);
        questions[i]['variantsStyleCorrect']= [{appearance:"outline", status:'primary'},
        {appearance:"outline", status:'primary'},
        {appearance:"outline", status:'primary'},
        {appearance:"outline", status:'primary'}];
        questions[i]['variantsStyleCorrect'][questions[i]['correctIndex']] = {appearance:"filled", status:'success'}
        questions[i]['variantsStyleWrong']= [{appearance:"outline", status:'primary'},
        {appearance:"outline", status:'primary'},
        {appearance:"outline", status:'primary'},
        {appearance:"outline", status:'primary'}];
        questions[i]['variantsStyleWrong'][questions[i]['correctIndex']] = {appearance:"filled", status:'success'}
      }
      // started = false;
      // this.setState({started:false});
      this.setState({questions:questions});
      console.log(questions);

    // }else{
    //   console.log("elseeeeee")
    // };
  };
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
  
  renderCloseIcon = (style) => (
    <Icon {...style} name='close-circle-outline' width={30} height={30}/>
  );
  AnswerChange = (index) =>{
    this.state.questions[this.state.sIndex].userAnswer=index;
    if(this.state.questions[this.state.sIndex].variants[index]==this.state.questions[this.state.sIndex].answer){
      this.state.questions[this.state.sIndex].correct=true;
    }else{
      this.state.questions[this.state.sIndex].correct=false;
    }
    this.nextPage();

  };
  renderPage = (ii) => {
    return (
      <Layout key={ii.id}
        level='3'
        style={styles.tab}>
        <Layout style={styles.questionTop}>
          <Text category='h5'>{ii.question}</Text>
        </Layout>
        {this.state.checked?
          ((ii.correct)?
            (<Layout level='3' style={{flex:4, alignItems:'center'}}> 
              <Layout style={styles.rowlayout}>
                <Button {...ii.variantsStyleCorrect[0]} style={styles.button}  >{ii.variants[0]}</Button>
                <Button {...ii.variantsStyleCorrect[1]} style={styles.button}  >{ii.variants[1]}</Button>
              </Layout>
              <Layout style={styles.rowlayout}>
                <Button {...ii.variantsStyleCorrect[2]} style={styles.button} >{ii.variants[2]}</Button>
                <Button {...ii.variantsStyleCorrect[3]} style={styles.button} >{ii.variants[3]}</Button>
              </Layout>
            </Layout>)
            :(
            <Layout level='3' style={{flex:4, alignItems:'center'}}> 
              <Layout style={styles.rowlayout}>
                <Button {...ii.variantsStyleWrong[0]} style={styles.button} >{ii.variants[0]}</Button>
                <Button {...ii.variantsStyleWrong[1]} style={styles.button} >{ii.variants[1]}</Button>
              </Layout>
              <Layout style={styles.rowlayout}>
                <Button {...ii.variantsStyleWrong[2]} style={styles.button} >{ii.variants[2]}</Button>
                <Button {...ii.variantsStyleWrong[3]} style={styles.button} >{ii.variants[3]}</Button>
              </Layout>
            </Layout>))
          :
          <Layout level='3' style={{flex:4, alignItems:'center'}}> 
            <Layout style={styles.rowlayout}>
              {(ii.userAnswer==0)?
              <Button appearance="filled" size='giant' style={styles.button} onPress={this.AnswerChange.bind(this, 0)} >{ii.variants[0]}</Button>:
              <Button appearance="outline" size='giant' style={styles.button} onPress={this.AnswerChange.bind(this, 0)} >{ii.variants[0]}</Button>
              }
              {(ii.userAnswer==1)?
              <Button appearance="filled" size='giant' style={styles.button} onPress={this.AnswerChange.bind(this,1)} >{ii.variants[1]}</Button>:
              <Button appearance="outline" size='giant' style={styles.button} onPress={this.AnswerChange.bind(this,1)} >{ii.variants[1]}</Button>
              }
            </Layout>
            <Layout style={styles.rowlayout}>
              {(ii.userAnswer==2)?
              <Button appearance="filled" size='giant' style={styles.button} onPress={this.AnswerChange.bind(this,2)} >{ii.variants[2]}</Button>:
              <Button appearance="outline" size='giant' style={styles.button} onPress={this.AnswerChange.bind(this,2)} >{ii.variants[2]}</Button>
              }   
              {(ii.userAnswer==3)?
              <Button appearance="filled" size='giant' style={styles.button} onPress={this.AnswerChange.bind(this,3)} >{ii.variants[3]}</Button>:
              <Button appearance="outline" size='giant' style={styles.button} onPress={this.AnswerChange.bind(this,3)} >{ii.variants[3]}</Button>
              }
            </Layout>
          </Layout>
        }
      </Layout>
    );
  };
  
  prevPage = () => {
    if(this.state.header>1){
      this.setState({header:this.state.header-1, sIndex:this.state.sIndex - 1});
    }
  };
  nextPage = () => {
    if(this.state.header<11){
      this.setState({header:this.state.header+1, sIndex:this.state.sIndex + 1});
    }
  };
  selectPage = (number) => {
    console.log(number);
    console.log(this.state.checked);
    this.setState({header:number+1, sIndex:number})
  };

  closeHandle = () => {
    this.props.navigation.navigate('Main');
  };

  submitHandle = () => {
    
    var result=0;
    for (let i = 0; i<this.state.questions.length;i++){
      if(this.state.questions[i].correct==true){
        result = result + 1;
      }
      else{
        this.state.questions[i].variantsStyleWrong[this.state.questions[i].userAnswer]={appearance:"filled", status:'danger'}
      }
    };
    this.setState({result:result, checked:true})
    const  payload = {username: ls.get('phone'), battleId: this.props.route.params.battleId, Answers: this.state.questions, Result: result};
    axios
      .post("GetResultBattle/", payload)
      .then(response =>{
      console.log(response.data)
      })
      .catch(error =>{
      console.log(error);
      });
    // console.log(this.state.questions);
    this.selectPage(10);
   
    // this.props.navigation.navigate('Main')
  }
  render(){
    const { mins, secs } = this.state
    return(
      <SafeAreaView style={{flex:1}}>
        <Layout style={styles.head}>
          <Button size='tiny' onPress={this.prevPage} appearance='ghost' icon={this.renderLeftIcon}></Button>
          <Text category='h5'>{this.state.header<11?"Вопрос "+this.state.header+"/10":"Результат"}</Text>
          <Button size='tiny' onPress={this.nextPage} appearance='ghost' icon={this.renderRightIcon}></Button>
        </Layout>
        <ViewPager style={{flex:13}}
        selectedIndex={this.state.sIndex}
        onSelect={this.selectPage}>
        
        {this.state.questions.map(item=>this.renderPage(item))}
        {this.state.checked?
        <Layout key={0}
          level='3'
          style={styles.tab}>
          <Layout level='1' style={{flex:4, alignItems:'center'}}> 
          { this.state.questions.map((item, key)=>(
            item.correct?
          <Text category='p1' key={key} status='success' >{ key+1 } Правильно</Text>:
          <Text category='p1' key={key} status='danger' >{ key+1 } Неправильно</Text>)
         )}    
          </Layout>
        </Layout>
        :
        <Layout key={0}
          level='3'
          style={styles.tab}>
          <Layout level='3' style={{flex:4, alignItems:'center'}}> 
          { this.state.questions.map((item, key)=>(
            item.userAnswer==null?
          <Text key={key} status='warning' >{ key+1 } Не отвечено</Text>:
          <Text key={key} status='primary' >{ key+1 } Отвечено</Text>)
         )}    
          </Layout>
        </Layout>
        }
        </ViewPager>
        <Layout level='3'>
        {this.state.checked?
          <Button style={{marginHorizontal:20}} size='large' onPress={this.closeHandle} icon={this.renderCloseIcon}  >Закрыть Тест</Button>
        :
          <Button style={{marginHorizontal:20}} {...this.state.submitButton} size='large' onPress={this.submitHandle} icon={this.renderSubmitIcon}  >{`${mins} : ${secs}`}</Button>
        }
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
      margin: 5,
      flex:1,
      fontSize:20,
    },
    hideText:{
  
    },
    questionTop:{
      flex:4,
      alignItems:'center',
      justifyContent:'center',
      // paddingTop:20,
      // paddingBottom:20,
    },
    tab: {
      flex:1,
      // height: deviceHeight/1.,
      paddingHorizontal:20,
      paddingVertical:10,
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
      flex:2,
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