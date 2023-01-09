import React, { Component } from "react";

export class NewsApi extends Component {
  render() {
    var { image, title, description, author, time, url, source } = this.props;
    var index = time.split("T");
    var date = index[0];
    var time = index[1];
    return (
      <div className="card" style={{ width: "18rem" }}>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {source}
          <span className="visually-hidden">unread messages</span>
        </span>
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={url} className="btn btn-primary">
            Read More
          </a>
          <div style={{ display: "flex" }}>
            <p>
              By {!author ? "Unknown" : author} on {date} {time}
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsApi;
