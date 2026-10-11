type CanvasSolutionPanelImageProps = {
  x: number;
  y: number;
  w: number;
  h: number;
  src: string;
};

/** Raster panel embedded via foreignObject — reliable in React inline SVG. */
export function CanvasSolutionPanelImage({
  x,
  y,
  w,
  h,
  src,
}: CanvasSolutionPanelImageProps) {
  return (
    <foreignObject x={x} y={y} width={w} height={h}>
      <div
        style={{
          width: "100%",
          height: "100%",
          margin: 0,
          padding: 0,
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        {/* foreignObject cannot host next/image reliably; keep native img. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          width={Math.round(w)}
          height={Math.round(h)}
          loading="lazy"
          decoding="async"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </div>
    </foreignObject>
  );
}
