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
      <div className="container searchBarResult">
        {searchResults.map(each => {
          return (
            <div className="container search-item">
              <div>
                <Link to={"/itemDescription/" + each._id}>
                  <img
                    className="search-images"
                    src={each.images[0]}
                    width="50px"
                  />
                </Link>{" "}
              </div>
              <div className="search-descript">
                <Link to={"/itemDescription/" + each._id}>{each.title} </Link>
              </div>
              <Link to={"/itemDescription/" + each._id}>
                <div className="search-price">${each.price}</div>{" "}
              </Link>
            </div>
          );
        })}
        <div className="searchbar-bottom">
          <Link to={"/"}>Return to marketplace</Link>
        </div>
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
