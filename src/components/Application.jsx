import React, { Component } from "react";
import CurrentUser from "./CurrentUser";
import { auth, firestore } from "./firebase";

import Posts from "./Posts";
import SignIn from "./SignIn";
import { collectIdsAndData } from "./utilities";

class Application extends Component {
  state = {
    posts: [],
    user: null,
  };
  // unsubscribe = null;

  handleCreate = async (post) => {
    const docRef = await firestore.collection("posts").add(post);
    const doc = await docRef.get();

    const newPost = {
      id: doc.id,
      ...doc.data(),
    };

    const { posts } = this.state;
    this.setState({ posts: [newPost, ...posts] });
  };

  handleRemove = async (id) => {
    // NEW
    try {
      await firestore.collection("posts").doc(id).delete();
      // const posts = allPosts.filter(post => id !== post.id);
      // this.setState({ posts });
    } catch (error) {
      console.error(error);
    }
  };

  // handleRemove = async (id) => {
  //   // const allPosts = this.state.posts;
  //   // const posts = allPosts.filter((post) => id !== post.id);

  //   // await firestore.doc(`posts/${id}`).delete();

  //   // this.setState({ posts });

  //   try {
  //     await firestore.collection("posts").doc(id).delete();
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  unsubscribeFromFirestore = null;
  unsubscribeFromAuth = null;

  componentDidMount = async () => {
    this.unsubscribeFromFirestore = firestore
      .collection("posts")
      .onSnapshot((snapshot) => {
        const posts = snapshot.docs.map(collectIdsAndData);
        this.setState({ posts });
      });

    this.unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      this.setState({ user });
    });
  };

  componentWillUnmount = () => {
    this.unsubscribeFromFirestore();
    this.unsubscribeFromAuth();
  };

  render() {
    const { posts, user } = this.state;

    return (
      <main className="Application">
        <h1>Think Piece</h1>
        {user ? <CurrentUser {...user} /> : <SignIn />}
        <Posts
          posts={posts}
          onCreate={this.handleCreate}
          onRemove={this.handleRemove}
        />
      </main>
    );
  }
}

export default Application;
