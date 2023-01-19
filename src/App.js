import "./App.css";

function App() {
  const getForm = (e) => {
    e.preventDefault();
    const inputValue = e.target.input.value;
    console.log(inputValue);
  };
  return (
    <div className="App">
      <div className="form">
        <form onSubmit={getForm}>
          <input
            type="text"
            name="input"
            id=""
            placeholder="Write anything here"
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </div>
  );
}

export default App;
