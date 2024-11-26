import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react';

interface IHomeScreenProps{

}

const HomeScreen:React.FC<IHomeScreenProps> = ({}) => {
  return (
    <SafeAreaView style={styles.wrapper}>
    <Text style={styles.text}>REMOTE PUSH NOTIFICATIONS TEST</Text>
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  buttonsWrapper: {
    marginTop: 50,
  },
  buttonWrapper: {
    marginBottom: 20,
  },
  text:{
    color:'red',
    fontSize:18,
    textAlign:'center',
    textDecorationStyle:'dotted'
  }
 });

export default HomeScreen;