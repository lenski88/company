import React from "react";
import PropTypes from "prop-types";

import "./Authorization.css";

class Authorization extends React.PureComponent {
  static propTypes = {
    employes: PropTypes.array.isRequired /* массив сотрудников */,
    login:
      PropTypes.bool.isRequired /* прошла ли авторизация; по умолчанию false */,
    cbGetUser: PropTypes.func,
  };

  state = {
    login: this.props.login,
    nameUser: "",
    errName: "",
    errPassword: "",
    button: false,
  };

  nameUser = (eo) => {
    this.setState({
      nameUser: eo.target.value,
    });

    let arrayNames = this.props.employes;
    let name = eo.target.value;
    let isLogin = arrayNames.some((i) => {
      return name === i.login;
    });

    if (!isLogin) {
      this.setState({
        errName: "Нет такого сотрудника",
      });
    } else {
      this.setState({
        errName: "",
      });
    }
  };

  getUser = () => {
    if (!this.state.errName && !this.state.errPassword) {
      let arrayNames = this.props.employes;
      let name = this.state.nameUser;
      let user = arrayNames.find((i) => {
        return name === i.login;
      });
      this.props.cbGetUser({
        user: user,
      });
      this.setState({
        login: true,
      });
    }
  };

  render() {
    return (
      !this.state.login && (
        <div className="Authorization">
          <label>Введите логин:</label>
          <br />
          <input
            className="inputText"
            type="text"
            name="nameUser"
            value={this.state.nameUser}
            onChange={this.nameUser}
            autoFocus
          ></input>
          <br />
          <span>{this.state.errName}</span>
          <br />
          <br />
          { this.state.nameUser &&
            <input
              className="button"
              type="button"
              onPointerDown={this.getUser}
              value="Войти"
              disabled={this.state.button}
            ></input>
          }
        </div>
      )
    );
  }
}

export default Authorization;