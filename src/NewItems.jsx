import React, { Component } from "react";
export default class NewItems extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     title: "",
  //     description: "",
  //     price: "",
  //     image: "",
  //     categeries: "",
  //     addToItems: false
  //   };
  // }

  // itemTitle = evt => {
  //   console.log("title", evt.target.value);
  //   this.setState({ title: evt.target.value });
  // };
  // itemDescription = evt => {
  //   console.log("descripton", evt.target.value);
  //   this.setState({ description: evt.target.value });
  // };

  // itemPrcie = evt => {
  //   console.log("price", evt.target.value);
  //   this.setState({ price: evt.target.value });
  // };
  // itemImages = evt => {
  //   console.log("image", evt.target.value);
  //   this.setState({ image: evt.target.value });
  // };
  // itemCategeries = evt => {
  //   console.log("Categeries", evt.target.value);
  //   this.setState({ categeries: evt.target.value });
  // };
  // submitHandler = async evt => {
  //   evt.preventDefault();
  //   let data = new FormData();
  //   data.append("title", this.state.title);
  //   data.append("descrpition", this.state.description);
  //   data.append("price", this.state.price);
  //   data.append("image", this.state.image);
  //   data.append("categeries", this.state.categeries);
  //   let response = await fetch("/newItem", {
  //     method: "POST",
  //     body: data,
  //     credentials: "include"
  //   });
  //   let responseBody = await response.text();
  //   console.log("responseBody form signup", responseBody);
  //   let body = JSON.parse(responseBody);
  //   if (body.success === false) {
  //     this.setState({ addToItems: false });
  //     return;
  //   }
  //   console.log("parsed body", body);
  //   this.setState({ addToItems: true });
  // };

  render = () => {
    // if (this.state.addToItems === true) {
    //   return (
    //     <div>
    //       <h2>Add to Items success!</h2>
    //     </div>
    //   );
    // } else if (this.state.addToItems === false) {
    //   return (
    //     <div>
    //       <h2> Please try again!</h2>
    //     </div>
    //   );
    // } else {
      return (
        <div>
          <form id="newItem" onSubmit={this.submitHandler}>
            <h3>Title</h3>
            <input type="text" onChange={this.itemTitle} />
            <h3>Description </h3>
            <input type="text" onChange={this.itemDescription} />
            <h3>Price</h3>
            <input type="number" onChange={this.itemPrcie} />
            <h3>Choose Images</h3>
            <input type="file" onChange={this.itemImages} />
            <h3>Select Categeries</h3>
            <select name="categerylist" form="newItem">
              <option value="mens">Mens</option>
              <option value="womens">Womens</option>
              <option value="accesseries">Accesseries</option>
              <option value="other">Other</option>
              onChange={this.itemCategeries} >
            </select>
            <div>
              <input type="submit" value="Add to Items" />
            </div>
          </form>
        </div>
      );
    }
  };
// }
