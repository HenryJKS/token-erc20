import { Component } from "react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import MyToken from "../../ethereum/mytoken";
import { Button, Form, Message, Card } from "semantic-ui-react";
import { Router } from "../../routes";
import CardConversion from "../../components/CardConversion";

class MintToken extends Component {
  state = {
    quantityToken: "",
    errorMessage: "",
    loading: false,
  };

  static async getInitialProps(props) {
    const mytoken = MyToken(props.query);
    const tokenMintado = await mytoken.methods.mintToken().call();
    const decimals = await mytoken.methods.decimals().call();
    const tokenMintadoDecimal = (tokenMintado / Math.pow(10, decimals)).toFixed(decimals);

    return { address: props.query.address, tokenMintadoDecimal };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const mytoken = MyToken(this.props.address);

    this.setState({ errorMessage: "", loading: true });

    try {
      const accounts = await web3.eth.getAccounts();
      await mytoken.methods.mint(this.state.quantityToken).send({
        from: accounts[0],
      });

      Router.pushRoute("/");
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };

  renderCardMint() {
    const items = [
      {
        header: `${this.props.tokenMintadoDecimal} HJK`,
        meta: "Tokens Mintados",
        description: "Quantidade de Tokens Criados",
      },
    ];

    return <Card.Group items={items} />;
  }

  render() {
    return (
      <Layout>
        <h1>Mint Token</h1>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
          <Form.Field>
            <label>Mint Token HJK</label>
            <input
              placeholder="Quantity"
              value={this.state.quantityToken}
              onChange={(event) =>
                this.setState({ quantityToken: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Button positive loading={this.state.loading}>
              Mint
            </Button>
            <Message error header="Erro" content={this.state.errorMessage} />
          </Form.Field>
          <Form.Field>
            {this.renderCardMint()}
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

export default MintToken;
