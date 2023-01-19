import { useEffect } from "react";
import { useState } from "react";
import "./App.css";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

function App() {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const [open, setOpen] = useState(false);
  const handleOpen = (id) => {
    setOpen(true);
    fetch(`https://lettyai-task-server.vercel.app/data/${id}`)
      .then((res) => res.json())
      .then((data) => setIdData(data));
    console.log(idData);
  };
  const handleClose = () => setOpen(false);

  const [message, setMessage] = useState("");
  const [data, setData] = useState([]);
  const [idData, setIdData] = useState([]);
  console.log(data);

  useEffect(() => {
    fetch("https://lettyai-task-server.vercel.app/data")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, [message]);
  const getForm = (e) => {
    e.preventDefault();

    setMessage("Adding ....");
    const inputValue = e.target.input.value;
    const data = {
      data: inputValue,
    };

    if (inputValue !== "") {
      fetch("https://lettyai-task-server.vercel.app/add", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          e.target.reset();

          setMessage("Added 🎉");
          setTimeout(() => {
            setMessage("");
          }, 2000);
        });
    } else {
      setMessage("Add at least one word");
    }
  };
  return (
    <div className="App">
      <div className="form">
        <form onSubmit={getForm}>
          <p>Type your text</p>
          <input
            type="text"
            name="input"
            id="input"
            placeholder="Write anything here"
          />
          <br />
          <input className="submit" type="submit" value="Add to list" />
          <p
            style={
              message === "Add at least one word"
                ? { color: "red" }
                : { color: "inherit" }
            }
          >
            {message}
          </p>
        </form>
      </div>
      <div className="list">
        {data.map((d) => (
          <div onClick={() => handleOpen(d._id)} className="box" key={d._id}>
            {d.data}
          </div>
        ))}
      </div>
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Details by ID
            </Typography>
            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
              {idData.data}
            </Typography>
          </Box>
        </Modal>
      </div>
    </div>
  );
}

export default App;
