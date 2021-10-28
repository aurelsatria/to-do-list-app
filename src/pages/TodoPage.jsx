import React from "react";
import logo from "../logo.svg";
import "../App.css";
import "../styles.css";
import "bootstrap/dist/css/bootstrap.css";
import TodoItem from "../components/TodoItem";
import TodoItemF from "../components/TodoItemF";
import Axios from "axios";
import { connect } from "react-redux";
import {
  incrementTodoCount,
  decrementTodoCount,
  changeTodoCount,
  fetchTodoGlobal,
} from "../redux/actions/todo";

// Props : Data dari Parent ke Child

class TodoPage extends React.Component {
  state = {
    todoList: [],
    inputTodo: "",
  };

  fetchTodo = () => {
    Axios.get("http://localhost:2007/todo")
      .then((response) => {
        console.log(response.data);
        this.setState({ todoList: response.data });
        this.props.changeTodo(response.data.length);
      })
      .catch((error) => {
        alert("Terjadi kesalahan di server!");
      });
  };

  deleteTodo = (id) => {
    Axios.delete(`http://localhost:2007/todo/${id}`)
      .then(() => {
        alert("Berhasil delete todo!");
        this.props.fetchTodoGlobal();
      })
      .catch((error) => {
        alert("Terjadi kesalahan di server!");
      });

    // this.setState(
    //   {
    //     todoList: this.state.todoList.filter((val) => {
    //       return val.id !== id
    //     })
    //   }
    // )
  };

  completeTodo = (id) => {
    Axios.patch(`http://localhost:2007/todo/${id}`, {
      isFinished: true,
    })
      .then(() => {
        alert("Berhasil complete todo!");
        this.props.fetchTodoGlobal();
      })
      .catch((error) => {
        alert("Terjadi kesalahan di server!");
      });
  };

  renderTodoList = () => {
    return this.props.todoGlobalState.todoList.map((val) => {
      return (
        <TodoItem
          completeTodoHandler={this.completeTodo}
          deleteTodoHandler={this.deleteTodo}
          todoData={val}
        />
      );
    });
  };

  addTodo = () => {
    Axios.post("http://localhost:2007/todo", {
      activity: this.state.inputTodo,
      isFinished: false,
    })
      .then(() => {
        alert("Berhasil menambahkan todo!");
        this.props.fetchTodoGlobal();
      })
      .catch((error) => {
        alert("Terjadi kesalahan di server!");
      });

    // this.setState(
    //   {
    //     todoList: [...this.state.todoList, {activity: this.state.inputTodo, id: this.state.todoList.length + 1}]
    //   }
    // )
  };

  inputHandler = (event) => {
    // event.target.value menyimpan value dari input text saat ini
    this.setState({ inputTodo: event.target.value });
  };

  componentDidMount() {
    // this.fetchTodo();
    this.props.fetchTodoGlobal();
  }

  // componentDidUpdate() {
  //   alert("Component UPDATE")
  // }

  render() {
    // alert("Component RENDER")
    return (
      <div>
        <h1>Todo List</h1>
        <button className="btn btn-info" onClick={this.fetchTodo}>
          Get my Todo List {this.props.todoGlobalState.todoCount}
        </button>
        {this.renderTodoList()}
        <div>
          <input onChange={this.inputHandler} type="text" className="mx-3" />
          <button onClick={this.addTodo} className="btn btn-primary">
            Add Todo
          </button>
          <button
            onClick={this.props.incrementTodo}
            className="btn btn-warning"
          >
            Increment Todo
          </button>
          <button onClick={this.props.decrementTodo} className="btn btn-info">
            Decrement Todo
          </button>
          <button
            onClick={() => this.props.changeTodo(7)}
            className="btn btn-dark"
          >
            Change Todo
          </button>
        </div>
      </div>
    );
  }
}

const mapStateProps = (state) => {
  return {
    testingProps: 0,
    todoGlobalState: state.todo,
  };
};

const mapDispatchToProps = {
  incrementTodo: incrementTodoCount,
  decrementTodo: decrementTodoCount,
  changeTodo: changeTodoCount,
  fetchTodoGlobal,
};

export default connect(mapStateProps, mapDispatchToProps)(TodoPage);

// <div>
//     <TodoItem todoData = {{activity: "Makan", id: 1}} />
//     <TodoItem todoData = {{activity: "Mandi", id: 2}} />
//     <TodoItem todoData = {{activity: "Coding", id: 3}} />
//     <TodoItemF todoData = {{activity: "Makan", id: 1}} />
//     <TodoItemF todoData = {{activity: "Mandi", id: 2}} />
//     <TodoItemF todoData = {{activity: "Coding", id: 3}} />

//   <ul>
//     {
//       this.state.arr.map((val) => {
//         return (
//           <li>{val}</li>
//         )
//       })
//     }
//   </ul>
// </div>
