import { useState } from "react";
// import Item from "./components/Item";

export default function App() {
  const [number, setNumber] = useState(1);
  // const [loading, setProcess] = useState(false);

  return (
    <div style={{ textAlign: "center" }}>
      {/* {loading && "Loading..."} */}
      <div style={{ fontSize: "20px" }}>Number: {number}</div>
      <br />
      <button onClick={() => setNumber(number + 1)}>Count + 1</button>
      <br />
      <br />
      <Home />
    </div>
  );
}

function Home() {
  const data = [
    { id: 1, name: "Hari", alamat: "Jl. Bangau" },
    { id: 2, name: "Bunga", alamat: "Jl. Teratai" },
    { id: 3, name: "Andi", alamat: "Jl. Mawar" },
  ];

  const [lists, setLists] = useState(data);
  const [isUpdate, setUpdate] = useState(false);

  const initialForm = {
    id: "",
    name: "",
    alamat: "",
  };

  const [form, setForm] = useState(initialForm);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLists([
      ...lists,
      {
        id: lists.length + 1,
        name: form.name,
        alamat: form.alamat,
      },
    ]);
    setForm(initialForm);
  };

  const handleEdit = (id) => {
    const editForm = lists.find((item) => item.id === id);
    setForm({ id: editForm.id, name: editForm.name, alamat: editForm.alamat });
    setUpdate(true);
  };

  function handleUpdate(e) {
    e.preventDefault();

    const updateData = lists.map((item) =>
      item.id === form.id
        ? { ...lists, id: form.id, name: form.name, alamat: form.alamat }
        : item
    );

    setLists(updateData);
  }

  function handleDelete(id) {
    setLists(lists.filter((item) => item.id !== id));
  }

  return (
    <div>
      <form onSubmit={isUpdate ? handleUpdate : handleSubmit}>
        Name:
        <input
          type="text"
          name="name"
          value={form.name}
          onChange={handleChange}
        />
        &nbsp; Alamat:{" "}
        <input
          name="alamat"
          type="text"
          value={form.alamat}
          onChange={handleChange}
        />
        <button type="submit">{isUpdate ? "Update" : "Save"}</button>
      </form>
      <br />
      name: {form.name}, alamat: {form.alamat}
      <ul>
        {lists.map((item) => (
          <Item
            handleEdit={handleEdit}
            data={item}
            key={item.name}
            handleDelete={handleDelete}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ data, handleEdit, handleDelete }) {
  return (
    <div>
      <li style={{ display: "flex", padding: "6px" }}>
        <div onClick={() => handleEdit(data.id)}>
          {data.id}. {data.name}, alamat: {data.alamat}
        </div>
        &nbsp;
        <button onClick={() => handleDelete(data.id)}>Delete</button>
      </li>
    </div>
  );
}
