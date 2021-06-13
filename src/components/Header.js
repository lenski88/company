import React from "react";
import PropTypes from "prop-types";

import AddNewEmp from "./AddNewEmp";

import "./Header.css";

class Header extends React.PureComponent {
  static propTypes = {
    employes: PropTypes.array.isRequired,
    login: PropTypes.bool.isRequired,
    user: PropTypes.object,
    cbExit: PropTypes.func,
    cbSearchDepartment: PropTypes.func,
    cbNewEmpPush:PropTypes.func
  };

  state = {
    addEmp: 0, // 0 - по умолчанию, 1 - добавление нового сотрудника
  };

  exit = () => {
    this.props.cbExit({
      login: false,
    });
    this.setState({
      addEmp: 0,
    });
  };

  selectDep = (eo) => {
    this.props.cbSearchDepartment({ select: eo.target.value });
  };

  addEmp = () => {
    this.setState({
      addEmp: 1,
    });
  };

  exitAdd = () => {
    this.setState({
      addEmp: 0,
    });
  };

  newEmp = (newEmp) => {
    this.props.cbNewEmpPush(newEmp)
  }

  render() {
    let name; // имя юзера
    let countTask; // количество задач на кнопке; равно длине массива задач
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
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            {!this.state.addEmp && (
              <div>
                <span>Искать по отделам:</span>
                <br />
                <br />
                <select className="inputText" onChange={this.selectDep}>
                  <option value="Все">Все</option>
                  <option value="Руководство">Руководство</option>
                  <option value="Отдел закупок">Отдел закупок</option>
                  <option value="Отдел продаж">Отдел продаж</option>
                  <option value="Транспортный отдел">Транспортный отдел</option>
                  <option value="Бухгалтерия">Бухгалтерия</option>
                  <option value="Отдел кадров">Отдел кадров</option>
                  <option value="Складское хозяйство">
                    Складское хозяйство
                  </option>
                </select>
              </div>
            )}
            {this.props.user.level === 3 && !this.state.addEmp && (
              <input
                className="button"
                type="button"
                value="Добавить сотрудника"
                onPointerDown={this.addEmp}
              ></input>
            )}
            {!this.state.addEmp && (
              <input className="button" type="button" value={countTask}></input>
            )}
            {!this.state.addEmp && (
              <input
                className="button"
                type="button"
                value="Выйти"
                onPointerDown={this.exit}
              ></input>
            )}
          </div>
          {Boolean(this.state.addEmp) && (
            <AddNewEmp employes={this.props.employes} cbExit={this.exitAdd} cbAddEmp={this.newEmp} />
          )}
        </div>
      )
    );
  }
}

export default Header;
