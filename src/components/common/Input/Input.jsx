import './Input.css';

function Input({ label, ...props }) {
  return (
    <label className="field">
      {label ? <span>{label}</span> : null}
      <input {...props} />
    </label>
  );
}

export default Input;
