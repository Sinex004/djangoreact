import React from 'react';
import { SafeAreaView, StyleSheet} from 'react-native';
import {Autocomplete, AutocompleteItem, Divider,Input, Icon, Layout, Text, TopNavigationAction, Button } from '@ui-kitten/components';
import ls from'local-storage';
import axios from 'axios';
const BackIcon = (style) => (
  <Icon {...style} name='arrow-back' />
);
// const cities = [
//   { title: 'Алмата' },
//   { title: 'Нур-Султан' },
//   { title: 'Караганда' },
//   { title: 'Шымкент' },
//   { title: 'Тараз' },
// ];

export const DetailsScreen = ({ navigation }) => {
  const filter = (item, query) => item.title.toLowerCase().includes(query.toLowerCase());
  // const navigateBack = () => {
  //   navigation.goBack();
  // };
  
  
  const BackAction = () => (
    <TopNavigationAction icon={BackIcon} onPress={navigateBack}/>
  );
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [city, setCity] = React.useState(null);
  const [school, setSchool] = React.useState('');
  // const [data2, setData2] = React.useState(cities);

  const [value, setValue] = React.useState(null);
  const [data, setData] = React.useState(movies);

  const onSelect = (index) => {
    setValue(movies[index].title);
  };

  const onChangeText = (query) => {
    setValue(query);
    setData(movies.filter(item => filter(item, query)));
  };

  const renderOption = (item, index) => (
    <AutocompleteItem
      key={index}
      title={item.title}
    />
  );

  // const onChangeText2 = (query) => {
  //   setCity(query);
  //   setData(cities.filter(item => filter(item, query)));
  // };
  // const onSelect2 = (index) => {
  //   setCity(cities[index].title);
  // };
  // const renderOption2 = (item, index) => (
  //   <AutocompleteItem
  //     key={index}
  //     title={item.title}
  //   />
  // );

  const buttonSave = () =>{
    const payload = {username: ls.get('phone'),name:name,surname:surname,city:city,school:school}
    // axios
    //   .get('/FirstEnter/')
    //   .then(response =>{
        
    //   })
    //   .catch(error=>{
    //     console.log(error)
    //   }); 
    navigation.reset({
      index: 0,
      routes: [{ name: 'Main' }],
    });
  }

  return (
    // <SafeAreaView style={{ flex: 1, marginTop:20 }}>
    <Layout>
      <Layout style={{flexDirection:'row', justifyContent:'center'}}>
      <Text style={{margin:5}}  category='h5'>Профиль</Text>
      </Layout>
      <Divider/>
      <Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='success' category='h6'>Введите фамилию:</Text>
          <Input
              placeholder="Фамилия"
              autoCorrect={false}
              value={surname}
              status='success'
              autoCapitalize='words'
              onChangeText={nextValue => setSurname(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='danger' category='h6'>Введите имя:</Text>
          <Input
              placeholder="Имя"
              autoCorrect={false}
              status='danger'
              value={name}
              autoCapitalize='words'
              onChangeText={nextValue => setName(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='warning' category='h6'>Введите город:</Text>
          <>
          <Autocomplete
            placeholder='Place your Text'
            value={value}
            onChangeText={onChangeText}
            onSelect={onSelect}
            >
          {data.map(renderOption)}

          </Autocomplete>

          </>
        </Layout>
        <Layout style={styles.fieldStyle}>
          <Text status='info' category='h6'>Введите школу:</Text>
          <Input
              placeholder="Школа"
              autoCorrect={false}
              status='info'
              value={school}
              autoCapitalize='words'
              onChangeText={nextValue => setSchool(nextValue)}
              style={styles.textInputStyle}
          />
        </Layout>
        <Button onPress={buttonSave} size='medium' >Сохранить</Button>
      </Layout>
      </Layout>
    // </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  fieldStyle: {
    flexDirection: 'column',
    // alignItems: 'center',
    margin:10,
  },
  textInputStyle: {
    paddingTop:5,
  },
});