/*
 * Dynamic OG image. Rendered at /opengraph-image (1200×630).
 *
 * TODO(assets): next/og's satori engine does not support woff2, only TTF/OTF.
 * We only ship Satoshi as woff2 today, so this generator currently renders with
 * satori's default sans-serif. To restore Satoshi:
 *   (a) add Satoshi-Black.ttf to /public/fonts/satoshi/ and load it here, OR
 *   (b) drop in a hand-designed static /public/og.png and repoint
 *       openGraph.images in src/app/layout.js at /og.png.
 */
import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Proovd — Sell out before the product exists";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          background: "#09110C",
          padding: "80px",
          position: "relative",
        }}
      >
        <div
          style={{
            color: "#BCFCA1",
            fontWeight: 900,
            fontSize: 128,
            lineHeight: 1,
            letterSpacing: "-0.04em",
            textAlign: "center",
            maxWidth: "1000px",
          }}
        >
          Sell out before the product exists
        </div>

        <div
          style={{
            position: "absolute",
            left: "60px",
            bottom: "48px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          <div
            style={{
              width: "20px",
              height: "20px",
              borderRadius: "50%",
              background: "#3BED97",
            }}
          />
          <div
            style={{
              color: "#FAFAFA",
              fontWeight: 900,
              fontSize: 36,
              letterSpacing: "-0.03em",
            }}
          >
            Proovd
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
