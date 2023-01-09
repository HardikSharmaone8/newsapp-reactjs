import React, { Component } from "react";
import NewsApi from "./NewsApi";
import axios from "axios";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

export class Home extends Component {
  static defaultProps = {
    query: "general",
  };
  static propTypes = {
    query: PropTypes.string,
  };

  constructor() {
    super();

    this.state = {
      news: [], //news property contains the news results
      page: 1, //this property use to change the page numbers
      totalpage: "", //this property contain total number of our api data responce
      loading: false,
    };
  }

  //this method is life cycle method this method autometically run after the render method and this method always exucuted
  async componentDidMount() {
    document.title = `${this.props.query} - Time of News`;
    this.setState({
      loading: true,
    });
    var res = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&category=${this.props.query}&apiKey=9c399ac2f5454479b886dfecb0f6b816&page=1&pageSize=10
      `
    );
    // console.log("responce", res);
    var len_of_pages = Math.ceil(res.data.totalResults / 10);
    console.log("total result", res.data.totalResults);
    this.setState({
      news: res.data.articles,
      page: 1,
      totalpage: len_of_pages,
      loading: false,
    });
  }

  // when use click on prev or next button than this statement will be exucuted
  async next_prev(i) {
    if (
      this.state.page + i > this.state.totalpage ||
      this.state.page + 1 == 1
    ) {
      //we do nothing if our pages are greater than total pages or less than 1 page
    } else {
      this.setState({
        loading: true,
      });
      var res = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&category=${
          this.props.query
        }&apiKey=9c399ac2f5454479b886dfecb0f6b816&page=${
          this.state.page + i
        }&pageSize=10`
      );
      //when res give responce of api than we update everytime our state
      this.setState({
        news: this.state.news.concat(res.data.articles),
        page: this.state.page + i,
        totalpage: this.state.totalpage,
        loading: false,
      });
    }
  }

  fetchMoreData(i) {
    this.next_prev(i);
  }

  render() {
    return (
      <>
        <center>
          <h1 style={{ marginBottom: "50px" }}>
            Times Of News - Top {this.props.query} Headlines
          </h1>
        </center>

        <InfiniteScroll
          dataLength={this.state.page}
          next={() => this.fetchMoreData(1)}
          hasMore={this.state.page != this.state.totalpage}
          loader={this.state.loading && <Spinner />}
          endMessage={
            <h3 style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </h3>
          }
        >
          <div className="news_container">
            {this.state.news.map((value, index) => {
              if (value.description != null) {
                return (
                  <NewsApi
                    key={index}
                    image={value.urlToImage}
                    title={value.title}
                    description={value.description}
                    author={value.author}
                    source={value.source.name}
                    time={value.publishedAt}
                    url={value.url}
                  />
                );
              }
            })}
          </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default Home;
