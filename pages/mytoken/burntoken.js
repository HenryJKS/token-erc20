import { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Message, Card } from "semantic-ui-react";
import MyToken from "../../ethereum/mytoken";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes";
import CardConversion from "../../components/CardConversion";

class BurnToken extends Component {
  state = {
    quantityToken: "",
    errorMessage: "",
    loading: false,
  };

  static async getInitialProps(props) {
    const mytoken = MyToken(props.query);
    const tokenBurn = await mytoken.methods.burnToken().call();
    const decimals = await mytoken.methods.decimals().call();
    const tokenBurnDecimals = (tokenBurn / Math.pow(10, decimals)).toFixed(
      decimals
    );

    return { address: props.query.address, tokenBurnDecimals };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const mytoken = MyToken(this.props.address);

    this.setState({ errorMessage: "", loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      await mytoken.methods.burn(this.state.quantityToken).send({
        from: accounts[0],
      });
      Router.pushRoute("/");
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };

    renderCardBurn() {
       const items = [
        {
            header: `${this.props.tokenBurnDecimals} HJK`,
            meta: "Tokens Queimados",
            description: "Quantidade de Tokens Queimados"
        }
       ] 

       return <Card.Group items={items}/>
    }

  render() {
    return (
      <Layout>
        <h1>Burn Token</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Burn Token HJK</label>
            <input
              placeholder="Quantity"
              value={this.state.quantityToken}
              onChange={(event) =>
                this.setState({ quantityToken: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Button negative loading={this.state.loading}>Burn</Button>
            <Message error header="Erro" content={this.state.errorMessage}/>
          </Form.Field>
          <Form.Field>
            {this.renderCardBurn()}
          </Form.Field>
          <Form.Field>
            <CardConversion/>
          </Form.Field>
        </Form>
        <Button secondary style={{marginTop:10}} onClick={() => Router.pushRoute("/")}>
            Voltar
        </Button>
      </Layout>
    );
  }
}

export default BurnToken;
