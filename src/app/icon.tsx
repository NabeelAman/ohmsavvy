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
        <svg width="20" height="20" viewBox="0 0 32 32">
          <path
            d="M11 21.5h2.3l0.9-2.6C12.6 17.7 11.6 16 11.6 13.7c0-3.1 2-5.2 4.4-5.2s4.4 2.1 4.4 5.2c0 2.3-1 4-2.6 5.2l0.9 2.6H21"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="2.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    ),
    { ...size }
  );
}
