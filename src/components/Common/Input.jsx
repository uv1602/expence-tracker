const Input = (props) => {
  const { name, label, type, placeholder, value, radio, handleClick } = props;
  return (
    <div className="input-group ">
      <div className="input-group-prepend">
        {label && (
          <span className="input-group-text" id="basic-addon1">
            {label}
          </span>
        )}
      </div>
      {(name || placeholder || value) && (
        <input
          name={name}
          type={type}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onClick={handleClick}
          required
        />
      )}
      {radio}
    </div>
  );
};

export default Input;
