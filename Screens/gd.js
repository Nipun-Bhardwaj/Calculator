require("../lib/swisscalc.lib.format.js");
require("../lib/swisscalc.lib.operator.js");
require("../lib/swisscalc.lib.operatorCache.js");
require("../lib/swisscalc.lib.shuntingYard.js");
require("../lib/swisscalc.display.numericDisplay.js");
require("../lib/swisscalc.display.memoryDisplay.js");
require("../lib/swisscalc.calc.calculator.js");

import React from "react";
import { StyleSheet, Dimensions, PanResponder, View, Text } from "react-native";
import { CalcDisplay, CalcButton } from "./../components";

export default class gd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      display: "0",
      orientation: "portrait", // "portrait" or "landscape"
    };

    // Initialize calculator...
    this.oc = global.swisscalc.lib.operatorCache;
    this.calc = new global.swisscalc.calc.calculator();

    // Listen for orientation changes...
    Dimensions.addEventListener("change", () => {
      const { width, height } = Dimensions.get("window");
      var orientation = width > height ? "landscape" : "portrait";
      this.setState({ orientation: orientation });
    });

    // Setup gestures...
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderMove: (evt, gestureState) => {},
      onPanResponderRelease: (evt, gestureState) => {
        if (Math.abs(gestureState.dx) >= 50) {
          this.onBackspacePress();
        }
      },
    });
  }

  onDigitPress = (digit) => {
    this.calc.addDigit(digit);
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onUnaryOperatorPress = (operator) => {
    this.calc.addUnaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onBinaryOperatorPress = (operator) => {
    this.calc.addBinaryOperator(operator);
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onEqualsPress = () => {
    this.calc.equalsPressed();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onClearPress = () => {
    this.calc.clear();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onPlusMinusPress = () => {
    this.calc.negate();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  onBackspacePress = () => {
    this.calc.backspace();
    this.setState({ display: this.calc.getMainDisplay() });
  };

  renderPortrait() {
    return (
      <View style={{ backgroundColor: "black", flex: 1 }}>
        <View style={styles.displayContainer}>
          <CalcDisplay display={showDispay} />
        </View>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <Buttons
              title={"C"}
              style={styles.scContainer}
              color={{ color: "white" }}
              pressHandler={this.onClearPress}
            />
            <Buttons
              title={"+/-"}
              style={styles.scContainer}
              color={{ color: "white" }}
              pressHandler={this.onPlusMinusPress}
            />
            <Buttons
              title={"%"}
              style={styles.scContainer}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onUnaryOperatorPress(this.oc.PercentOperator);
              }}
            />
            <Buttons
              title={"/"}
              style={styles.signContainer}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onBinaryOperatorPress(this.oc.DivisionOperator);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Buttons
              title={"7"}
              style={styles.container}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress("8");
              }}
            />
            <Buttons
              title={"8"}
              style={styles.container}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress("8");
              }}
            />
            <Buttons
              title={"9"}
              style={styles.container}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress("9");
              }}
            />
            <Buttons
              title={"x"}
              style={styles.signContainer}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onBinaryOperatorPress(this.oc.MultiplicationOperator);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Buttons
              title={"4"}
              style={styles.container}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress("4");
              }}
            />
            <Buttons
              title={"5"}
              style={styles.container}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress("5");
              }}
            />
            <Buttons
              title={"6"}
              style={styles.container}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress("6");
              }}
            />
            <Buttons
              title={"-"}
              style={styles.signContainer}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onBinaryOperatorPress(this.oc.SubtractionOperator);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Buttons
              title={"1"}
              style={styles.container}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress("1");
              }}
            />
            <Buttons
              title={"2"}
              style={styles.container}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress("2");
              }}
            />
            <Buttons
              title={"3"}
              style={styles.container}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress("3");
              }}
            />
            <Buttons
              title={"+"}
              style={styles.signContainer}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onBinaryOperatorPress(this.oc.AdditionOperator);
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Buttons
              title={"0"}
              style={[styles.container, { flex: 2 }]}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress("0");
              }}
            />
            <Buttons
              title={"."}
              style={styles.signContainer}
              color={{ color: "white" }}
              pressHandler={() => {
                this.onDigitPress(".");
              }}
            />
            <Buttons
              title={"="}
              style={styles.signContainer}
              color={{ color: "white" }}
              pressHandler={this.onEqualsPress}
            />
          </View>
        </View>
      </View>
    );
  }

  renderLandscape() {
    return (
      <View>
        <Text>Landscape</Text>
      </View>
    );
  }

  render() {
    var view =
      this.state.orientation == "portrait"
        ? this.renderPortrait()
        : this.renderLandscape();

    return <View style={{ flex: 1 }}>{view}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#607D8B",
  },
  signContainer: {
    backgroundColor: "#DCA394",
  },
  scContainer: {
    backgroundColor: "#DCC894",
  },
  buttonsContainer: {
    paddingBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  displayContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
});
