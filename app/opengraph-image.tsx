import { ImageResponse } from "next/og";

export const runtime = "edge";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Soumil Roy — Distributed systems & backend infrastructure";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#09090b",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          position: "relative",
          color: "#f4f4f5",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(228,228,231,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(228,228,231,0.04) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            display: "flex",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(63, 185, 80, 0.14), transparent)",
            display: "flex",
          }}
        />

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "14px",
            marginBottom: "44px",
            position: "relative",
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              background: "#3fb950",
              display: "flex",
            }}
          />
          <span
            style={{
              fontSize: 22,
              color: "#a1a1aa",
              letterSpacing: "4px",
              textTransform: "uppercase",
              display: "flex",
            }}
          >
            online
          </span>
        </div>

        <div
          style={{
            fontSize: 132,
            fontWeight: 400,
            letterSpacing: "-6px",
            lineHeight: 1,
            color: "#f4f4f5",
            position: "relative",
            display: "flex",
          }}
        >
          Soumil Roy
        </div>

        <div
          style={{
            marginTop: 32,
            fontSize: 38,
            color: "#a1a1aa",
            position: "relative",
            display: "flex",
          }}
        >
          Distributed systems · Backend infrastructure
        </div>

        <div
          style={{
            marginTop: 60,
            fontSize: 24,
            color: "#52525b",
            letterSpacing: "3px",
            position: "relative",
            display: "flex",
          }}
        >
          SOUMILROY.COM
        </div>
      </div>
    ),
    { ...size },
  );
}
