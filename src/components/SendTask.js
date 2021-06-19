import React from "react";
import PropTypes from "prop-types";

import "./SendTask.css";

class SendTask extends React.Component {
  static propTypes = {
    employes: PropTypes.array,
    idEmpForSendTask: PropTypes.number, ////id сотрудника, которому будет поставлена задача
    cbNewTask: PropTypes.func,
  };

  state = {
    newTask: "",
    emptyTask: true,
  };

  empName = () => {
    let employes = this.props.employes;
    let idEmp = this.props.idEmpForSendTask;
    let emp = employes.find((i) => {
      return i.id === idEmp;
    });
    let name = emp.name.split(" ").splice(0, 2).join(" ");
    return name;
  };

  setNewTask = (eo) => {
    if (eo.target.value.trim() === "") {
      this.setState({
        emptyTask: true,
      });
    } else {
      this.setState({
        emptyTask: false,
      });
    }
    this.setState({
      newTask: eo.target.value,
    });
  };

  sendTask = () => {
    let arrayTask = this.props.employes[this.props.idEmpForSendTask].task; //массив задач сотрудника
    let lastIdTask; //последний id в массиве задач

    arrayTask.length === 0? lastIdTask = 0:lastIdTask = arrayTask[arrayTask.length - 1].id;
    
    let sender = this.props.user.name;
    arrayTask = [
      ...arrayTask,
      { id: lastIdTask + 1, task: this.state.newTask, sender: sender },
    ];

    let emp = this.props.employes[this.props.idEmpForSendTask]; // сотрудник с обновленным списком задач
    emp = { ...emp, task: arrayTask };

    this.props.cbNewTask(emp);

    this.setState({
      newTask: "",
    });
  };

  render() {
    return (
      <div className="SendTask">
        <div style={{ color: "#fbfc55", textAlign: "center" }}>
          <h2>Новая задача</h2>
          <h4>Кому:{this.empName()} </h4>
        </div>
        <textarea
          className="inputText"
          maxLength="400"
          cols="40"
          rows="10"
          placeholder="Поле для ввода..."
          value={this.state.newTask}
          onChange={this.setNewTask}
        ></textarea>
        {!this.state.emptyTask && (
          <input
            className="button"
            type="button"
            value="[Отправить]"
            onPointerDown={this.sendTask}
          ></input>
        )}
        <input className="button" type="button" value="[Отмена]"></input>
      </div>
    );
  }
}

export default SendTask;
