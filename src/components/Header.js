import React from "react";

import "./Header.css";

class Header extends React.PureComponent {
  render() {
    let data = new Date();
    data = data.toLocaleDateString();
    
    return (
      <div className="Control">
        <span style={{margin:'0.5em' }}>{data}</span>
        <h1 style={{ textAlign: "center" }}>Приветствую, user!</h1>
      </div>
    );
  }
}

export default Header;
