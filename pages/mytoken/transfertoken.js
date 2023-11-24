import React from "react";
import { Component } from "react";
import Layout from "../../components/Layout";
import { Form, Input, Button, Message } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import MyToken from "../../ethereum/mytoken";
import CardConversion from "../../components/CardConversion";

class TransferToken extends Component {
  state = {
    quantitySend: "",
    addressTo: "",
    loading: false,
    errorMessage: "",
    successMessage: "",
  };

  static async getInitialProps(props) {
    return { address: props.query.address };
  }

  onSubmit = async (event) => {
    event.preventDefault();

    const mytoken = MyToken(this.props.address);

    this.setState({ loading: true, errorMessage: "", successMessage: "" });

    try {
      const accounts = await web3.eth.getAccounts();
      await mytoken.methods
        .transfer(this.state.addressTo, this.state.quantitySend)
        .send({
          from: accounts[0],
        });
      this.setState({ successMessage: "Enviado Com Sucesso !" });
    } catch (error) {
      this.setState({ errorMessage: error.message });
    }
    this.setState({ loading: false });
  };

  render() {
    return (
      <Layout>
        <h1>Transfer Token</h1>
        <Form
          onSubmit={this.onSubmit}
          error={!!this.state.errorMessage}
          success={!!this.state.successMessage}
        >
          <Form.Field required>
            <label>Address</label>
            <Input
              placeholder="Address"
              type="text"
              value={this.state.addressTo}
              onChange={(event) =>
                this.setState({ addressTo: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field required>
            <label>Value</label>
            <Input
              placeholder="HJK"
              type="number"
              value={this.state.quantitySend}
              onChange={(event) =>
                this.setState({ quantitySend: event.target.value })
              }
            />
          </Form.Field>
          <Form.Field>
            <Button color="green" loading={this.state.loading}>
              Send
            </Button>
          </Form.Field>
          <Form.Field>
            <Message error header="Error" content={this.state.errorMessage} />
            <Message success content={this.state.successMessage} />
          </Form.Field>
          <Form.Field>
            <CardConversion/>
          </Form.Field>
        </Form>
      </Layout>
    );
  }
}

export default TransferToken;
