import Link from "next/link";
import { motion } from "framer-motion";

const HeaderMenu = () => {
  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 p-4 bg-gray-800 shadow-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex justify-between max-w-3xl mx-auto">
        <Link href="/" className="text-xl font-bold text-white">
          Trang Chủ
        </Link>
        <Link href="/profile" className="text-xl font-bold text-white">
          Hồ Sơ
        </Link>
        {/* Thêm các liên kết khác ở đây nếu cần */}
      </div>
    </motion.nav>
  );
};

export default HeaderMenu;
