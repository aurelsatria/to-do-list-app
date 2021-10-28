import React from "react";
import logo from "./logo.svg";
import "./App.css";
import "./styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoPage from "./pages/TodoPage";
import MyNavbar from "./components/MyNavbar";

// Props : Data dari Parent ke Child

class App extends React.Component {
  render() {
    return (
      <div>
        <MyNavbar />
        <TodoPage />
      </div>
    );
  }
}

export default App;