import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "../routes"

export default () => {
  return (
    <Card>
      <Image
        src="https://i.imgur.com/hsodZEW.jpg"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>Mintar Token</Card.Header>
        <Card.Description>
          Mintar não significa desvalorizar :D
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link route="/mytoken/minttoken">
          <Icon name="money" />
          Mint
        </Link>
      </Card.Content>
    </Card>
  );
};
