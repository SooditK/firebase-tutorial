import React, { Component } from "react";

import Post from "./Post";
import Comments from "./Comments";
import { firestore } from "../firebase";
import { collectIdsAndData } from "./utilities";
import { withRouter } from "react-router";
import withUser from "./withUser";

class PostPage extends Component {
  state = { post: null, comments: [] };

  get postId() {
    return this.props.match.params.id;
  }

  get postRef() {
    return firestore.doc(`posts/${this.postId}`);
  }

  get commentsRef() {
    return this.postRef.collection("comments");
  }

  unsubscribeFromPost = null;
  unsubscribeFromComment = null;

  componentDidMount = () => {
    this.unsubscribeFromPost = this.postRef.onSnapshot((snapshot) => {
      const post = collectIdsAndData(snapshot);
      this.setState({ post });
    });

    this.unsubscribeFromComment = this.commentsRef.onSnapshot((snapshot) => {
      const comments = collectIdsAndData(snapshot);
      this.setState({ comments });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromComment();
    this.unsubscribeFromPost();
  };

  createComment = (comment) => {
    const { user } = this.props;
    this.commentsRef.add({
      ...comment,
      user,
    });
  };

  render() {
    const { post, comments } = this.state;
    console.log(this.prosp);

    return (
      <section>
        {post && <Post {...post} />}
        <Comments comment={comments} onCreate={this.createComment} />
      </section>
    );
  }
}

export default withRouter(withUser(PostPage));
