import React, { Component } from 'react'
import { connect } from "react-redux";
class UnconnectedCart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: "",
        };
    }
    deleteItem = () => {

    }


    renderItemsList = async () => {
        let data = new FormData
        // data.append("username", username)
        data.append("username", "bob@decode.com")
        let response = await fetch('/checkout', {
            method: "POST",
            body: data
        })
        let responseBody = await response.text()
        let body = JSON.parse(responseBody)
        console.log(body, "body")
        console.log(this.props.allItems)
        return (
            <div className="checkoutBox">
                <img className="imgCart" src='/upload/1cf9bca0-59e6-48c2-a0e9-99f1a4f72722.jpeg' />
                <div>description of my items</div>
                <div>$200</div>
                <button onClick={this.deleteItem}>Delete</button>
            </div >
        )
    }

    render = () => {
        return (
            <div>
                {this.renderItemsList()}
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
        allItems: state.allItems
    };
};
let Cart = connect(mapStateToProps)(UnconnectedCart)
export default Cart