import * as React from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Animated
} from "react-native";

export default class ClapBubble extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      yPosition: new Animated.Value(0),
      opacity: new Animated.Value(0),
      count: 0,
      claps: []
    };
  }
  componentDidMount() {
    Animated.parallel([
      Animated.timing(this.state.yPosition, {
        toValue: -150,
        duration: 500
      }),
      Animated.timing(this.state.opacity, {
        toValue: 1,
        duration: 500
      })
    ]).start();
  }
  render() {
    let animationStyle = {
      transform: [{ translateY: this.state.yPosition }],
      opacity: this.state.opacity
    };
    return (
      <Animated.View style={[animationStyle, styles.clapbubble]}>
        <Text style={styles.clapText}>+1</Text>
      </Animated.View>
    );
  }
}
const styles = StyleSheet.create({
  clapbubble: {
    elevation: 4,
    backgroundColor: "#55BE6F",
    position: "absolute",
    height: 60,
    width: 60,
    borderRadius: 30,
    bottom: 20,
    right: 20,
    justifyContent: "center",
    alignItems: "center"
  },
  clapText: {
    color: "white",
    fontSize: 20
  }
});