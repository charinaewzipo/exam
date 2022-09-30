import { useEffect, useState } from "react";
import logo from "../src/img/logo.png";
import "./app.scss";
import { v4 as uuidv4 } from "uuid";
import { useDispatch, useSelector } from "react-redux";
import {
  addInput,
  changeInput,
  deleteInput,
  fetchData,
  selectInput,
  updateInput,
} from "./redux/actions/asyncActions";
function App() {
  const { data, logs, isCheck, isFocus } = useSelector((state) => state);
  const input = useSelector((state) => state);
  const dispatch = useDispatch();
  const [onFocus, setOnFocus] = useState(false);

  useEffect(() => {
    dispatch(fetchData());
  }, []);

  const handleId = (id) => {
    const search = data.find((item) => item.id === id);

    dispatch(selectInput(search));
  };

  const addData = () => {
    if (input.title.length > 0) {
      const newItem = {
        id: uuidv4(),
        title: input.title,
      };
      dispatch(addInput(newItem));
    }
  };

  const handleChange = (input) => {
    dispatch(changeInput(input));
  };

  const handleDelete = () => {
    if (input.title.length > 0) {
      dispatch(deleteInput(input));
    }
  };
  return (
    <div className="container">
      <div className="navbar">
        <div className="logo">
          <img src={logo} alt="" />
        </div>
        <div className="content">
          <h1>Front-end Developer Testting</h1>
          <h2>Cheddo Technogy Co.Ltd</h2>
        </div>
      </div>
      <div className="main">
        <div className="left">
          <h2>Todo List</h2>
          <div className="todolist">
            {data?.map((item, index) => {
              return (
                <span key={index} onClick={() => handleId(item.id)}>
                  {item.title}
                </span>
              );
            })}
          </div>
        </div>
        <div className="center">
          <h2>Task Name</h2>
          <div className="inputContainer">
            <input
              value={input.title}
              type="text"
              onChange={(e) => handleChange(e.target.value)}
              onBlur={() => setOnFocus(false)}
              onFocus={() => setOnFocus(true)}
            />
            <p>{isFocus && onFocus ? "Typing....." : ""}</p>
          </div>

          <div className="buttons">
            <button
              onClick={isCheck ? () => dispatch(updateInput(input)) : addData}
            >
              {isCheck ? "Edit" : "Button"}
            </button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        </div>
        <div className="right">
          <h2>Activity List</h2>
          <div className="activelist">
            {logs?.map((item, index) => {
              return <span key={index}>{item.title}</span>;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
