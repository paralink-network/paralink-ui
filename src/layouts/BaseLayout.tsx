import { Container, Menu } from 'semantic-ui-react';

import { Link } from 'react-router-dom';
import React, { ReactNode } from 'react';

interface BaseLayoutProps {
  children: any;
}

function BaseLayout(props: BaseLayoutProps): ReactNode {
  return (
    <div>
      <Menu fixed="top" inverted>
        <Container>
          <Menu.Item header>
            <Link to="/ipfs">Paralink Network</Link>
          </Menu.Item>
          <Menu.Item>
            <Link to="/ipfs">IPFS</Link>
          </Menu.Item>
        </Container>
      </Menu>

      <Container textAlign="left" style={{ marginTop: '7em' }}>
        {props.children}
      </Container>
    </div>
  );
}

export default BaseLayout;
