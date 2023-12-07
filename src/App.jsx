import { useState } from "react";

function Logo() {
  return <h1>🌴 Far Away 👜</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };
    // console.log(newItem);
    onAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }

  const numbersArray = [];
  for (let i = 1; i < 21; i++) {
    numbersArray.push(i);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 🥰 trip?</h3>
      <select
        id="select"
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {numbersArray.map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        id="input"
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      ></input>
      <button>Add</button>
    </form>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => {
          onToggleItem(item.id);
        }}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity}&nbsp;
        {item.description}
      </span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

function PackingList({ items, onDeleteItem, onToggleItem }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  if (sortBy === "packed status") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          name=""
          id=""
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed status">Sort by packed status</option>
        </select>
      </div>
    </div>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const numPackedItems = items.filter((item) => item.packed).length;

  if (items.length === 0) {
    return (
      <p className="stats">
        <em>Start packing some items! 🚀</em>
      </p>
    );
  }

  return (
    <footer className="stats">
      {numItems > numPackedItems ? (
        <em>
          👜You have {numItems} items on your list. You're{" "}
          {Math.round((numPackedItems / numItems) * 100)}% packed for your trip.
        </em>
      ) : (
        <em>You got everything! Enjoy your trip ✈</em>
      )}
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onDeleteItem={handleDeleteItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

export default App;
