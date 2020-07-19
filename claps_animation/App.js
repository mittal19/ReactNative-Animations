import React,{Component} from 'react';
import {  SafeAreaView,  StyleSheet,  ScrollView,  View,  Text,  StatusBar} from 'react-native';
import {  Header,  LearnMoreLinks,  Colors,  DebugInstructions,  ReloadInstructions} from 'react-native/Libraries/NewAppScreen';
import ClapsButton from './clapsButton';

export default class App extends Component
{
  render()
  {
    return(
      <View style={style.container}>
        <ClapsButton />
      </View>
    );
  }
}

const style= StyleSheet.create({
  container:
  {
      flex:1,
      backgroundColor:'#000000'
  }
});