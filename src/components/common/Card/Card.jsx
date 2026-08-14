import './Card.css';

function Card({ title, description, children, ...props }) {
  return (
    <article className="card" {...props}>
      <h3>{title}</h3>
      {description ? <p>{description}</p> : null}
      {children}
    </article>
  );
}

export default Card;
