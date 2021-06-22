import React from "react";
import PropTypes from "prop-types";

import "./MyTask.css";

class MyTask extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    cbExitTask: PropTypes.func,
    cbDeleteTask: PropTypes.func,
  };

  state = {};

  exit = () => {
    this.props.cbExitTask();
  };

  deleteTask = (eo) => {
    let isDelete = window.confirm("Удалить задачу?");
    if (isDelete) {
      this.props.cbDeleteTask(Number(eo.target.name));
    }
  };

  render() {
    let listTask;
    let countTask = this.props.user.task.length;
    if (countTask === 0) {
      listTask = "Пока ничего нет!";
    } else {
      listTask = this.props.user.task.map((i) => {
        return (
          <div
            key={i.id}
            style={{
              margin: "2vh",
              padding: "2vh",
              border: "0.1em solid", 
              boxShadow:  '0.4em 0.4em  #b2b2b8e8'           
            }}
          >
            <li style={{ listStyleType: "none", wordBreak: 'break-all'}}>{i.task}</li>
            <br />
            <span style={{ color: "gray", fontSize: "1.5vh" }}>
              Отправитель:{i.sender}
            </span>
            <br />
            <input
              name={i.id}
              className="button"
              type="button"
              value="[Удалить]"
              onPointerDown={this.deleteTask}
            ></input>
          </div>
        );
      });
    }
    return (
      <div className="MyTask">
        <h2 style={{ marginLeft: "4vw" }}>Мои задачи</h2>
        <ul>{listTask}</ul>
        <input
          style={{ marginLeft: "4vw" }}
          className="button"
          type="button"
          value="[Выйти]"
          onPointerDown={this.exit}
        ></input>
      </div>
    );
  }
}

export default MyTask;
