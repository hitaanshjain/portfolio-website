export function PixelSword({ size = 20 }: { size?: number }) {
  // 16x16 pixel-art sword, drawn blade-up-right. Palette: steel, light edge, gold guard, brown grip.
  const px = (x: number, y: number, fill: string) => (
    <rect key={`${x}-${y}`} x={x} y={y} width={1} height={1} fill={fill} />
  );
  const steel = "#8B96A8";
  const edge = "#DDE3EC";
  const gold = "#C9A227";
  const grip = "#7A4A21";
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" shapeRendering="crispEdges" aria-hidden="true">
      {px(12, 1, edge)}
      {px(11, 2, edge)} {px(12, 2, steel)}
      {px(10, 3, edge)} {px(11, 3, steel)}
      {px(9, 4, edge)} {px(10, 4, steel)}
      {px(8, 5, edge)} {px(9, 5, steel)}
      {px(7, 6, edge)} {px(8, 6, steel)}
      {px(6, 7, edge)} {px(7, 7, steel)}
      {px(4, 7, gold)} {px(5, 8, gold)} {px(6, 8, steel)}
      {px(4, 9, gold)} {px(5, 9, gold)} {px(6, 9, gold)}
      {px(3, 10, gold)} {px(4, 10, gold)}
      {px(3, 11, grip)}
      {px(2, 12, grip)}
      {px(1, 13, gold)}
    </svg>
  );
}
