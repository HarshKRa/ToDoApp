import { useEffect, useState } from "react";
import "./App.css";
import todoImg from "./images/todoImg.png";

const getLocalStorageData = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [data, setData] = useState(getLocalStorageData());
  const [inputData, setInputData] = useState("");
  const [editData, setEditData] = useState(true);
  const [editList, setEditList] = useState(null);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(data));
  }, [data]);

  const addData = () => {
    if(!inputData){
      alert("Please add any task")
    }else if(inputData && editList){
      setData(data.map((ele)=>{
        if(ele.id === editList){
          return {...ele,name:inputData}
        }
        return ele
      }))

      setInputData("");
      setEditData(true);
      setEditList(null);
    }else{
      let obj = { id: new Date().getTime().toString(), name: inputData };
    setData([...data, obj]);
    setInputData("");
    }
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

  const handleEdit = (id) =>{
    let selectEditData = data.find((ele)=>{
      return ele.id === id;
    })
    setInputData(selectEditData.name);
    setEditData(false)
    setEditList(id)

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
            onChange={(e) => setInputData(e.target.value)}
            placeholder="✍️ Add item..."
          />
          {editData ? (
            <i
              className="fas fa-plus btnPluse btnPluse input-icon"
              onClick={addData}
              title="Add item"
            ></i>
          ) : (
            <i
              className="fas fa-solid fa-edit btnPluse input-icon"
              title="Update item"
              onClick={addData}
            ></i>
           )} 
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
              <div className="pr-8">
                {index + 1}
                {". "}
                {ele.name}
              </div>

              <div>
                <i
                  className="fas fa-solid fa-edit px-2"
                  onClick={() => handleEdit(ele.id)}
                ></i>
                <i
                  className="fas fa-solid fa-trash"
                  onClick={() => removeItem(ele.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
