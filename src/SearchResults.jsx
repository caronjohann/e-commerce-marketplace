import { connect } from "react-redux";
import React, { Component } from "react";
import { Link } from "react-router-dom";
class UnconnectedSearchResults extends Component {
  render = () => {
    if (this.props.query === "" || undefined) {
      return <div />;
    }
    let searchResults = this.props.allItems.filter(each => {
      let title = each.title.toLowerCase();
      let desc = each.description.toLowerCase();
      return (
        title.includes(this.props.query) || desc.includes(this.props.query)
      );
    });
    return (
      <div className="flex container">
        {searchResults.map(each => {
          return (
            <div>
              <Link to={"/itemDescription/" + each._id}>
                <div>
                  <img src={each.images[0]} width="100px" />
                </div>
                <div>{each.title}</div>
                <div>{each.price}</div>
              </Link>
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
