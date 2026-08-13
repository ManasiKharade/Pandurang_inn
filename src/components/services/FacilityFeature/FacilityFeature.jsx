import "./FacilityFeature.css";

function FacilityFeature({ facility }) {
  const Icon = facility.icon;

  return (
    <div className="facility-card">

      <div className="facility-icon">
        <Icon />
      </div>

      <h3>{facility.title}</h3>

      <div className="facility-divider"></div>

      <p>{facility.description}</p>

    </div>
  );
}

export default FacilityFeature;