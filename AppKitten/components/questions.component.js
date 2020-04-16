import React ,{useEffect} from 'react';
import {Dimensions, SafeAreaView, StyleSheet, Alert} from 'react-native';
import { RadioGroup, Radio, ViewPager, Divider, Icon, List, ListItem, BottomNavigation, BottomNavigationTab,Button, Layout, Text } from '@ui-kitten/components';




export class QuestionsScreen extends React.Component {
  state={
    questions:null,
    header:1,
    sIndex:0,
    started: true,
    outlinedButton:{appearance:'outline' },
    filledButton:{appearance:'filled' },
    checked:false,
    result:0,
  };


  UNSAFE_componentWillMount() {
    if(this.state.started){
      console.log('staaaaart');
      var shuffle = require('shuffle-array');
      const questions = this.props.route.params;  
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
      this.setState({started:false});
      this.setState({questions:questions});
      console.log(questions);
      console.log('eeeeeeeeeeeennnndddddd');

    }else{
      console.log("elseeeeee")
    };
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
    if(this.state.checked){
      this.setState({header:this.state.header-1});
      this.setState({sIndex:this.state.sIndex - 1});
    }else if(this.state.header>1){
      this.setState({header:this.state.header-1});
      this.setState({sIndex:this.state.sIndex - 1});
    }
  };
  nextPage = () => {
    if(this.state.checked){
      this.setState({header:this.state.header+1});
      this.setState({sIndex:this.state.sIndex + 1});
    }
    else if(this.state.header<10){
      this.setState({header:this.state.header+1});
      this.setState({sIndex:this.state.sIndex + 1});
    }
  };
  selectPage = (number) => {
    console.log(number);
    if(number>=0){
      if(!this.state.checked && number<=9)
        this.setState({header:number+1});
        this.setState({sIndex:number});
      if(this.state.checked)
      this.setState({header:number+1});
        this.setState({sIndex:number});

    }
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
    this.setState({result:result})
    this.setState({checked:true});
    // console.log(this.state.questions);
    
    Alert.alert("У тебя " + result.toString() + " правильных ответов из 10");
    // this.props.navigation.navigate('Main')
  }
  render(){
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
          {/* <Layout style={styles.questionTop}>
            <Text category='h5'>Результат</Text>
          </Layout> */}
          <Layout level='3' style={{flex:4, alignItems:'center'}}> 
          { this.state.questions.map((item, key)=>(
            item.correct?
          <Text key={key} style={{color:'green'}} >{ key+1 } Правильно</Text>:
          <Text key={key} style={{color:'red'}} >{ key+1 } Неправильно</Text>)
         )}    
          </Layout>
        </Layout>
        :[]
        }
        </ViewPager>
        <Layout level='3'>
        {this.state.checked?
          <Button style={{marginHorizontal:20}} size='large' onPress={this.submitHandle} icon={this.renderSubmitIcon}  >{this.state.result}/10 правильных</Button>
        :
          <Button style={{marginHorizontal:20}} size='large' onPress={this.submitHandle} icon={this.renderSubmitIcon}  >Проверить</Button>
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