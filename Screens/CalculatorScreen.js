require("./../lib/swisscalc.lib.format.js");
require("./../lib/swisscalc.lib.operator.js");
require("./../lib/swisscalc.lib.operatorCache.js");
require("./../lib/swisscalc.lib.shuntingYard.js");
require("./../lib/swisscalc.display.numericDisplay.js");
require("./../lib/swisscalc.display.memoryDisplay.js");
require("./../lib/swisscalc.calc.calculator.js");
import { useState } from "react";
import { Text, View, StyleSheet } from "react-native";
import Buttons from "../Components/Buttons.js";
import CalcDisplay from "../Components/CalcDisplay.js";

function CalculatorScreen() {
  const [showDispay, setShowDisplay] = useState("0");
  var oc = global.swisscalc.lib.operatorCache;
  var calc = new global.swisscalc.calc.calculator();

  function pressHandler(digit) {
    calc.addDigit(digit);

    console.log(calc.getMainDisplay());
    setShowDisplay(calc.getMainDisplay());
  }

  function clearHandler() {
    calc.clear();
    setShowDisplay(calc.getMainDisplay());
  }

  function onPlusMinusPress() {
    calc.negate();
    setShowDisplay(calc.getMainDisplay());
  }

  function onBackspacePress() {
    calc.backspace();
    setShowDisplay(calc.getMainDisplay());
  }

  function onUnaryOperatorPress(operator) {
    calc.addUnaryOperator(operator);
    setShowDisplay(calc.getMainDisplay());
  }

  function onBinaryOperatorPress(operator) {
    calc.addBinaryOperator(operator);
    setShowDisplay(calc.getMainDisplay());
  }

  function onEqualsPress() {
    calc.equalsPressed();
    console.log(calc.getMainDisplay());
    setShowDisplay(calc.getMainDisplay());
  }

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
            pressHandler={clearHandler}
          />
          <Buttons
            title={"+/-"}
            style={styles.scContainer}
            color={{ color: "white" }}
            pressHandler={onPlusMinusPress}
          />
          <Buttons
            title={"%"}
            style={styles.scContainer}
            color={{ color: "white" }}
            pressHandler={onUnaryOperatorPress.bind("this", oc.PercentOperator)}
          />
          <Buttons
            title={"/"}
            style={styles.signContainer}
            color={{ color: "white" }}
            pressHandler={onBinaryOperatorPress.bind(
              "this",
              oc.DivisionOperator
            )}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Buttons
            title={"7"}
            style={styles.container}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", "7")}
          />
          <Buttons
            title={"8"}
            style={styles.container}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", "8")}
          />
          <Buttons
            title={"9"}
            style={styles.container}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", "9")}
          />
          <Buttons
            title={"x"}
            style={styles.signContainer}
            color={{ color: "white" }}
            pressHandler={onBinaryOperatorPress.bind(oc.MultiplicationOperator)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Buttons
            title={"4"}
            style={styles.container}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", "4")}
          />
          <Buttons
            title={"5"}
            style={styles.container}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", "5")}
          />
          <Buttons
            title={"6"}
            style={styles.container}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", "6")}
          />
          <Buttons
            title={"-"}
            style={styles.signContainer}
            color={{ color: "white" }}
            pressHandler={onBinaryOperatorPress.bind(oc.SubtractionOperator)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Buttons
            title={"1"}
            style={styles.container}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", "1")}
          />
          <Buttons
            title={"2"}
            style={styles.container}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", "2")}
          />
          <Buttons
            title={"3"}
            style={styles.container}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", "3")}
          />
          <Buttons
            title={"+"}
            style={styles.signContainer}
            color={{ color: "white" }}
            pressHandler={onBinaryOperatorPress.bind(oc.AdditionOperator)}
          />
        </View>
        <View style={styles.buttonContainer}>
          <Buttons
            title={"0"}
            style={[styles.container, { flex: 2 }]}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", "0")}
          />
          <Buttons
            title={"."}
            style={styles.signContainer}
            color={{ color: "white" }}
            pressHandler={pressHandler.bind("this", ".")}
          />
          <Buttons
            title={"="}
            style={styles.signContainer}
            color={{ color: "white" }}
            pressHandler={onEqualsPress}
          />
        </View>
      </View>
    </View>
  );
}
export default CalculatorScreen;

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
