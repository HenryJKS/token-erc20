import React, { Component } from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "../routes";

export default class Header extends Component {
  state = {};

  handleItemClick = (e) => {
    const {name} = e.currentTarget;
    this.setState({activeItem: name});
  }

  render() {
    const { activeItem } = this.state;

    return (
      <Menu>
        <Menu.Item header>Token HJK</Menu.Item>

        <Link route="/" legacyBehavior>
          <Menu.Item
            name="home"
            active={activeItem === "home"}
            onClick={this.handleItemClick}
          />
        </Link>

        <Link route="/mytoken/transfertoken" legacyBehavior>
        <Menu.Item
        name="transfer"
        active={activeItem === "transfer"}
        onClick={this.handleItemClick}/>
        </Link>
      </Menu>
    );
  }
}
