import React, { Component } from "react";
class NewItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      price: "",
      images: [],
      categeries: "Mens",
      addToItems: false
    };
  }

  itemTitle = evt => {
    console.log("title", evt.target.value);
    this.setState({ title: evt.target.value });
  };
  itemDescription = evt => {
    console.log("descripton", evt.target.value);
    this.setState({ description: evt.target.value });
  };

  itemPrcie = evt => {
    console.log("price", evt.target.value);
    this.setState({ price: evt.target.value });
  };
  itemImages = evt => {
    console.log("images", evt.target.files);
    let imgsFile = evt.target.files
    imgsFile.forEach(img => {
      let test = img.File.name
      console.log(test, "test")
    });
    this.setState({ images: evt.target.files });
  };
  itemCategeries = evt => {
    console.log("Categeries", evt.target.value);
    this.setState({ categeries: evt.target.value });
  };
  submitHandler = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("title", this.state.title);
    data.append("descrpition", this.state.description);
    data.append("price", this.state.price);
    data.append("images", this.state.images);
    data.append("categeries", this.state.categeries);
    let response = await fetch("/newItem", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    console.log("responseBody form signup", responseBody);
    let body = JSON.parse(responseBody);
    if (body.success === false) {
      this.setState({ addToItems: false });
      return;
    }
    console.log("parsed body", body);
    this.setState({ addToItems: true });
  };

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
          <input type="number" min="0" onChange={this.itemPrcie} />
          <form enctype="multipart/form-data" method="post" action="">
            <h3>Choose Images</h3>
            <input type="file" name="images" onChange={this.itemImages} multiple="multiple" />
          </form>
          <h3>Select Categeries</h3>
          <select name="categerylist" form="newItem" onChange={this.itemCategeries}>
            <option value="mens">Mens</option>
            <option value="womens">Womens</option>
            <option value="accesseries">Accesseries</option>
            <option value="other">Other</option>
          </select>
          <div>
            <input type="submit" value="Add to Items" />
          </div>
        </form>
      </div >
    );
  }
};
// }
export default NewItems