import { Component } from "react";
import Layout from "../../components/Layout";
import web3 from "../../ethereum/web3";
import MyToken from "../../ethereum/mytoken";
import { Button, Form, Message } from "semantic-ui-react";
import { Router } from "../../routes";

class MintToken extends Component {
  state = {
    quantityToken: "",
    errorMessage: "",
    loading: false
  };

  static async getInitialProps(props) {
    return { address: props.query.address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const mytoken = MyToken(this.props.address);

    this.setState({ errorMessage: "", loading:true});

    try {
      const accounts = await web3.eth.getAccounts();
      await mytoken.methods.mint(this.state.quantityToken).send({
        from: accounts[0],
      });

      Router.pushRoute("/");
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({loading:false})
  };

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
            <Button primary loading={this.state.loading}>Mint</Button>
            <Message error header="Erro" content={this.state.errorMessage} />
          </Form.Field>
        </Form>
      </Layout>
    );
  }
}

export default MintToken;
