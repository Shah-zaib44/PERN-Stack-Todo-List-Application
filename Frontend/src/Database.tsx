// DATABASE
import React, { FormEvent, useEffect } from "react";
import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import "./App.css";
const EditForm = ({
  handleEditFormEvent,
  handleEditChange,
  editinputValue,
}) => {
  return (
    <form onSubmit={handleEditFormEvent}>
      <div className="form-group   d-flex justify-content-center">
        <input
          className="form-control mr-2"
          type="text"
          onChange={handleEditChange}
          value={editinputValue}
        />

        <button className=" btn btn-warning" type="submit">
          Update
        </button>
      </div>
    </form>
  );
};

const Database = () => {
  const [inputValue, setinputValue] = React.useState("");
  const [editinputValue, seteditinputValue] = React.useState("");
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editId, seteditId] = React.useState("");

  const [items, setitems] = React.useState([] as any);

  const handleFormEvent = (e: FormEvent<HTMLFormElement>) => {
    if (inputValue !== "") {
      createItem();

      setinputValue("");
    }

    e.preventDefault();
  };
  const handleEditFormEvent = (e: FormEvent<HTMLFormElement>) => {
    if (editinputValue !== "") {
      updateItem(editId);

      seteditinputValue("");
    }

    e.preventDefault();
    handleClose();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setinputValue(e.target.value);

    e.preventDefault();
  };
  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    seteditinputValue(e.target.value);

    e.preventDefault();
  };
  const createItem = async () => {
    var bodyFormData = {
      item: inputValue,
    };

    axios({
      method: "post",
      url: "/api/todoList/",
      data: bodyFormData,

      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        getItems();
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  const updateItem = async (id) => {
    var bodyFormData = {
      item: editinputValue,
    };

    axios({
      method: "put",
      url: `/api/todoList/${id}/`,
      data: bodyFormData,

      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        getItems();
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  const deleteItem = async (id) => {
    axios({
      method: "delete",
      url: `/api/todoList/${id}/`,

      headers: { "Content-Type": "application/json" },
    })
      .then(function (response) {
        getItems();
      })
      .catch(function (response) {
        console.log(response);
      });
  };

  const getItems = async () => {
    axios({
      method: "get",
      url: "/api/todoList/",
    })
      .then(function (response) {
        setitems(response.data);
      })
      .catch(function (response) {
        console.log(response);
      });
  };
  useEffect(() => {
    getItems();
  }, []);
  return (
    <>
      <section id="login " className=" text-center">
        <div className="container ">
          <div className="row ">
            <div className="col mx-auto">
              <div className="card ">
                <div className="card-header">
                  <h3>Database</h3>
                </div>

                <div className="card-body ">
                  <form
                    onSubmit={handleFormEvent}
                    className="d-flex justify-content-center "
                  >
                    <div className="form-group form-inline ">
                      <input
                        className="form-control mr-2 w-75"
                        type="text"
                        placeholder="Add Todo"
                        onChange={handleChange}
                        value={inputValue}
                        autoFocus
                      />
                      <button className="btn   btn-primary " type="submit">
                        Add
                      </button>
                    </div>
                  </form>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Todo</th>
                        <th>Edit</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>

                          <td>{item.item} </td>

                          <td>
                            <Button
                              variant="warning"
                              onClick={() => {
                                handleShow();
                                seteditId(item.item_id);
                                seteditinputValue(item.item);
                              }}
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => {
                                deleteItem(item.item_id);
                              }}
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <EditForm
            handleEditFormEvent={handleEditFormEvent}
            handleEditChange={handleEditChange}
            editinputValue={editinputValue}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Database;
