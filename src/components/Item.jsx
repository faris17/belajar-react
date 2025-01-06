function Item({ data }) {
  return (
    <div>
      <li>
        {data.name}, alamat: {data.alamat}
      </li>
    </div>
  );
}

export default Item;
