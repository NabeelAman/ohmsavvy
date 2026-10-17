import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 7,
          background: "#C77D1E",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <svg width="28" height="28" viewBox="0 0 32 32">
          <path
            d="M5 17h4l2.2-7 3.4 14 3-11.5 2 4.5h4.6"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="24.8" cy="17" r="2" fill="#FFFFFF" />
        </svg>
      </div>
    ),
    { ...size }
  );
}
