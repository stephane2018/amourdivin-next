import React from "react";
interface ShuffleIconProps {
  size?: number; // Size of the icon (default: 24)
  width?: number; // Explicit width (overrides size)
  height?: number; // Explicit height (overrides size)
}
export const PauseCircleIcon: React.FC<ShuffleIconProps> = ({
  size = 24,
  width,
  height,
  ...props
}) => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height={size || height}
    role="presentation"
    viewBox="0 0 24 24"
    width={size || width}
    {...props}
  >
    <defs></defs>
    <g id="Layer_1-2" fill="fill">
      <g>
        <g id="Ellipse_7-2">
          <circle className="cls-1" cx="60.44" cy="60.44" r="60.44" />
          <circle className="cls-3" cx="60.44" cy="60.44" r="59.9" />
        </g>
        <path
          id="Polygon_1"
          className="cls-2"
          d="M80.95,60.44l-32.38,17.27V43.17l32.38,17.27Z"
        />
      </g>
    </g>
  </svg>
);
