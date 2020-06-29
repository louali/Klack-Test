import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import "./index.css";
import { Card, Avatar } from "antd";
import InfiniteScroll from "react-infinite-scroll-component";

const { Meta } = Card;

class App extends React.Component {
  state = {
    users: []
  };

  componentDidMount() {
    fetch("https://api.github.com/users")
      .then(res => res.json())
      .then(users => this.setState({ users: this.state.users.concat(users) }));
  }
  fetchMoreData = () => {
    let lastid = this.state.users[this.state.users.length - 1].id;
    fetch("https://api.github.com/users?since=" + lastid)
      .then(res => res.json())
      .then(users => this.setState({ users: this.state.users.concat(users) }));
  };

  render() {
    return (
      <div>
        <h1> Github Users </h1>
        <InfiniteScroll
          dataLength={this.state.users.length}
          next={this.fetchMoreData}
          hasMore={true}
          loader={<h4>Loading...</h4>}
        >
          {this.state.users.map((user, index) => (
            <Card key={user.id} style={{ width: "50%" }}>
              <Meta
                avatar={<Avatar src={user.avatar_url} />}
                title={user.login}
                description={user.html_url}
              />
            </Card>
          ))}
        </InfiniteScroll>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));