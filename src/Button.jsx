const Button = ({ handler, text, key, className, disabled }) => {
  return (
    <button
      onClick={handler}
      key={key}
      className={className}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
export default Button;
