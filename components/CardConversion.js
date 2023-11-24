import React from "react";
import { Card, List } from "semantic-ui-react";

export default () => {
  return (
    <Card>
      <Card.Content>
        <Card.Header>Conversão de Unidades</Card.Header>
        <Card.Description>
          <List>
            <List.Item>
              <List.Icon name="right triangle" />
              <List.Content>01 = 0.01 HJK</List.Content>
            </List.Item>
            <List.Item>
              <List.Icon name="right triangle" />
              <List.Content>10 = 0.10 HJK</List.Content>
            </List.Item>
            <List.Item>
                <List.Icon name="right triangle"/>
                <List.Content>100 = 1.00 HJK</List.Content>
            </List.Item>
            <List.Item>
                <List.Icon name="right triangle"/>
                <List.Content>1000 = 10.00 HJK</List.Content>
            </List.Item>
          </List>
        </Card.Description>
      </Card.Content>
    </Card>
  );
};
