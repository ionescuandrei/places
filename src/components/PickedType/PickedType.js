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
          <Text style={styles.text}>Cuzine</Text>
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
            <Picker.Item label="Mixt" value="mixt" />
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
    justifyContent: "space-between"
  },
  picker: {
    width: 150,
    height: 50
  },
  text: {
    fontSize: 18,
    fontWeight: "bold"
  },
  textView: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20
  },
  pickerView: {
    flex: 1
  }
});
