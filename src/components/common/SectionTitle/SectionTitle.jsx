import './SectionTitle.css';

function SectionTitle({ eyebrow, title, subtitle }) {
  return (
    <div className="section-title">
      {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
      <h2>{title}</h2>
      {subtitle ? <p className="subtitle">{subtitle}</p> : null}
    </div>
  );
}

export default SectionTitle;
