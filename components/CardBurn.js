import React from "react";
import {Card, Image, Icon} from "semantic-ui-react";
import { Link } from "../routes";

export default () => {
    return(
<Card>
      <Image
        src="https://i.imgur.com/Czt4rWv.jpg"
        wrapped
        ui={false}
      />
      <Card.Content>
        <Card.Header>Queimar Token</Card.Header>
        <Card.Description>
          Queimar não significa valorizar :D
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Link route="/mytoken/burntoken">
          <Icon name="fire" />
          Burn
        </Link>
      </Card.Content>
    </Card>
    )
}