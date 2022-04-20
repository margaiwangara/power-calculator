function Field({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  name,
}) {
  return (
    <div className="field">
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="control">
        <input
          type={type}
          id={id}
          className="input"
          placeholder={placeholder}
          onChange={onChange}
          defaultValue={value}
          required={required}
          min={0}
          step={0.1}
          name={name}
        />
      </div>
    </div>
  );
}

export default Field;
