/* eslint-disable react/prop-types */
const Button = ({ text, onClick, type = "button" }) => {
  return (
    <>
      <div className="container mx-auto p-4">
        <button type={type} className="btn btn-outline" onClick={onClick}>
          {text}
        </button>
      </div>
    </>
  );
};

export default Button;
