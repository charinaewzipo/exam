import { useEffect, useState } from "react";
import logo from "../src/img/logo.png";
import "./app.scss";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addInput,
  changeInput,
  deleteInput,
  fetchData,
  handle_Id,
  selectInput,
} from "./redux/actions/asyncActions";
function App() {
  const [input, setInput] = useState("");
  const [list, setList] = useState([]);
  const [activelist, setActivelist] = useState([]);
  const [id, setId] = useState(null);
  const [checkEdit, setCheckEdit] = useState(false);
  const [focus, setFocus] = useState(false);

  const data = useSelector((state) => state.data);
  const inputt = useSelector((state) => state);
  const inputformredux = useSelector((state) => state.title);
  const dispatch = useDispatch();

  // console.log(data);
  console.log("inputt", inputt);
  // console.log(inputformredux);
  useEffect(() => {
    dispatch(fetchData());
  }, []);
  // console.log(props.data);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     const res = await axios.get(
  //       "https://jsonplaceholder.typicode.com/users/1/todos?id=1&id=2"
  //     );
  //     // console.log(res.data);
  //     setList(res.data);
  //   };
  //   fetchData();
  // }, []);

  const handleId = (id) => {
    // setCheckEdit(true);
    // setId(id);
    const search = data.find((item) => item.id === id);
    console.log(search);
    dispatch(selectInput(search));
    // setInput(search.title);
  };

  const addData = (e) => {
    e.preventDefault();
    const newItem = {
      id: uuidv4(),
      title: inputformredux,
    };
    dispatch(addInput(newItem));

    // setList([...list, newItem]);
    // setActivelist([...activelist,newItem.data])
    // setInput("");
  };

  const editData = (id) => {
    if (!input) {
      setCheckEdit(false);
      return;
    } else if (checkEdit && input) {
      const result = list.map((item) => {
        if (item.id === id) {
          return { ...item, title: input };
        }
        return item;
      });
      setList(result);
      setCheckEdit(false);
      setInput("");
    }
  };
  const deleteData = () => {
    // setCheckEdit(true);
    // const result = data.filter((item) => {
    //   return item.id !== inputt.id;
    // });
    dispatch(deleteInput(inputt.id));
    // console.log("result", result);
    // setList(result);
    // setInput("");
    // setCheckEdit(false);
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
              value={inputformredux}
              type="text"
              // onChange={(e) => setInput(e.target.value)}
              onChange={(e) => dispatch(changeInput(e.target.value))}
              // onBlur={() => setFocus(false)}
              // onFocus={() => setFocus(true)}
            />
            <p>{focus ? "Typing....." : ""}</p>
          </div>

          <div className="buttons">
            <button onClick={checkEdit ? () => editData(id) : addData}>
              {checkEdit ? "Edit" : "Button"}
            </button>
            <button onClick={() => deleteData(id)}>Delete</button>
          </div>
        </div>
        <div className="right">
          <h2>Activity List</h2>
          <div className="activelist">
            <span>asdasd</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
