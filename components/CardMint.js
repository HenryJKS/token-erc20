import React from "react";
import { Card, Icon, Image } from "semantic-ui-react";
import { Link } from "../routes"

export default () => {
  return (
    <Card>
      <Image
        src="https://th.bing.com/th/id/OIG.TWJEln8cm.jTIORXM.cq?pid=ImgGn&w=1024&h=1024&rs=1"
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
