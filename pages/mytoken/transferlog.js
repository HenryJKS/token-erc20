import React from "react";
const { Component } = require("react");
import Layout from "../../components/Layout";
import MyToken from "../../ethereum/mytoken";
import { Table, Menu, Icon } from "semantic-ui-react";

class TransferLog extends Component {
  state = {
    addressTo: [],
    addressFrom: [],
    quantity: [],
    block: [],
    timestamp: [],
    currentPage: 1,
    itensPerPage: 10,
  };

  static async getInitialProps(props) {
    const token = MyToken(props.query.address);

    const events = await token.getPastEvents("TransferWithBlock", {
      fromBlock: 0,
      toBlock: "latest",
    });

    // Criando um array para cada propriedade
    const decimals = await token.methods.decimals().call();
    const addressFrom = events.map((event) => event.returnValues.from);
    const addressTo = events.map((event) => event.returnValues.to);
    const quantity = events.map((event) => event.returnValues.amount);
    const block = events.map((event) => event.returnValues.blockNumber);
    const timestamp = events.map((event) => event.returnValues.timestamp);

    // Converão de quantity para 2 decimais
    for (let i = 0; i < quantity.length; i++) {
      quantity[i] = (quantity[i] / Math.pow(10, decimals)).toFixed(decimals);
    }

    // Conversão do timestamp UNIX
    for (let i = 0; i < timestamp.length; i++) {
      timestamp[i] = new Date(timestamp[i] * 1000).toLocaleString();
    }

    return {
      address: props.query.address,
      addressTo,
      addressFrom,
      quantity,
      block,
      timestamp,
    };
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber });
  };

  handlePrevPage = () => {
    const { currentPage } = this.state;
    if (currentPage > 1) {
      this.setState({ currentPage: currentPage - 1 });
    }
  };

  handleNextPage = () => {
    const { currentPage, itensPerPage } = this.state;
    const totalPages = Math.ceil(this.props.addressFrom.length / itensPerPage);
    if (currentPage < totalPages) {
      this.setState({ currentPage: currentPage + 1 });
    }
  };

  renderRows() {
    const { currentPage, itensPerPage } = this.state;
    const indexOfLastItem = currentPage * itensPerPage;
    const indexOfFirstItem = indexOfLastItem - itensPerPage;
    const currentItems = this.props.addressFrom.slice(
      indexOfFirstItem,
      indexOfLastItem
    );

    return currentItems.map((addressFrom, index) => {
      return (
        <Table.Row>
          <Table.Cell>{addressFrom}</Table.Cell>
          <Table.Cell>{this.props.addressTo[index]}</Table.Cell>
          <Table.Cell>{this.props.quantity[index] + " HJK"}</Table.Cell>
          <Table.Cell>{this.props.block[index]}</Table.Cell>
          <Table.Cell>{this.props.timestamp[index]}</Table.Cell>
        </Table.Row>
      );
    });
  }

  renderPageNumbers() {
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(this.props.addressFrom.length / this.state.itensPerPage);
      i++
    ) {
      pageNumbers.push(
        <Menu.Item as="a" key={i} onClick={() => this.handlePageChange(i)}>
          {i}
        </Menu.Item>
      );
    }
    return pageNumbers;
  }

  render() {
    return (
      <Layout>
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Endereço De</Table.HeaderCell>
              <Table.HeaderCell>Endereço Para</Table.HeaderCell>
              <Table.HeaderCell>Quantidade</Table.HeaderCell>
              <Table.HeaderCell>Número do Bloco</Table.HeaderCell>
              <Table.HeaderCell>Horário da Transação</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.renderRows()}</Table.Body>

          <Table.Footer>
            <Table.Row>
              <Table.HeaderCell colSpan="5">
                <Menu floated="right" pagination>
                  <Menu.Item as="a" icon onClick={this.handlePrevPage}>
                    <Icon name="chevron left" />
                  </Menu.Item>
                  {this.renderPageNumbers()}
                  <Menu.Item as="a" icon onClick={this.handleNextPage}>
                    <Icon name="chevron right" />
                  </Menu.Item>
                </Menu>
              </Table.HeaderCell>
            </Table.Row>
          </Table.Footer>
        </Table>
      </Layout>
    );
  }
}

export default TransferLog;
