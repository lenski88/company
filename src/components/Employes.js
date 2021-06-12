import React from "react";
import PropTypes from "prop-types";

import "./Employes.css";

class Employes extends React.PureComponent {
  static propTypes = {
    employes: PropTypes.arrayOf(
      /* массив сотрудников */
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        login: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        department: PropTypes.string.isRequired,
        position: PropTypes.string.isRequired,
        employmentDate: PropTypes.string.isRequired,
        task: PropTypes.array.isRequired,
      })
    ),
    login: PropTypes.bool.isRequired,
    user: PropTypes.object  // какой юзер зашел
  };

  render() {
    console.log(this.props.employes);
    let employes = this.props.employes.map((emp) => {
      return (
        <div className="ListEmployes" key={emp.id}>
          <h3>{emp.name}</h3>
          <br/>
          {emp.department}
          <br />
          <br />
          {emp.position}
          <br />
          <br />
          <button className="button">Информация</button>
          <button className="button">Поставить задачу</button>
          <button className="button">Изменить</button>
          <button className="button">Удалить</button>
        </div>
      );
    });

    return (
      this.props.login && <div className="WrapperEmployes">{employes}</div>
    );
  }
}

export default Employes;
