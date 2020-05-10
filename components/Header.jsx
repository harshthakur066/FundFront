import React from "react";
import { Menu } from "semantic-ui-react";

export default () => {
  return (
    <Menu style={{ marginTop: 10 }}>
      <Menu.Item>
        <b>FundFront</b>
      </Menu.Item>
      <Menu.Menu position="right">
        <Menu.Item>Campaigns</Menu.Item>
        <Menu.Item>+</Menu.Item>
      </Menu.Menu>
    </Menu>
  );
};
