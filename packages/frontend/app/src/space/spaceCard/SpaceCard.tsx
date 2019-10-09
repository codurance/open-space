import React from "react";
import { ISpace } from "../SpaceContainer";
import { Card } from "semantic-ui-react";

const SpaceCard: React.FC<ISpace> = (props: ISpace) => {
  return (
    <Card className="session" fluid>
      <Card.Content>
        <Card.Header className="space-name">{props.name}</Card.Header>
        <Card.Description className="space-location">
          {props.location}
        </Card.Description>
      </Card.Content>

      <Card.Content>{props.description}</Card.Content>
      <Card.Content>{props.facilities}</Card.Content>
    </Card>
  );
};

export default SpaceCard;
