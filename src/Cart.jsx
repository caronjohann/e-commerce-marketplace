import React, { Component } from 'react'
import { connect } from "react-redux";
import { Link } from "react-router-dom";
class UnconnectedCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
            allItems: [],
            result: [],
            id: ""
        };
    }
    deleteItem = async evt => {
        evt.preventDefault()
        let data = new FormData
        data.append('username', this.props.username)
        // data.append("username", "bob@decode.com")
        data.append('id', this.state.id)
        let response = await fetch('/deleteItemCart', {
            method: "POST",
            body: data,
            credentials: "include"
        })
        let responseBody = await response.text()
        let body = JSON.parse(responseBody)
        if (body.success) {
            location.reload()
        }
        console.log(body, "body")
    }



    componentDidMount = async () => {
        let data = new FormData
        data.append("username", this.props.username)
        // data.append("username", "bob@decode.com")
        let response = await fetch('/checkout', {
            method: "POST",
            body: data,
            credentials: "include"
        })
        let responseBody = await response.text()
        let body = JSON.parse(responseBody)
        console.log(body, "body")
        this.props.dispatch({ type: "cart", cartList: body })
        console.log(body)
        let response2 = await fetch("/send-items");
        let body2 = await response2.text();
        body2 = JSON.parse(body2);
        this.setState({ allItems: body2 })
        let newArr = []
        for (let i = 0; i < this.props.cartList.length; i++) {
            for (let e = 0; e < this.state.allItems.length; e++) {
                if (this.props.cartList[i] === this.state.allItems[e]._id) {
                    newArr.push(this.state.allItems[e])
                }
            }
        }
        this.setState({ result: newArr })
    }

    render = () => {
        return (
            <div>
                <Link to="/"></Link>
                {this.state.result.map(item => {
                    return (
                        <div className="checkoutBox">
                            <img className="imgCart" src={item.images[0]} />
                            <div>{item.title}</div>
                            <div>{item.price}</div>
                            <form onSubmit={this.deleteItem}>
                                <input type="submit" onClick={() => { this.setState({ id: item._id }) }} value="Delete" />
                            </form>
                        </div>
                    )



                })}
                <form >
                    <input type="submit" value="checkout"></input>
                </form>
            </div>
        );
    };
}
let mapStateToProps = state => {
    return {
        username: state.username,
        cartList: state.cartList,
        allItems: state.allItems
    };
};
let Cart = connect(mapStateToProps)(UnconnectedCart)
export default Cart