const Radio = ({ name, id, value, label }) => {
  return (
    <div class="form-check form-check-inline   ">
      <input
        className="form-check-input m-2"
        type="radio"
        name={name}
        id={id}
        value={value}
      />
      <label class="form-check-label m-1" for="inlineRadio2">
        {label}
      </label>
    </div>
  );
};

export default Radio;
