import React from "react";
import isoFetch from "isomorphic-fetch";

import "./Employes.css";

class Employes extends React.PureComponent {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadData();
  }

  state = {
    dataReady: false,
    name: "???",
    employes: [],
  };

  fetchError = (errorMessage) => {
    console.log("dfasdf");
  };

  fetchSuccess = (loadedData) => {
    console.log(loadedData);
    this.setState({
      dataReady: true,
      employes: JSON.parse(loadedData.result),
    });
  };

  loadData = () => {
    let sp = new URLSearchParams();
    sp.append("f", "READ");
    sp.append("n", "LENSKI_COMPANY_EMPLOYES");

    isoFetch("https://fe.it-academy.by/AjaxStringStorage2.php", {
      method: "POST",
      body: sp,
    })
      .then((response) => {
        if (!response.ok) throw new Error("fetch error " + response.status);
        else return response.json();
      })
      .then((data) => {
        this.fetchSuccess(data);
      })
      .catch((error) => {
        this.fetchError(error.message);
      });
  };

  render() {
    let employes = this.state.employes.map((emp) => {
      return (
        <div className="ListEmployes" key={emp.id}>
          {emp.name}
          <br />
          Должность: {emp.position}
          <br />
          <button className="button">Информация</button>
          <button className="button">Добавить задачу</button>
          <button className="button">Изменить</button>
          <button className="button">Удалить</button>
        </div>
      );
    });

    return <div className='WrapperEmployes'>{employes}</div>;
  }
}

export default Employes;
