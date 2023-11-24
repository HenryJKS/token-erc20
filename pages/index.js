import React, { Component } from "react";
import { Card, Grid, Divider } from "semantic-ui-react";
import myToken from "../ethereum/mytoken";
import Layout from "../components/Layout";
import CardMint from "../components/CardMint";
import CardBurn from "../components/CardBurn";

class MyTokenIndex extends Component {
  static async getInitialProps(props) {
    // props.query.address is the address of the deployed contract
    const token = myToken(props.query.address);

    const symbol = await token.methods.symbol().call();
    const nameToken = await token.methods.name().call();
    const totalSupply = await token.methods._totalSupply().call();
    const decimals = await token.methods.decimals().call();
    const totalTransfer = await token.methods.totalTransfer().call();
    const totalTransferDecimal = (totalTransfer / Math.pow(10, decimals)).toFixed(decimals);
    const totalSupplyDecimal = (totalSupply /  Math.pow(10, decimals)).toFixed(decimals);


    return { symbol, nameToken, totalSupplyDecimal, totalTransferDecimal};
  }

  renderCards() {
    const { symbol, nameToken, totalSupplyDecimal, totalTransferDecimal } = this.props;

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
        header: `${totalSupplyDecimal} HJK`,
        meta: "Total Supply",
        description: "Total Supply of the token, with burn and mint",
      },
      {
        header: `${totalTransferDecimal} HJK`,
        meta: "Total Transfer",
        description: "Total transfer to any address",
      },
    ];

    return <Card.Group centered items={items} />;
  }

  render() {
    return (
      <Layout>
        <Grid style={{marginTop:5}}>
          <Grid.Row>
            <Grid.Column>{this.renderCards()}</Grid.Column>
          </Grid.Row>
          <Divider/>
          <Grid.Row centered>
            <Grid.Column widescreen={5}><CardMint/></Grid.Column>
            <Grid.Column widescreen={5}><CardBurn/></Grid.Column>
          </Grid.Row>
        </Grid>
      </Layout>
    );
  }
}

export default MyTokenIndex;
