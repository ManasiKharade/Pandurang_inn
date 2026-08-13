import './ImageBanner.css';

function ImageBanner({ title, subtitle, image }) {
  return (
    <section className="image-banner" style={{ backgroundImage: image ? `url(${image})` : undefined }}>
      <div className="image-banner-overlay">
        <h2>{title}</h2>
        {subtitle ? <p>{subtitle}</p> : null}
      </div>
    </section>
  );
}

export default ImageBanner;
