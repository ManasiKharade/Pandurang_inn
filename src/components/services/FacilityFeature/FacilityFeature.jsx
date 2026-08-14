import "./FacilityFeature.css";

function FacilityFeature({ facility, index }) {
  const Icon = facility.icon;

  return (
    <div 
      className="facility-card"
      data-aos="fade-up" 
      data-aos-delay={index * 100}
    >
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