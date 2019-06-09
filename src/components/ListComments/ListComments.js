import React, { Component, PropTypes } from "react";
import { RefreshControl, ScrollView, StyleSheet, View } from "react-native";
import Comment from "../Comment/Comment";
import Input from "../InputComment/InputComment";
import { connect } from "react-redux";
import { updatePlaceComments } from "../../store/actions";

class ListOfComments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments, // array for comments fetched from the API backend
      refreshing: true // whether comments list is being refreshed or not
    };
  }
  // Fetch comments when component is about to mount
  componentDidUpdate() {
    this.props.onAddComments(this.props.keie, this.state.comments);
  }
  submitComment = async text => {
    const { user } = this.props;
    let comment = {
      content: text,
      created: Date.now(),
      user: user
    };

    this._scrollView.scrollTo({ y: 0 });
    this.setState({
      // Push new comment to state before existing ones
      comments: [...this.state.comments, comment]
    });
  };

  render() {
    console.log("this is comments", this.state.comments);
    // Pull comments out of state
    const { comments } = this.state;
    return (
      <View style={styles.container}>
        <Input onSubmit={this.submitComment} />
        {/* Scrollable list */}
        <ScrollView
          ref={scrollView => {
            this._scrollView = scrollView;
          }}
        >
          {/* Render each comment with Comment component */}
          {comments.map((comment, index) => (
            <Comment comment={comment} key={index} />
          ))}
        </ScrollView>
        {/* Comment input box */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF",
    paddingTop: 20
  }
});

const mapDispatchToProps = dispatch => {
  return {
    onAddComments: (key, comments) =>
      dispatch(updatePlaceComments(key, comments))
  };
};
export default connect(
  null,
  mapDispatchToProps
)(ListOfComments);
