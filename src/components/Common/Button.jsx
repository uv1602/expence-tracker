const Button = ({
  url,
  body,
  ficon,
  licon,
  colour,
  type,
  handleClick,
  handleSubmit,
}) => {
  let name;
  if (colour == 0) {
    name = "btn btn-primary ";
  } else {
    name = "float-end btn btn-success";
  }
  return (
    <a href={url}>
      {console.log(type)}
      <button
        className={name}
        type={type}
        onSubmit={handleSubmit}
        onClick={handleClick}
      >
        {ficon}
        {"  "}
        {body}
        {"  "}
        {licon}
      </button>
    </a>
  );
};

export default Button;
