import React, { Component } from 'react'
class Cart extends Component {
    render = () => {
        return (
            <div>
                <img
                    height="100px"
                    src='/upload/0c16447c-1163-49d3-94a7-6e299e3bbaee.jpeg'
                    style={{
                        display: "flex",
                        alignItems: "flex-start"
                    }}
                />
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-end",
                        textAlign: "right"
                    }}
                >
                    <div>{this.props.description}</div>
                    <div>{"$" + this.props.price}</div>
                </div>
            </div>
        );
    };
}
export default Cart