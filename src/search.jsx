import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class UnconnectedSearch extends Component {
  handleQuery = evt => {
    console.log("Typed search:", evt.target.value);
    this.props.dispatch({
      type: "search",
      typedSearch: evt.target.value
    });
  };
  render = () => {
    return (
      <div>
        <div className="searchbar">
          <input
            type="text"
            onChange={this.handleQuery}
            value={this.props.query}
            placeholder="Search...."
          />
        </div>
        <div className="close">
          <Link to="/">Close</Link>
        </div>
      </div>
    );
  };
}

let mapStateToProps = storeState => {
  return {
    query: storeState.searchQuery
  };
};
let Search = connect(mapStateToProps)(UnconnectedSearch);
export default Search;
