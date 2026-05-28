const STARS = [
  { x: 8, y: 18, size: 3, delay: 0 },
  { x: 22, y: 42, size: 4, delay: 0.4 },
  { x: 38, y: 12, size: 2, delay: 0.8 },
  { x: 55, y: 28, size: 5, delay: 0.2 },
  { x: 71, y: 55, size: 3, delay: 1.1 },
  { x: 84, y: 22, size: 4, delay: 0.6 },
  { x: 15, y: 68, size: 3, delay: 1.4 },
  { x: 48, y: 72, size: 2, delay: 0.3 },
  { x: 62, y: 8, size: 3, delay: 0.9 },
  { x: 91, y: 48, size: 4, delay: 1.6 },
  { x: 33, y: 88, size: 3, delay: 0.5 },
  { x: 76, y: 82, size: 2, delay: 1.2 },
];

export function Starfield() {
  return (
    <div className="starfield" aria-hidden="true">
      {STARS.map((star, index) => (
        <span
          key={index}
          className="starfield__star"
          style={
            {
              left: `${star.x}%`,
              top: `${star.y}%`,
              width: star.size,
              height: star.size,
              animationDelay: `${star.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
