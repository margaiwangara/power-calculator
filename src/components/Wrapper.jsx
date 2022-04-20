function Wrapper({ title, children, className }) {
  return (
    <section
      className={`column is-one-quarter has-background-white p-4 ${className}`}
    >
      <h4 className="is-size-5 has-text-weight-semibold px-2 appliance-title">
        {title}
      </h4>
      {children}
    </section>
  );
}

export default Wrapper;
