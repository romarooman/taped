/** Accepts an image record ({ src, alt, objectPosition }) or a URL string. */
export default function Image({ src, alt = "", objectPosition, style, ...props }) {
  const image = typeof src === "string" ? { src } : src || {};
  const position = image.objectPosition ?? objectPosition;
  return (
    <img
      {...props}
      src={image.src}
      alt={image.alt ?? alt}
      style={position ? { ...style, objectPosition: position } : style}
    />
  );
}
