import { useEffect, useState } from "react";
import "./App.css";
import todoImg from "./images/todoImg.png";

const getLocalStorageData = () => {
  let list = localStorage.getItem("lists");
  if (list) {
    return JSON.parse(localStorage.getItem("lists"));
  } else {
    return [];
  }
};

function App() {
  const [data, setData] = useState(getLocalStorageData());
  const [inputData, setInputData] = useState("");

  useEffect(()=>{
    localStorage.setItem("lits",JSON.stringify(data))
  },[data])

  const addData = () => {
    let obj = { id: new Date().getTime().toString(), name: inputData };
    setData([...data, obj]);
    setInputData("");
  };

  const clearAllData = () => {
    setData([]);
  };

  const removeItem = (id) => {
    let newData = data.filter((ele) => {
      return ele.id !== id;
    });

    setData(newData);
  };

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
            onChange={(e) => setInputData(e.target.value)}
            placeholder="✍️ Add item..."
          />
          <i
            className="fas fa-plus btnPluse btnPluse icon"
            onClick={addData}
            title="Add item"
          ></i>
        </div>
        <div className="my-auto">
          <button className="btn" onClick={clearAllData}>
            Remove All
          </button>
        </div>
      </div>
      <div className="px-20 py-10 flex flex-wrap gap-10">
        {data.map((ele, index) => {
          return (
            <div className="todo-item">
              <div>
                {index + 1}
                {". "}
                {ele.name}
              </div>
              <i
                className="fas fa-solid fa-trash"
                onClick={() => removeItem(ele.id)}
              ></i>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
