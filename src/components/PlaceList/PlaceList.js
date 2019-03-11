import React, { Component } from "react";
import { StyleSheet, FlatList } from "react-native";
import ListItem from "../ListItem/ListItem";
import { SearchBar } from "react-native-elements";

export default class placeList extends Component {
  constructor(props) {
    super(props);
    this.state = { data: this.props.places };
  }
  searchFilterFunction = text => {
    this.setState({
      value: text
    });

    const newData = this.props.places.filter(item => {
      const itemData = `${item.name.toUpperCase()}`;
      const textData = text.toUpperCase();

      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      data: newData
    });
    console.log("thius", this.props.places);
  };
  renderHeader = () => {
    return (
      <SearchBar
        placeholder="Type Here..."
        lightTheme
        round
        onChangeText={text => this.searchFilterFunction(text)}
        autoCorrect={false}
        value={this.state.value}
      />
    );
  };
  render() {
    return (
      <FlatList
        style={styles.listContainer}
        data={this.state.data}
        renderItem={info => (
          <ListItem
            placeName={info.item.name}
            placeImage={info.item.image}
            onItemPressed={() => this.props.onItemSelected(info.item.key)}
          />
        )}
        ListHeaderComponent={this.renderHeader}
      />
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    width: "100%"
  }
});
