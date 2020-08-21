import React from 'react';
import {View, StyleSheet} from 'react-native';
import { Text, Spinner } from '@ui-kitten/components';


export class SplashScreen extends React.Component {
    render() {  
      return (
        <View style={styles.container}>
          <Spinner style={{width:100,height:100}} size='giant'/>
        </View>
      );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'orange',
    },
    
});