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
        title.includes(this.props.query.toLowerCase()) ||
        desc.includes(this.props.query.toLowerCase())
      );
    });
    return (
      <div className="flex container">
        {searchResults.map(each => {
          return (
            <div>
              <div>
                <Link to={"/itemDescription/" + each._id}>
                  <img src={each.images[0]} width="100px" />
                </Link>
              </div>
              <div>
                {" "}
                <Link to={"/itemDescription/" + each._id}>{each.title}</Link>
              </div>
              <div>${each.price}</div>
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
