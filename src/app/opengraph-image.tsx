import { ImageResponse } from "next/og";

export const alt = "Shigure — Software Engineer Portfolio";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          color: "#fafafa",
          background:
            "radial-gradient(circle at 80% 10%, #164e63 0%, transparent 38%), linear-gradient(135deg, #09090b 0%, #101720 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 26 }}>
          <span style={{ color: "#22d3ee" }}>~/</span>
          <span>shigure</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div style={{ color: "#67e8f9", fontSize: 25, letterSpacing: 2 }}>
            SOFTWARE ENGINEER · WEB / AI / NATIVE
          </div>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.08 }}>
            From an idea to software people can use.
          </div>
          <div style={{ color: "#a1a1aa", fontSize: 28 }}>
            Selected projects, engineering decisions, and experience.
          </div>
        </div>
      </div>
    ),
    size
  );
}
