// pages/_app.tsx
import "@/styles/globals.css"; // Đường dẫn tuyệt đối
import '../styles/custom-scrollbar.css'; // Di chuyển import vào đây
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'; // Di chuyển import vào đây
import type { AppProps } from "next/app";
import { AnimatePresence } from "framer-motion";
import HeaderMenu from "../components/HeaderMenu";
import { motion } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <HeaderMenu />
      <AnimatePresence mode="wait">
        {" "}
        {/* Sử dụng mode='wait' */}
        <motion.div
          key={pageProps.key}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Component {...pageProps} />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
