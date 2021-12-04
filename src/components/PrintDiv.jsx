import React, { Component } from "react";

export default class PrintDiv extends Component {
  render() {
    const printProducts = this.props.printProducts;
    return (
      <div className="print-div">
        <table>
          <tr>
            <th>section A</th>
          </tr>
          {printProducts.map((p, i) => (
            <tr key={i}>
              <td>{i})</td>
              <td>{p.name}</td>
              <td>{p.count}</td>
            </tr>
          ))}
        </table>
      </div>
    );
  }
}
