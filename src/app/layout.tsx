import "./globals.css";

export const metadata = {
  title: "지킴진단",
  description: "지킴진단 프론트엔드",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}