import React from "react";
import PropTypes from "prop-types";

import SendTask from "./SendTask";

import "./Employes.css";

class Employes extends React.PureComponent {
  static propTypes = {
    employes: PropTypes.arrayOf(
      /* массив сотрудников */
      PropTypes.shape({
        id: PropTypes.number.isRequired, // id сотрудника
        login: PropTypes.string.isRequired, // логин для входа
        level: PropTypes.number.isRequired, // уровень доступа 1-низший, 2 - для начальников отделов, 3 - для руководства
        name: PropTypes.string.isRequired, // ФИО
        email: PropTypes.string.isRequired, // почта
        phone: PropTypes.string.isRequired, // номер телефона
        department: PropTypes.string.isRequired, // отдел
        position: PropTypes.string.isRequired, // должность
        task: PropTypes.array.isRequired, // массив задач
      })
    ),
    login: PropTypes.bool.isRequired,
    filterEmployes: PropTypes.array.isRequired,
    workMode: PropTypes.number.isRequired,
    isOpenWindowInHeader: PropTypes.number,
    cbNewTask: PropTypes.func
  };

  state = {
    employes: this.props.employes,
    employeeInfo: [],
    infoWindow: 0,
    mode: 0, // 1- добавить задачу, 2 - изменить пользователя, 3 - удачить пользователя
    idEmpForSendTask: null, //id сотрудника, которому будет поставлена задача
  };

  componentDidUpdate(oldProps) {
    if (this.props.login !== oldProps.login) {
      this.setState({
        infoWindow: 0,
        mode: 0,
      });
    }
  }

  info = (eo) => {
    let employes = this.props.employes;
    let employeeInfo;
    console.log(eo.target.name);
    employeeInfo = employes.filter((i) => {
      return i.id === Number(eo.target.name);
    });
    console.log(employes);
    this.setState({
      employeeInfo: employeeInfo,
      infoWindow: 1,
    });
  };

  exitInfo = () => {
    this.setState({
      infoWindow: 0,
    });
  };

  sendTask = (eo) => {
    this.setState({
      mode: 1,
      idEmpForSendTask: Number(eo.target.name),
    });
  };

  newTask = (emp) => {
    this.setState({
      mode:0
    })

    this.props.cbNewTask(emp)
  }

  render() {
    console.log("employes");
    let employes; //список сотрудников
    let employeeInfo; // содержит хеш с инфо о сотруднике
    if (this.props.user) {
      let user = this.props.user;
      let employesList; // какой список сотрудников будет отрендерен: workMode = 1 - все, workMоde = 2 - отфильтрованный
      this.props.workMode === 1
        ? (employesList = this.props.employes)
        : (employesList = this.props.filterEmployes);

      employes = employesList.map((emp) => {
        if (emp.id !== user.id) {
          return (
            <div className="ListEmployes" key={emp.id}>
              <p>{emp.name}</p>
              <p>{emp.department}</p>
              <p>{emp.position}</p>
              <br />
              <button
                className="button"
                name={emp.id}
                onPointerDown={this.info}
              >
                [Информация]
              </button>
              {user.level > 1 && (
                <button
                  className="button"
                  name={emp.id}
                  onPointerDown={this.sendTask}
                >
                  [Поставить задачу]
                </button>
              )}
              {user.level === 3 && (
                <button className="button" name={emp.id}>
                  [Изменить]
                </button>
              )}
              {user.level === 3 && (
                <button className="button" name={emp.id}>
                  [Удалить]
                </button>
              )}
            </div>
          );
        }
      });

      employeeInfo = this.state.employeeInfo.map((i) => {
        return (
          <div className="ListEmployes" key={i.id}>
            <h2>Информация о сотруднике</h2>
            <p>ФИО:{i.name}</p>
            <p>Уровень доступа:{i.level}</p>
            <p>Почта:{i.email}</p>
            <p>Телефон:{i.phone}</p>
            <p>Отдел:{i.department}</p>
            <p>Дoлжность:{i.position}</p>
            <input
              className="button"
              type="button"
              value="Вернуться"
              onPointerDown={this.exitInfo}
            ></input>
          </div>
        );
      });
    }

    return (
      this.props.login && (
        <React.Fragment>
          {this.state.mode === 0 && (
            <div
              className={
                this.props.isOpenWindowInHeader
                  ? "WrapperEmployes"
                  : "NoWrapperEmployes"
              }
            >
              {!this.state.infoWindow ? employes : employeeInfo}
            </div>
          )}
          {this.state.mode === 1 && (
            <SendTask
              employes={this.props.employes}
              user={this.props.user}
              idEmpForSendTask={this.state.idEmpForSendTask}
              cbNewTask={this.newTask}
            />
          )}
        </React.Fragment>
      )
    );
  }
}

export default Employes;
