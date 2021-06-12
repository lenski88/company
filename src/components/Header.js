import React from "react";
import PropTypes from "prop-types";

import "./Header.css";

class Header extends React.PureComponent {
  static propTypes = {
    login: PropTypes.bool.isRequired,
    user: PropTypes.object,
  };
  render() {
    let name; // имя юзера
    let countTask; // количество задач на кнопке
    if (this.props.user) {
      name = this.props.user.name;
      name = name.split(" ");
      name = name[1];

      countTask = `Мои задачи [${this.props.user.task.length}]`;
    }
    return (
      this.props.login && (
        <div className="Control">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Приветствую, {name}!</h3>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <input className="button" type="button" value={countTask}></input>
            <input className="button" type="button" value="Выйти"></input>
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <span>Искать по отделам:</span>
            <br />
            <input className="inputText" type="text" defaultValue=""></input>
          </div>
        </div>
      )
    );
  }
}

export default Header;
