import React from "react";
import { Container, Header, Menu } from "semantic-ui-react";

function BaseLayout(props) {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            Paralink Network
          </Menu.Item>
          <Menu.Item as="a">IPFS</Menu.Item>
        </Container>
      </Menu>

      <Container text style={{ marginTop: "7em" }}>
        {props.children}
      </Container>
    </div>
  );
}

export default BaseLayout;
