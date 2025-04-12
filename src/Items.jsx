import SingleItems from "./SingleItems";

const Items = ({ items }) => {
  return (
    <div className="items">
      {items.map((item) => {
        return (
          <SingleItems key={item.id} item={item} />
        );
      })}
    </div>
  );
};
export default Items;
