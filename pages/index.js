import React, { Component } from "react";
import { Card, Grid } from "semantic-ui-react";
import myToken from "../ethereum/mytoken";
import Layout from "../components/Layout";
import web3 from "../ethereum/web3";

class MyTokenIndex extends Component {
  static async getInitialProps(props) {
    // props.query.address is the address of the deployed contract
    const token = myToken(props.query.address);

    const symbol = await token.methods.symbol().call();
    const nameToken = await token.methods.name().call();
    const totalSupply = await token.methods._totalSupply().call();
    const totalSupplyFinal = web3.utils.fromWei(totalSupply, "wei");

    return { symbol, nameToken, totalSupplyFinal };
  }

  renderCards() {
    const { symbol, nameToken, totalSupplyFinal } = this.props;

    const items = [
      {
        header: symbol,
        meta: "Symbol of Token",
        description: "This token is used for nothing :D",
      },
      {
        header: nameToken,
        meta: "Token Name",
        description: "The name of the token is the same name of the contract",
      },
      {
        header: totalSupplyFinal,
        meta: "Total Supply",
        description: "Total Supply of the token",
      },
    ];

    return <Card.Group centered items={items} />;
  }

  render() {
    return (
      <Layout>
        <div style={{marginTop:10}}>{this.renderCards()}</div>
      </Layout>
    );
  }
}

export default MyTokenIndex;
