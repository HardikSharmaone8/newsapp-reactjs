import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import NavBar from "./NavBar";

export class App extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Routes>
          <Route
            path="/"
            element={<Home key="1" query="General" />}
            end
          ></Route>
          <Route
            path="/business"
            element={<Home key="2" query="Business" />}
          ></Route>
          <Route
            path="/entertainment"
            element={<Home key="3" query="Entertainment" />}
          ></Route>
          <Route
            path="/health"
            element={<Home key="4" query="Health" />}
          ></Route>
          <Route
            path="/science"
            element={<Home key="5" query="Science" />}
          ></Route>
          <Route
            path="/sports"
            element={<Home key="6" query="Sports" />}
          ></Route>
          <Route
            path="/technology"
            element={<Home key="7" query="Technology" />}
          ></Route>
        </Routes>
      </>
    );
  }
}

export default App;
