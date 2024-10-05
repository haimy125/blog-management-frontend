// pages/_app.tsx
import "../styles/globals.css"; // Đường dẫn tương đối
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
    return <Component {...pageProps} />;
}
