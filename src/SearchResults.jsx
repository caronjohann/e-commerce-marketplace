import { connect } from "react-redux";
import React, { Component } from "react";
class UnconnectedSearchResults extends Component {
  render = () => {
    if (this.props.query === "" || undefined) {
      return <div />;
    }
    let searchResults = this.props.allItems.filter(each => {
      return (
        each.title.includes(this.props.query) ||
        each.description.includes(this.props.query)
      );
    });
    return (
      <div>
        {searchResults.map(each => {
          return (
            <div>
              <div>
                <img src={each.images[0]} />
              </div>
              <div>{each.title}</div>
              <div>{each.price}</div>
            </div>
          );
        })}
      </div>
    );
  };
}

let mapStateToProps = storeState => {
  return {
    query: storeState.searchQuery,
    allItems: storeState.allItems
  };
};
let SearchResults = connect(mapStateToProps)(UnconnectedSearchResults);
export default SearchResults;
