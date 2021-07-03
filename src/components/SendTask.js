import React from "react";
import PropTypes from "prop-types";

import "./SendTask.css";

class SendTask extends React.Component {
  static propTypes = {
    employes: PropTypes.array,
    idEmp: PropTypes.number, ////id сотрудника, которому будет поставлена задача
    cbNewTask: PropTypes.func,
    cbExitSendTask:PropTypes.func
  };

  state = {
    newTask: "",
    emptyTask: true,
  };

  empName = () => {
    let employes = this.props.employes;
    let idEmp = this.props.idEmp;
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
    let empIndex = this.props.employes.findIndex((i) => {
      return i.id === this.props.idEmp;
    });
    let arrayTask = this.props.employes[empIndex].task; //массив задач сотрудника
    let lastIdTask; //последний id в массиве задач

    arrayTask.length === 0? lastIdTask = 0:lastIdTask = arrayTask[arrayTask.length - 1].id; // если массив задач пустой
    
    let sender = this.props.user.name;
    arrayTask = [
      ...arrayTask,
      { id: lastIdTask + 1, task: this.state.newTask, sender: sender },
    ];

    let emp = this.props.employes[empIndex]; // сотрудник с обновленным списком задач
    emp = { ...emp, task: arrayTask };

    this.props.cbNewTask(emp);

    this.setState({
      newTask: "",
    });
  };

  exitSendTask = () => {
    let isExit = window.confirm("Изменения не сохранятся! Выйти?")
    if(isExit) {
      this.setState({
        newTask:'',
        emptyTask:true
      })
      this.props.cbExitSendTask();
    } else {
      return;
    }
  }

  render() {
    return (
      <div className="SendTask">
        <div style={{ color: "#fbfc55", textAlign: "center" }}>
          <h2>Новая задача</h2>
          <h4 id='empName'>Кому:{this.empName()} </h4>
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
        <input className="button" type="button" value="[Отмена]" onPointerDown={this.exitSendTask}></input>
      </div>
    );
  }
}

export default SendTask;
