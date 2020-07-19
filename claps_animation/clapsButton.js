import React, { Component } from 'react';
import {  SafeAreaView, Animated, StyleSheet,  ScrollView,  View,  Text,Image,  StatusBar, TouchableOpacity} from 'react-native';
import {  Header,  LearnMoreLinks,  Colors,  DebugInstructions,  ReloadInstructions} from 'react-native/Libraries/NewAppScreen';

export default class ClapsButton extends Component
{
    constructor(props)
    {
        super(props);
        this.state={
            count:0,
            claps:[]
        };
        this.stopclapping=this.stopclapping.bind(this);
        this.keepclapping=this.keepclapping.bind(this);
        this.clapsupdate=this.clapsupdate.bind(this);
    }

    animationComplete(countNum){
        let claps=this.state.claps;
        claps.splice(claps.indexOf(countNum),1);
        this.setState({claps}); 
    }

    clapsupdate()
    {
        let count=this.state.count;
        let claps=this.state.claps;
        count++;
        claps.push(count);
        this.setState({count});
        //console.log(count);
        //console.log(claps);
    }

    keepclapping()
    {
        this.claptimer=setInterval(() => {
            this.clapsupdate()
        }, 300);
    }

    stopclapping()
    {
        if(this.claptimer)
        {
            clearInterval(this.claptimer)
        }
    }

    renderClaps()
    {
        return this.state.claps.map(countNum => <Clapbubble key={countNum} count={countNum}  animationComplete={this.animationComplete.bind(this)} /> )
    }

    render()
    {
        let clapicon=this.state.count>0? 
            <Image source={require('./applaused.png')}
                style={{height:25,width:25}} />
            :
            <Image source={require('./applause.png')}
                style={{height:25,width:25}} />
            
        return(
            <View style={style.container}>
              <StatusBar barStyle="dark-content" backgroundColor={'#D3D3D3'}/>
                <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
                    <Text>
                        Clap animation by Priyanshu Mittal
                    </Text>
                </View>
                <TouchableOpacity style={style.clapbutton} 
                    onPress={this.clapsupdate} 
                    onLongPress={this.keepclapping} 
                    onPressOut={this.stopclapping}
                    activeOpacity={0.7}>
                    {clapicon}
                </TouchableOpacity>
                {this.renderClaps()}           
            </View>
        );
    }
}

class Clapbubble extends Component
{
    constructor(props) {
        super(props);
    
        this.state = {
          yPosition: new Animated.Value(0),
          opacity: new Animated.Value(0)
        };
      }

      componentDidMount() {
        Animated.parallel([
          Animated.timing(this.state.yPosition, {
            toValue: -120,
            duration: 500,
            useNativeDriver: true
          }),
          Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
          })
        ]).start(()=>{
                setTimeout(()=>{
                    this.props.animationComplete(this.props.count);
                },300);
        });
      }

    render() {
        let animationStyle = {
          transform: [{ translateY: this.state.yPosition }],
          opacity: this.state.opacity
        };
        return (
            <Animated.View style={[animationStyle, style.clapbubble]} >
                <Text style={style.claptext}>+ {this.props.count}</Text>
            </Animated.View>
        );
      }
}

const style= StyleSheet.create({
    container:
    {
        flex:1,
        backgroundColor:'white'
    },
    clapbutton:{
        position:"absolute",
        zIndex: 1,
        height:60,
        width:60,
        borderRadius:30,
        backgroundColor:'#D3D3D3',
        bottom:20,
        right:20,
        elevation:10,
        justifyContent:'center',
        alignItems:'center'
    },
    clapbubble:{
        position:"absolute",
        height:60,
        width:60,
        bottom:20,
        right:20,
        borderRadius:30,
        backgroundColor:'#D3D3D3',
        justifyContent:'center',
        alignItems:'center'
    },
    claptext:{
        fontSize:15
    }
})