/* TODO(assets): Replace with final brand favicon before launch — see /docs/assets-needed.md */
import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        background: "#3BED97",
        borderRadius: "4px",
      }}
    />,
    { ...size }
  );
}
