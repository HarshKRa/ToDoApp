import "./App.css";
import todoImg from "./images/todoImg.png";

function App() {
  return (
    <div className="bg-slate-500 w-[100vw] h-[100vh] py-5">
      <div className="flex justify-between mx-20">
        <img src={todoImg} alt="todoImg" />

        <h1 className="my-auto text-white text-2xl font-bold">Add Your List Here ✌️</h1>

        <div className="my-auto">
          <input className="todo-input"  type="text" placeholder="✍️ Add item..." />
          <i
                className="fas fa-plus btnPluse btnPluse icon"
                title="Add item"
              ></i>
        </div>

        <div className="my-auto">
        <button className="btn">Remove All</button>
        </div>
      </div>
    </div>
  );
}

export default App;
