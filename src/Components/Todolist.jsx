import React, { useEffect, useState } from "react";

// get local storge data

const getLocalData = () => {
  const lists = localStorage.getItem("mytodolist");
  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todolist = () => {
  const [inputList, setInputList] = useState("");
  const [items, setItems] = useState(getLocalData());
  const [editList, setEditList] = useState("");
  const [togolBtn, setTogolBtn] = useState(false);

  const dataItems = () => {
    if (!inputList) {
      alert("No data found");
    } else if (inputList && togolBtn) {
      setItems(
        items.map((curelmt) => {
          if (curelmt.id === editList) {
            return { ...curelmt, name: inputList };
          }
          return curelmt;
        })
      );

      setInputList("");
      setEditList(null);
      setTogolBtn(false);
    } else {
      const myNewInputeData = {
        id: new Date().getTime().toString(),
        name: inputList,
      };
      setItems([...items, myNewInputeData]);
      setInputList("");
    }
  };

  const editItem = (index) => {
    const item_todo_edited = items.find((curelm) => {
      return curelm.id === index;
    });
    setInputList(item_todo_edited.name);
    setEditList(index);
    setTogolBtn(true);
  };

  //  delete section

  const deletedItems = (index) => {
    const updateData = items.filter((curelm) => {
      return curelm.id !== index;
    });
    setItems(updateData);
  };

  // remove all section

  const removeAll = () => {
    setItems([]);
  };

  // adding localStorage

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(items));
  }, [items]);

  return (
    <>
      <div className="todo-area">
        <div className="todo-components">
          <div className="todo-items">
            <figure>
              <img src="/Images/6194029.png" alt="photos" />
              <figcaption className="title">Add Your List 📝</figcaption>
            </figure>
            <div className="items_add_bar">
              <div className="input_search_bar">
                <input
                  type="text"
                  placeholder="✍ add items"
                  className="from-control"
                  value={inputList}
                  onChange={(event) => setInputList(event.target.value)}
                />
              </div>
              <div className="toggole_btn">
                {togolBtn ? (
                  <i className="bx bx-edit" onClick={dataItems}></i>
                ) : (
                  <i className="bx bx-plus-medical" onClick={dataItems}></i>
                )}
              </div>
            </div>
          </div>

          <div className="show-items">
            {items.map((curelmt) => {
              return (
                <div className="cech-item" key={curelmt.id}>
                  <h3>{curelmt.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="bx bx-edit"
                      onClick={() => editItem(curelmt.id)}
                    ></i>
                    <i
                      className="bx bx-trash"
                      onClick={() => deletedItems(curelmt.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="click-btn">
            <button className="btn effect04" onClick={removeAll}>
              <span>Remove all</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
