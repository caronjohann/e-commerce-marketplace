import { connect } from "react-redux";
import React, { Component } from "react";
class UnconnectedSearchResults extends Component {
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
        <div className="close" />
      </div>
    );
  };
}

let mapStateToProps = storeState => {
  return {
    query: storeState.searchQuery
  };
};
let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
