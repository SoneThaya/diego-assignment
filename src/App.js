import "./App.css";
import { useState, useEffect } from "react";

function App() {
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [age, setAge] = useState("");
  const [image, setImage] = useState("");
  const [modalOpen, setModalOpen] = useState(false);

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let newUser = {
      firstName,
      lastName,
      age,
      image,
    };

    setData([...data, newUser]);
  };

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(data));
  }, [data]);

  useEffect(() => {
    const savedUsers = JSON.parse(localStorage.getItem("user"));

    if (savedUsers) {
      setData(savedUsers);
    }
  }, []);

  const Modal = ({ children }) => {
    if (!modalOpen) {
      return null;
    }

    return (
      <div className="modal" id="modal">
        <h2>Awesome User</h2>
        <div className="content">{children}</div>
        <div className="actions">
          <button className="toggle-button" onClick={handleCloseModal}>
            close
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Awesome Assignment</h1>

      <form onSubmit={handleSubmit}>
        <h1>Create a User</h1>

        <label>
          First Name
          <input
            name="firstName"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>

        <label>
          Last Name
          <input
            name="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>

        <label>
          Age
          <input
            name="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
        </label>

        <label>
          Image Link
          <input
            name="image"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
        </label>

        <button>Submit</button>
      </form>
      <div>
        <button>Delete User</button>
        <button>Edit User</button>
      </div>
      <table id="users">
        <tr>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Age</th>
          <th>Image</th>
          <th>Delete</th>
        </tr>

        {data.map((item, index) => (
          <>
            <tr key={index}>
              <td>{item.firstName}</td>
              <td>{item.lastName}</td>
              <td>{item.age}</td>
              <td>
                <button onClick={handleOpenModal}>Open</button>
              </td>
              <td>
                <input type="checkbox" />
              </td>
            </tr>
            <Modal show={modalOpen} closeModal={handleCloseModal}>
              <h2>
                {item.firstName} {item.lastName}
              </h2>
              <div>
                <img src={item.image} alt={item.firstName} />
              </div>
            </Modal>
          </>
        ))}
      </table>
    </div>
  );
}

export default App;
