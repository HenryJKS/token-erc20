import React from "react";
import { Header, Container } from "semantic-ui-react";

export default () => {
    return(
        <div>
    <Container fluid>
      <Header as='h2'>Meu Token em Beta</Header>
      <p>
        Criando Token com sistema de burn e mint, e futuramente com sistema de staking e farm.
      </p>
    </Container>
  </div>
    )
}