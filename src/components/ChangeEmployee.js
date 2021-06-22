import React from "react";
import PropTypes from "prop-types";

import "./ChangeEmployee.css";

class ChangeEmployee extends React.PureComponent {
  static propsTypes = {
    employes: PropTypes.array.isRequired,
    idEmp: PropTypes.number.isRequired,
    indexEmp: PropTypes.number.isRequired,
    cbAddChangeEmp:PropTypes.func,
    cbChangeExit:PropTypes.func
  };

  state = {
    changeLevel: this.props.employes[this.props.indexEmp].level,
    changeEmail: this.props.employes[this.props.indexEmp].email,
    changePhone: this.props.employes[this.props.indexEmp].phone,
    changeDepartment: this.props.employes[this.props.indexEmp].department,
    changePosition: this.props.employes[this.props.indexEmp].position,

    errEmail: "",
    errPhone: "",
    errPosition: "",
  };

  changeLevel = (eo) => {
    this.setState({
      changeLevel: Number(eo.target.value),
    });
  };

  changeEmail = (eo) => {
    this.setState({
      changeEmail: eo.target.value,
    });
    let regExp = /\S+@\S+\.\S+/;
    if (!regExp.test(this.state.changeEmail)) {
      this.setState({
        errEmail: "Формат ввода: login@example.com",
      });
    } else {
      this.setState({
        errEmail: "",
      });
    }
  };

  changePhone = (eo) => {
    this.setState({
      changePhone: eo.target.value,
    });
    let regExp = /^\d+$/;
    if (eo.target.value.length !== 9 || !regExp.test(this.state.changePhone)) {
      this.setState({
        errPhone: "Содержит 9 цифр",
      });
    } else {
      this.setState({
        errPhone: "",
      });
    }
  };

  changeDepartment = (eo) => {
    this.setState({
      changeDepartment: eo.target.value,
    });
  };

  changePosition = (eo) => {
    this.setState({
      changePosition: eo.target.value,
    });
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

  addChange = () => {
    this.props.cbAddChangeEmp({
      id:this.props.idEmp,
      login: this.props.employes[this.props.indexEmp].login,
      level:this.state.changeLevel,
      name: this.props.employes[this.props.indexEmp].name,
      email:this.state.changeEmail,
      phone:this.state.changePhone,
      department:this.state.changeDepartment,
      position:this.state.changePosition,
      task:this.props.employes[this.props.indexEmp].task
    })

  };

  changeExit = () => {
    this.props.cbChangeExit()
  }

  render() {
    return (
      <div className="ChangeEmp">
        <h2
          style={{ marginLeft: "1vw", textAlign: "center", color: "#fbfc55 " }}
        >
          Внесение изменений в карточку сотрудника{" "}
          {this.props.employes[this.props.indexEmp].name}
        </h2>
        <label className="label">
          Уровень доступа:
          <br />
          <select
            className="inputText"
            name="level"
            value={this.state.changeLevel}
            onChange={this.changeLevel}
            onBlur={this.validation}
            autoFocus
          >
            <option value={1}>Уровень доступа 1</option>
            <option value={2}>Уровень доступа 2</option>
            <option value={3}>Уровень доступа 3</option>
          </select>
        </label>
        <label className="label">
          Почта:
          <br />
          <input
            className="inputText"
            type="text"
            name="email"
            value={this.state.changeEmail}
            onChange={this.changeEmail}
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
            value={this.state.changePhone}
            onChange={this.changePhone}
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
            value={this.state.changeDepartment}
            onChange={this.changeDepartment}
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
            value={this.state.changePosition}
            onChange={this.changePosition}
            onBlur={this.validation}
          ></input>
          <span style={{ color: "black" }}>{this.state.errPosition}</span>
        </label>
        {Boolean(
          this.state.changeEmail &&
            this.state.changePhone &&
            this.state.changePosition
        ) &&
          Boolean(
            !this.state.errEmail &&
              !this.state.errPhone &&
              !this.state.errPosition
          ) && (
            <input
              className="button"
              type="button"
              value="[Сохранить]"
              onPointerDown={this.addChange}
            ></input>
          )}
        <input
          className="button"
          type="button"
          value="[Выйти без сохранения]"
          onPointerDown={this.changeExit}
        ></input>
      </div>
    );
  }
}

export default ChangeEmployee;
