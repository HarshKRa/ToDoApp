import { useState } from "react";
import "./App.css";
import todoImg from "./images/todoImg.png";

function App() {
  const [data, setData] = useState([{id:1233,name:"Harsh"},{id:1233,name:"Harsh"}]);
  const [inputData, setInputData] = useState("");

  const addData = ()=>{
    let obj = {id:new Date().getTime().toString(), name:inputData}
    setData([...data,obj])
    setInputData("")
  }

  const clearAllData = ()=>{
    setData([])
  }

  return (
    <div className="bg-slate-500 w-[100vw] h-[100vh] py-5">
      <div className="flex justify-between mx-20">
        <img src={todoImg} alt="todoImg" />

        <h1 className="my-auto text-white text-2xl font-bold">
          Add Your List Here ✌️
        </h1>

        <div className="my-auto">
          <input
            className="todo-input"
            type="text"
            value={inputData}
            onChange={(e)=>setInputData(e.target.value)}
            placeholder="✍️ Add item..."
          />
          <i
            className="fas fa-plus btnPluse btnPluse icon"
            onClick={addData}
            title="Add item"
          ></i>
        </div>
        <div className="my-auto">
          <button className="btn" onClick={clearAllData}>Remove All</button>
        </div>
      </div>
      <div className="px-20 py-10 flex gap-10">
        {data.map((ele,index) => {
          return <div className="todo-item">
            <div>{index+1}{". "}{ele.name}</div>
          </div>;
        })}
      </div>
    </div>
  );
}

export default App;
