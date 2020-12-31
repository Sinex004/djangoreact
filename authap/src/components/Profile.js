import React, { Component } from 'react';
import {ScrollView, View, StyleSheet, Text, TextInput,Button, ActionSheetIOS } from 'react-native';
import { Actions } from 'react-native-router-flux';


class Profile extends Component {
    state={
        usertypecode: '',
        username: '',
        password: '',
        
    };
    handleRequest(){
        
    }
    onTextChange(text){
        this.setState({usertypecode: text})
    }
    ToHome(){
        Actions.main()
    }
    render() {
        const {
            formContainerStyle,
            fieldStyle,
            textInputStyle,
            buttonContainerStyle,
            accountCreateContainerStyle
          } = styles;

        return (
            <View style={formContainerStyle}>
                <View style={fieldStyle}>
                    <Text>
                        Имя:
                    </Text>
                    <TextInput
                        placeholder="Имя"
                        autoCorrect={false}
                        autoCapitalize='words'
                        onChangeText={this.onTextChange.bind(this)}
                        style={textInputStyle}
                    />
                </View>
                <View style={fieldStyle}>

                    <Text >
                        Фамилия:
                    </Text>
                    <TextInput
                        placeholder="Фамилия"
                        autoCorrect={false}
                        autoCapitalize="words"
                        onChangeText={this.onTextChange.bind(this)}
                        style={textInputStyle}
                    />
                </View>
                <View style={fieldStyle}>
                    <Text>
                        Школа:
                    </Text>
                    <TextInput
                        placeholder="Школа"
                        autoCorrect={false}
                        autoCapitalize="words"
                        onChangeText={this.onTextChange.bind(this)}
                        style={textInputStyle}
                    />
                </View>
                <View style={fieldStyle}>
                    <Text >
                        Город:
                    </Text>
                    <TextInput
                        placeholder="Город"
                        autoCorrect={false}
                        autoCapitalize="words"
                        onChangeText={this.onTextChange.bind(this)}
                        style={textInputStyle}
                    />
                </View>
                <View style={fieldStyle}>
                    <Text >
                        День рождения:
                    </Text>
                    <TextInput
                        placeholder="День рождения"
                        autoCorrect={false}
                        
                        autoCapitalize="words"
                        onChangeText={this.onTextChange.bind(this)}
                        style={textInputStyle}
                    />
                </View>
                <Button title="Сохранить" onPress={this.handleRequest.bind(this)} />
                <Button title="Назад" onPress={this.ToHome.bind(this)} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    formContainerStyle: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
        // justifyContent: 'center',
        padding: 20
    },
    textInputStyle: {
        flex: 1,
        width:100,
        padding: 10
    },
    fieldStyle: {
        flexDirection: 'row',
        justifyContent: 'flex-start'
    },
    buttonContainerStyle: {
        flex: 1,
        justifyContent: 'center',
        padding: 25
    },
    accountCreateTextStyle: {
        color: 'black'
    },
    accountCreateContainerStyle: {
        padding: 25,
        alignItems: 'center'
    }
  });

export default Profile;
