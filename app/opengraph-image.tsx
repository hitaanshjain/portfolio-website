import { ImageResponse } from "next/og";

export const alt = "Hitaansh Jain · CS @ NYU '27";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#FAF7F0",
          color: "#1C1B1A",
          position: "relative",
        }}
      >
        <div style={{ position: "absolute", left: 0, top: 0, width: 16, height: 630, backgroundColor: "#1E3480" }} />
        <div style={{ fontSize: 28, color: "#5A554E" }}>$ whoami</div>
        <div style={{ fontSize: 84, fontWeight: 700, marginTop: 12 }}>Hitaansh Jain</div>
        <div style={{ fontSize: 34, marginTop: 16, color: "#1E3480" }}>
          CS @ NYU &apos;27, 3.93 GPA. Full-stack and AI engineer.
        </div>
      </div>
    ),
    size
  );
}
