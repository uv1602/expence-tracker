import Input from "../Common/Input";

const FormElement = ({ title, type, name, placeholder }) => {
  return (
    <div className="row">
      <div className="col-12">
        <div className="row">
          <div className="col-2"></div>
          <div className="col-4">{title}</div>
          <div className="col-5">
            <Input name={name} placeholder={placeholder} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormElement;
