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

export default Stats;
