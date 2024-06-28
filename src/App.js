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
    <div className="w-[100vw] mh-[100vh] py-5">
      <div className="flex flex-col lg:flex-row justify-between lg:mx-20 text-center lg:gap-0 gap-6">
        <img className="mx-auto lg:mx-0" src={todoImg} alt="todoImg" height="70px" width="70px" />

        <h1 className="my-auto text-white lg:text-2xl text-xl font-bold">
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
              className="fas fa-plus btnPluse btnPluse input-icon bg-white icon"
              onClick={addData}
              title="Add item"
            ></i>
          ) : (
            <i
              className="fas fa-solid fa-edit btnPluse input-icon  bg-white icon"
              title="Update item"
              onClick={addData}
            ></i>
           )} 
        </div>
        <div className="my-auto lg:block hidden">
          {
            data.length > 1 ? (<button className="btn" onClick={clearAllData}>
              Remove All
            </button>) : (<button className="btn invisible" onClick={clearAllData}>
              Remove All
            </button>) 
          }
        </div>
      </div>
      <div className="lg:px-20 py-10 px-3 flex lg:flex-wrap lg:flex-row flex-col  lg:gap-16 md:8 gap-2 lg:text-xl text-sm">
        {data.map((ele, index) => {
          return (
            <div className="todo-item bg154242">
              <div className="pr-8 bg154242">
                {index + 1}
                {". "}
                {ele.name}
              </div>

              <div className="bg154242">
                <i
                  className="fas fa-solid fa-edit px-2 bg154242 icon"
                  onClick={() => handleEdit(ele.id)}
                ></i>
                <i
                  className="fas fa-solid fa-trash bg154242 icon"
                  onClick={() => removeItem(ele.id)}
                ></i>
              </div>
            </div>
          );
        })}
      </div>
      {
        data.length >1 ? (<div className="flex justify-center lg:hidden">
          <button className="btn" onClick={clearAllData}>
                Remove All
              </button>
          </div>) : ""
      }
    </div>
  );
}

export default App;
