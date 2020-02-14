import React, { useState } from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity } from 'react-native';

export default function App() {
  const [resultText, setResultText] = useState('');
  const [calculationText, setCalculationText] = useState('');
  let operations = ['Del', '+', '-', '*', '/'];

  const calculateResult = text => {
    setCalculationText(eval(resultText));
  };

  const validate = () => {
    const text = resultText;
    switch (text.slice(-1)) {
      case '+':
      case '-':
      case '*':
      case '/':
        return false;
    }
    return true;
  };

  const buttonPressed = text => {
    if (text === '=') {
      validate() && calculateResult(resultText);
    } else {
      setResultText(resultText + text);
    }
  };

  const operate = operation => {
    switch (operation) {
      case 'Del':
        let text = resultText.split('');
        text.pop();
        setResultText(text.join(''));
        break;
      case '+':
      case '-':
      case '*':
      case '/':
        const lastChar = resultText.split('').pop();
        if (operations.indexOf(lastChar) > 0) return;
        if (resultText === '') return;
        setResultText(resultText + operation);
    }
  };
  // const calculateResult
  let rows = [];
  let nums = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    ['.', 0, '=']
  ];
  for (let i = 0; i < 4; i++) {
    let row = [];
    for (let j = 0; j < 3; j++) {
      row.push(
        <TouchableOpacity
          key={nums[i][j]}
          onPress={() => buttonPressed(nums[i][j])}
          style={styles.btn}
        >
          <Text style={styles.btnText}>{nums[i][j]}</Text>
        </TouchableOpacity>
      );
    }
    rows.push(<View style={styles.row}>{row}</View>);
  }

  let ops = [];
  for (let i = 0; i < 5; i++) {
    ops.push(
      <TouchableOpacity
        key={operations[i]}
        style={styles.btn}
        onPress={() => operate(operations[i])}
      >
        <Text style={(styles.btnText, styles.white)}>{operations[i]}</Text>
      </TouchableOpacity>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text style={styles.resultText}>{resultText}</Text>
      </View>
      <View style={styles.calculation}>
        <Text style={styles.calculationText}>{calculationText}</Text>
      </View>
      <View style={styles.buttons}>
        <View style={styles.numbers}>{rows}</View>
        <View style={styles.operations}>{ops}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  btnText: {
    fontSize: 30,
    color: 'white'
  },
  white: {
    color: 'white'
  },
  btn: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'stretch'
  },
  resultText: {
    fontSize: 30,
    color: 'black'
  },
  calculationText: {
    fontSize: 24,
    color: 'black'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  result: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white'
  },
  calculation: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-end',
    backgroundColor: 'white'
  },
  buttons: {
    flexGrow: 7,
    flexDirection: 'row'
  },
  numbers: {
    flex: 3,
    backgroundColor: '#5f6a73'
  },
  operations: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'stretch',
    backgroundColor: '#32393f'
  }
});
