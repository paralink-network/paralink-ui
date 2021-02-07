import { Container, Header, Menu } from "semantic-ui-react";
import { NavigationBar } from "../NavigationBar";
import { Link } from "react-router-dom";
import React from "react";

function BaseLayout(props: any) {
  return (
    <div>
      <NavigationBar></NavigationBar>

      <Container textAlign="left" style={{ marginTop: "7em" }}>
        {props.children}
      </Container>
    </div>
  );
}

export default BaseLayout;
