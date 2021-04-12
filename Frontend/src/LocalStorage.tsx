// LOCALSTORAGE
import React, { FormEvent, useEffect } from "react";
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

const LocalStorage = () => {
  const [inputValue, setinputValue] = React.useState("");
  const [editinputValue, seteditinputValue] = React.useState("");
  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [editId, seteditId] = React.useState("");

  const [items, setitems] = React.useState([] as any);

  const handleFormEvent = (e: FormEvent<HTMLFormElement>) => {
    console.log("inputvalue" + inputValue);
    console.log(e.target);

    if (inputValue !== "") {
      storeItemInLocalStorage(inputValue);

      getItemFromLocalStorage();
      setinputValue("");
    }

    e.preventDefault();
  };
  const handleEditFormEvent = (e: FormEvent<HTMLFormElement>) => {
    console.log("inputvalue" + inputValue);

    if (editinputValue !== "") {
      updateItemInLocalStorage(editId);
      getItemFromLocalStorage();
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
  const storeItemInLocalStorage = (item) => {
    let listItems;
    if (localStorage.getItem("items") === null) {
      listItems = [];
    } else {
      listItems = JSON.parse(localStorage.getItem("items") || "{}");
    }

    listItems.push(item);

    localStorage.setItem("items", JSON.stringify(listItems));
  };
  const updateItemInLocalStorage = (item) => {
    let listItems = JSON.parse(localStorage.getItem("items") || "{}");

    listItems.forEach((task, index) => {
      console.log("item" + item);
      console.log("task" + task + "index" + index);
      if (item === task) {
        listItems[index] = editinputValue;
      }
    });
    console.log("listItems" + listItems);

    localStorage.setItem("items", JSON.stringify(listItems));
  };
  const getItemFromLocalStorage = () => {
    let listItems;
    if (localStorage.getItem("items") === null) {
      listItems = [];
    } else {
      listItems = JSON.parse(localStorage.getItem("items") || "{}");
    }
    setitems([...listItems]);
  };
  const removeItemFromLocalStorage = (item) => {
    let listItems;
    if (localStorage.getItem("items") === null) {
      listItems = [];
    } else {
      listItems = JSON.parse(localStorage.getItem("items") || "{}");
    }
    listItems.forEach(function (task, index) {
      if (item === task) {
        listItems.splice(index, 1);
      }
    });

    localStorage.setItem("items", JSON.stringify(listItems));
  };
  useEffect(() => {
    getItemFromLocalStorage();
  }, []);
  return (
    <>
      <section id="login " className=" text-center">
        <div className="container ">
          <div className="row ">
            <div className="col mx-auto">
              <div className="card ">
                <div className="card-header">
                  <h3>Local Storage</h3>
                </div>

                <div className="card-body">
                  <form
                    onSubmit={handleFormEvent}
                    className="d-flex justify-content-center"
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
                      <button className="btn btn-primary" type="submit">
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

                          <td>{item} </td>

                          <td>
                            <Button
                              variant="warning"
                              onClick={() => {
                                handleShow();
                                seteditId(item);
                                seteditinputValue(item);
                              }}
                            >
                              Edit
                            </Button>
                          </td>
                          <td>
                            <Button
                              variant="danger"
                              onClick={() => {
                                removeItemFromLocalStorage(item);

                                getItemFromLocalStorage();
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

export default LocalStorage;
