import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Script from 'next/script'

const geist = Geist({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: "创新科技",
  description: "您的公司官方网站",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh">
      <head>
        <Script 
          src="https://mapapi.qq.com/web/gljs/loader/glapi_loader.js"
          strategy="afterInteractive"
        />
        <Script 
          src={`https://map.qq.com/api/gljs?v=1.exp&key=QEZBZ-YBYK3-2YN3O-YPKZW-VHSBE-ACBLD&libraries=service`}
          strategy="afterInteractive"
        />
      </head>
      <body className={geist.className}>{children}</body>
    </html>
  );
}
