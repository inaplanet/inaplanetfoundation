import { ImageResponse } from 'next/og';
import { SITE_NAME } from './content/site';

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: 'linear-gradient(160deg, #05070c 0%, #0d1220 52%, #05070c 100%)',
          color: '#ffffff',
          padding: '72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ fontSize: 24, letterSpacing: 8, opacity: 0.72 }}>INAPLANET.COM</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, maxWidth: 860 }}>
          <div style={{ fontSize: 76, lineHeight: 1.02, fontWeight: 700 }}>{SITE_NAME}</div>
          <div style={{ fontSize: 32, lineHeight: 1.35, opacity: 0.82 }}>
            Designs and ships digital products for real business use.
          </div>
        </div>
        <div style={{ fontSize: 24, opacity: 0.62 }}>
          Web and mobile apps, backend systems, payment flows, and product infrastructure.
        </div>
      </div>
    ),
    size
  );
}
