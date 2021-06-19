import React from "react";
import PropTypes from "prop-types";

import AddNewEmp from "./AddNewEmp";
import MyTask from "./MyTask";

import "./Header.css";

class Header extends React.PureComponent {
  static propTypes = {
    employes: PropTypes.array.isRequired,
    login: PropTypes.bool.isRequired,
    cbExit: PropTypes.func,
    cbSearchDepartment: PropTypes.func,
    cbNewEmpPush: PropTypes.func,
    cbDeleteTask: PropTypes.func,
    cbIsOpen: PropTypes.func,
  };

  state = {
    addEmp: 0, // 0 - по умолчанию, 1 - добавление нового сотрудника, 2 - мои задачи
    openWindow: 0, // 0 - открыто "добавить сотрудника" или "мои задачи", 1 - ничего не открыто
  };

  exit = () => {
    this.props.cbExit({
      login: false,
    });
  };

  exitAdd = () => {
    this.setState({
      addEmp: 0,
      openWindow: 0,
    });
    this.isOpen();
  };

  //открыто ли какое-нибудь окно

  isOpen = () => {
    this.props.cbIsOpen(this.state.openWindow);
  };

  selectDep = (eo) => {
    this.props.cbSearchDepartment({ select: eo.target.value });
  };

  addEmp = () => {
    this.setState({
      addEmp: 1,
      openWindow: 1,
    });
    this.isOpen();
  };

  exitTask = () => {
    this.setState({
      addEmp: 0,
      openWindow: 0,
    });
    this.isOpen();
  };

  newEmp = (newEmp) => {
    this.props.cbNewEmpPush(newEmp);
  };

  myTask = () => {
    this.setState({
      addEmp: 2,
      openWindow: 1,
    });
    this.isOpen();
  };

  deleteTask = (idTask) => {
    this.props.cbDeleteTask(idTask);
  };

  render() {
    console.log("header");
    let name; // имя юзера
    let countTask; // количество задач на кнопке; равно длине массива задач
    if (this.props.user) {
      name = this.props.user.name;
      name = name.split(" ");
      name = name[1];

      countTask = `[Мои задачи]:[${this.props.user.task.length}]`;
    }
    return (
      this.props.login && (
        <div className="Control">
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h3>Приветствую, {name}!</h3>
          </div>
          <div style={{ display: "flex", flexDirection: 'row', flexWrap:'wrap', justifyContent:'center'}}>
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
                value="[Добавить сотрудника]"
                onPointerDown={this.addEmp}
              ></input>
            )}
            {!this.state.addEmp && (
              <input
                className="button"
                type="button"
                value={countTask}
                onPointerDown={this.myTask}
              ></input>
            )}
            {!this.state.addEmp && (
              <input
                className="button"
                type="button"
                value="[Выйти]"
                onPointerDown={this.exit}
              ></input>
            )}
          </div>
          {this.state.addEmp === 1 && (
            <AddNewEmp
              employes={this.props.employes}
              cbExitAdd={this.exitAdd}
              cbAddEmp={this.newEmp}
            />
          )}
          {this.state.addEmp === 2 && (
            <MyTask
              user={this.props.user}
              cbExitTask={this.exitTask}
              cbDeleteTask={this.deleteTask}
            />
          )}
        </div>
      )
    );
  }
}

export default Header;
