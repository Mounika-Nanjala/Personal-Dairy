/* eslint-disable react/prop-types */
const Button = ({ text, onClick, type = "button" }) => {
  return (
    <button type={type} className="btn btn-outline" onClick={onClick}>
      {text}
    </button>
  );
};

export default Button;
