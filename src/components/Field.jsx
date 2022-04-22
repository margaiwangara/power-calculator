function Field({
  id,
  label,
  type,
  placeholder,
  value,
  onChange,
  required,
  name,
  hasDecimal = true,
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
          step={hasDecimal ? 0.1 : 1}
          name={name}
        />
      </div>
    </div>
  );
}

export default Field;
