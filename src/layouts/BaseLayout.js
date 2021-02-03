import React from "react";
import { Link } from "react-router-dom";
import { Container, Header, Menu } from "semantic-ui-react";

function BaseLayout(props) {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item as="a" header>
            <Link to="/ipfs">Paralink Network</Link>
          </Menu.Item>
          <Menu.Item as="a">
            <Link to="/ipfs">IPFS</Link>
          </Menu.Item>
        </Container>
      </Menu>

      <Container textAlign="left" style={{ marginTop: "7em" }}>
        {props.children}
      </Container>
    </div>
  );
}

export default BaseLayout;
