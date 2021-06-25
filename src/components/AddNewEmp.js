import React from "react";
import PropTypes from "prop-types";

import "./AddNewEmp.css";

class AddNewEmp extends React.PureComponent {
  static propTypes = {
    employes: PropTypes.array.isRequired,
    cbExitAdd: PropTypes.func,
    cbAddEmp: PropTypes.func,
  };

  state = {
    newLogin: "",
    newLevel: 1,
    newFIO: "",
    newEmail: "",
    newPhone: "",
    newDepartment: "Руководство",
    newPosition: "",

    errLogin: "",
    errFIO: "",
    errEmail: "",
    errPhone: "",
    errPosition: "",

    lastId: this.props.employes[this.props.employes.length-1].id
  };

  exitAdd = () => {
    this.props.cbExitAdd();
  };

  setNewLogin = (eo) => {
    this.setState({ newLogin: eo.target.value.toLowerCase().trim() });

    // есть ли такой логин?
    let isHaveLogin = this.props.employes.some((i) => {
      return i.login === eo.target.value;
    });

    if (eo.target.value.length > 7) {
      this.setState({
        errLogin: "Не более 7 символов",
      });
    } else if (isHaveLogin) {
      this.setState({
        errLogin: "Логин уже занят",
      });
    } else {
      this.setState({
        errLogin: "",
      });
    }
  };
  setNewLevel = (eo) => {
    this.setState({ newLevel: Number(eo.target.value) });
  };
  setNewFIO = (eo) => {
    this.setState({ newFIO: eo.target.value });
  };
  setNewEmail = (eo) => {
    this.setState({ newEmail: eo.target.value.trim() });
  };
  setNewPhone = (eo) => {
    this.setState({ newPhone: eo.target.value.trim() });
    let regExp = /^\d+$/;
    if (eo.target.value.length !== 9 || !regExp.test(this.state.newPhone)) {
      this.setState({
        errPhone: "Содержит 9 цифр",
      });
    } else {
      this.setState({
        errPhone: "",
      });
    }
  };
  setNewDepartment = (eo) => {
    this.setState({ newDepartment: eo.target.value });
  };
  setNewPosition = (eo) => {
    this.setState({ newPosition: eo.target.value });
    let regExp = /^[А-ЯЁ].*/;
    if (!regExp.test(eo.target.value)) {
      this.setState({
        errPosition: "Первая буква заглавная; только кириллица",
      });
    } else {
      this.setState({
        errPosition: "",
      });
    }
  };

  validation = (eo) => {
    let name = eo.target.name;

    if (name === "login") {
      if (!/^[a-zA-Z0-9]+$/.test(this.state.newLogin)) {
        this.setState({
          errLogin: "Не может быть пустым; только латинские символы",
        });
      } else {
        this.setState({
          errLogin: "",
        });
      }
    }
    if (name === "FIO") {
      let regExp =
        /^[А-ЯЁ][а-яё]*([-][А-ЯЁ][а-яё]*)?\s[А-ЯЁ][а-яё]*\s[А-ЯЁ][а-яё]*$/;
      if (!regExp.test(this.state.newFIO)) {
        this.setState({
          errFIO: "Введите ФИО полностью",
        });
      } else {
        this.setState({
          errFIO: "",
        });
      }
    }
    if (name === "email") {
      let regExp = /\S+@\S+\.\S+/;
      if (!regExp.test(this.state.newEmail)) {
        this.setState({
          errEmail: "Формат ввода: login@example.com",
        });
      } else {
        this.setState({
          errEmail: "",
        });
      }
    }
  };

  addNewEmp = () => {
    this.props.cbAddEmp({
      id: this.state.lastId + 1,
      login: this.state.newLogin,
      status: 0,
      level: this.state.newLevel,
      name: this.state.newFIO,
      email: this.state.newEmail,
      phone: this.state.newPhone,
      department: this.state.newDepartment,
      position: this.state.newPosition,
      task: [],
    });
    this.props.cbExitAdd();
  };

  render() {
    return (
      <div className="AddNewEmp">
        <h2 style={{ marginLeft: "1vw" }}>Добавление нового сотрудника </h2>
        <br />
        <label className="label">
          Логин:
          <br />
          <input
            className="inputText"
            type="text"
            value={this.state.newLogin}
            name="login"
            placeholder='login'
            onChange={this.setNewLogin}
            onBlur={this.validation}
          ></input>
          <span style={{ color: "black" }}>{this.state.errLogin}</span>
        </label>
        <label className="label">
          Уровень доступа:
          <br />
          <select
            className="inputText"
            name="level"
            onChange={this.setNewLevel}
            onBlur={this.validation}
          >
            <option value={1}>Уровень доступа 1</option>
            <option value={2}>Уровень доступа 2</option>
            <option value={3}>Уровень доступа 3</option>
          </select>
        </label>
        <label className="label">
          ФИО(полностью):
          <br />
          <input
            className="inputText"
            type="text"
            name="FIO"
            placeholder='Иванов Иван Иванович'
            value={this.state.newFIO}
            onChange={this.setNewFIO}
            onBlur={this.validation}
          ></input>
          <span style={{ color: "black" }}>{this.state.errFIO}</span>
        </label>
        <label className="label">
          Почта:
          <br />
          <input
            className="inputText"
            type="text"
            name="email"
            placeholder='login@example.com'
            value={this.state.newEmail}
            onChange={this.setNewEmail}
            onBlur={this.validation}
          ></input>
          <span style={{ color: "black" }}>{this.state.errEmail}</span>
        </label>
        <label className="label">
          Телефон:
          <br />
          <input
            className="inputText"
            type="text"
            name="phone"
            placeholder='333333333'
            value={this.state.newPhone}
            onChange={this.setNewPhone}
            onBlur={this.validation}
          ></input>
          <span style={{ color: "black" }}>{this.state.errPhone}</span>
        </label>
        <label className="label">
          Отдел:
          <br />
          <select
            className="inputText"
            name="department"
            onChange={this.setNewDepartment}
            onBlur={this.validation}
          >
            <option value="Руководство">Руководство</option>
            <option value="Отдел закупок">Отдел закупок</option>
            <option value="Отдел продаж">Отдел продаж</option>
            <option value="Транспортный отдел">Транспортный отдел</option>
            <option value="Бухгалтерия">Бухгалтерия</option>
            <option value="Отдел кадров">Отдел кадров</option>
            <option value="Складское хозяйство">Складское хозяйство</option>
          </select>
        </label>
        <label className="label">
          Должность:
          <br />
          <input
            className="inputText"
            type="text"
            name="position"
            placeholder='Сотрудник отдела'
            value={this.state.newPosition}
            onChange={this.setNewPosition}
            onBlur={this.validation}
          ></input>
          <span style={{ color: "black" }}>{this.state.errPosition}</span>
        </label>
        <br />
        <div>
        {Boolean(this.state.newLogin &&
              this.state.newFIO &&
              this.state.newEmail &&
              this.state.newPhone &&
              this.state.newPosition) &&
              Boolean(!this.state.errLogin &&
              !this.state.errFIO &&
              !this.state.errEmail &&
              !this.state.errPhone &&
              !this.state.errPosition) &&
          <input
            className="button"
            type="button"
            value="[Сохранить]"
            onPointerDown={this.addNewEmp}
          ></input>}
          <input
            className="button"
            type="button"
            value="[Выйти без сохранения]"
            onPointerDown={this.exitAdd}
          ></input>
        </div>
      </div>
    );
  }
}

export default AddNewEmp;
