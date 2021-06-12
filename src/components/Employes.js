import React from "react";
import PropTypes from "prop-types";

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
        employmentDate: PropTypes.string.isRequired, // дата трудоустройства
        task: PropTypes.array.isRequired, // массив задач
      })
    ),
    login: PropTypes.bool.isRequired,
    user: PropTypes.object, // какой юзер зашел
  };

  state ={
    
  }

  render() {
    let employes; //список сотрудников
    if (this.props.user) {
      let user = this.props.user;

      employes = this.props.employes.map((emp) => {
        if (emp.id !== user.id) {
          return (
            <div className="ListEmployes" key={emp.id}>
              <p>{emp.name}</p>
              <p>{emp.department}</p>
              <p>{emp.position}</p>
              <br />
              <button className="button">Информация</button>
              {user.level > 1 && (
                <button className="button">Поставить задачу</button>
              )}
              {user.level === 3 && <button className="button">Изменить</button>}
              {user.level === 3 && <button className="button">Удалить</button>}
            </div>
          );
        }
      });
    }

    return (
      this.props.login && <div className="WrapperEmployes">{employes}</div>
    );
  }
}

export default Employes;
