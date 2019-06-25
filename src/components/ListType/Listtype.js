import React, { Component } from "react";
import { StyleSheet, FlatList, View, Text } from "react-native";
import ListItem from "../ListItem/ListItem";

export default class ListType extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View>
        <FlatList
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          legacyImplementation={false}
          style={styles.listContainer}
          data={this.props.places}
          renderItem={info => (
            <ListItem
              placeName={info.item.name}
              placeImage={info.item.image}
              placeType={info.item.type}
              placeRating={info.item.rating.value / info.item.rating.count}
              onItemPressed={() => this.props.onItemSelected(info.item.key)}
            />
          )}
          // ListHeaderComponent={this.renderHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerHeader: {
    flex: 1
  },
  listContainer: {
    flex: 1
  },
  textName: {
    fontSize: 22,
    fontWeight: "600"
  },
  wrapper: {
    display: "flex"
  },
  titleWrapper: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 21,
    paddingRight: 21
  }
});
