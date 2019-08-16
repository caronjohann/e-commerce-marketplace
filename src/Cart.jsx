import React, { Component } from "react";
import { connect } from "react-redux";
class UnconnectedCart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.user,
      allItems: [],
      result: [],
      total: 0
    };
  }
  renderCart = async () => {
    let data = new FormData();
    data.append("username", this.props.username);
    let response = await fetch("/checkout", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log(body, "body");
    this.props.dispatch({ type: "cart", cartList: body });
    console.log(body);
    let response2 = await fetch("/send-items");
    let body2 = await response2.text();
    body2 = JSON.parse(body2);
    this.setState({ allItems: body2 });
    let newArr = [];
    let priceTotal = 0;
    for (let i = 0; i < this.props.cartList.length; i++) {
      for (let e = 0; e < this.state.allItems.length; e++) {
        if (this.props.cartList[i] === this.state.allItems[e]._id) {
          newArr.push(this.state.allItems[e]);
          console.log(this.state.allItems[e].price);
          console.log(typeof parseInt(this.state.allItems[e].price));
          priceTotal += parseInt(this.state.allItems[e].price) * 100;
        }
      }
    }
    console.log(priceTotal);
    this.setState({ result: newArr, total: priceTotal });
  };
  deleteItem = async evt => {
    evt.preventDefault();
    let data = new FormData();
    data.append("username", this.props.username);
    data.append("id", this.state.id);
    let response = await fetch("/deleteItemCart", {
      method: "POST",
      body: data,
      credentials: "include"
    });
    let responseBody = await response.text();
    let body = JSON.parse(responseBody);
    console.log(body, "body");
    this.renderCart();
  };

  componentDidMount = () => {
    this.renderCart();
  };

  render = () => {
    return (
      <div>
        {this.state.result.map(item => {
          return (
            <div className="checkoutBox">
              <img className="imgCart" src={item.images[0]} />
              <div>{item.title}</div>
              <div>{item.price}</div>
              <form onSubmit={this.deleteItem}>
                <input
                  type="submit"
                  onClick={() => {
                    this.setState({ id: item._id });
                  }}
                  value="Delete"
                />
              </form>
            </div>
          );
        })}
        <div className="totalBox">total : {this.state.total}$</div>

        <form>
          <input type="submit" value="checkout" />
        </form>
      </div>
    );
  };
}
let mapStateToProps = state => {
  return {
    username: state.username,
    cartList: state.cartList,
    allItems: state.allItems,
    sid: state.sessionId
  };
};
let Cart = connect(mapStateToProps)(UnconnectedCart);
export default Cart;
