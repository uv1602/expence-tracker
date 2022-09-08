const Input = (props) => {
  const { name, label, type, placeholder, value } = props;
  return (
    <div className="input-group m-2">
      <div className="input-group-prepend">
        {label && (
          <span className="input-group-text" id="basic-addon1">
            {label}
          </span>
        )}
      </div>
      <input
        name={name}
        type={type}
        className="form-control"
        placeholder={placeholder}
        value={value}
        required
      />
    </div>
  );
};

export default Input;
