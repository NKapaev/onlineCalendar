import { useState, useEffect } from "react";
import "./colorPicker.css";
export default function ColorPicker({
  colors = [
    "#9F2957",
    "#D90056",
    "#E25D33",
    "#DFC45A",
    "#B8C42F",
    "#429488",
    "#16AF6E",
    "#397E49",
    "#439BDF",
    "#4254AF",
    "#6C7AC4",
    "#8332A4",
  ],
  colorsPerRow = 6,
  containerWidth = 230,
  colorSize = 20,
  value,
  onChange,
}) {
  const [selectedColor, setSelectedColor] = useState(value || colors[0]);
  const gap =
    colorsPerRow > 1
      ? (containerWidth - colorsPerRow * colorSize) / (colorsPerRow - 1)
      : 0;

  useEffect(() => {
    if (onChange) onChange(selectedColor);
  }, [selectedColor]);

  return (
    <div style={{ width: `${containerWidth}px` }}>
      <h3 className="color-picker-title">Colour</h3>
      <div
        className="color-picker"
        style={{
          gap: `${gap}px`,
          width: `${containerWidth}px`,
        }}
      >
        {colors.map((color, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedColor(color);
            }}
            className="color-container"
            style={{
              width: `${colorSize}px`,
              height: `${colorSize}px`,

              backgroundColor: color,
              border:
                color === selectedColor
                  ? "2px solid #333"
                  : "2px solid transparent",
            }}
          />
        ))}
      </div>
    </div>
  );
}
