import React from "react";
import PropTypes from "prop-types";

import "./MyTask.css";

class MyTask extends React.PureComponent {
  static propTypes = {
    user: PropTypes.object.isRequired,
    cbExitTask: PropTypes.func,
    cbDeleteTask: PropTypes.func,
  };

  exit = () => {
    this.props.cbExitTask();
  };

  deleteTask = (eo) => {
    this.props.cbDeleteTask(eo.target.name);
  };

  render() {
    let listTask;
    let countTask = this.props.user.task.length;
    if (countTask === 0) {
      listTask = "Пока ничего нет!";
    } else {
      listTask = this.props.user.task.map((i) => {
        return (
          <React.Fragment key={i.id} >
            <li style={{ marginTop: "2vh" }} >{i.task}</li>
            Отправитель:
            <span>{i.sender}</span>
            <br />
            <input
              name={i.id}
              className="button"
              type="button"
              value="Удалить"
              onPointerDown={this.deleteTask}
            ></input>
          </React.Fragment>
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
          value="Выйти"
          onPointerDown={this.exit}
        ></input>
      </div>
    );
  }
}

export default MyTask;
