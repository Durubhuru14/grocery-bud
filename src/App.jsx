import { useContext, useState, createContext } from "react";
import Form from "./Form";
import { nanoid } from "nanoid";
import Items from "./Items";

const AppContext = createContext();

export const useFunctionContext = () => {
  const context = useContext(AppContext);
  return context;
};

const setLocalStorage = (itemsList) => {
  localStorage.setItem("list", JSON.stringify(itemsList));
};

const getLocalStorage = () => {
  return JSON.parse(localStorage.getItem("list")) || [];
};

const App = () => {
  const [items, setItems] = useState(getLocalStorage());

  const addItem = (itemName) => {
    const newItem = {
      name: itemName,
      completed: false,
      id: nanoid(),
    };
    const newItems = [...items, newItem];
    setItems(newItems);
    setLocalStorage(newItems);
  };
  const removeItem = (itemId) => {
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
    setLocalStorage(newItems);
  };
  const editItem = (itemId) => {
    const newItems = items.map((item) => {
      if (item.id === itemId) {
        const newItem = { ...item, completed: !item.completed };
        return newItem;
      }
      return item;
    });
    setItems(newItems);
    setLocalStorage(newItems);
  };

  return (
    <section className="section-center">
      <Form addItem={addItem} />
      <AppContext.Provider value={{ editItem, removeItem }}>
        <Items items={items} />
      </AppContext.Provider>
    </section>
  );
};

export default App;
