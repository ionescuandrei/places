import React, { Component } from "react";
import { View, Text, Picker, StyleSheet } from "react-native";

export default class PickedType extends Component {
  constructor(props) {
    super(props);
    this.state = { timpDeRestaurant: null };
  }
  onTypePicked = (itemValue, itemIndex) => {
    this.setState({ timpDeRestaurant: itemValue });
    this.props.onTypePickedProp(itemValue);
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.textView}>
          <Text style={styles.text}> Specific</Text>
        </View>
        <View style={styles.pickerView}>
          <Picker
            selectedValue={this.state.timpDeRestaurant}
            style={styles.picker}
            onValueChange={this.onTypePicked}
          >
            <Picker.Item label="Italian" value="italian" />
            <Picker.Item label="Chinez" value="chinez" />
            <Picker.Item label="Grecesc" value="grecesc" />
            <Picker.Item label="Romanesc" value="romanesc" />
            <Picker.Item label="Sarbesc" value="sarbesc" />
            <Picker.Item label="Frantuzesc" value="frantuzesc" />
            <Picker.Item label="Rusesc" value="rusesc" />
            <Picker.Item label="Bulgaresc" value="bulgaresc" />
            <Picker.Item label="Unguresc" value="unguresc" />
            <Picker.Item label="Oriental" value="oriental" />
            <Picker.Item label="Toate" value="mixt" />
          </Picker>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  picker: {
    width: 150,
    height: 20
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  },
  textView: {
    flex: 1,

    paddingLeft: 20
  },
  pickerView: {
    flex: 1
  }
});
