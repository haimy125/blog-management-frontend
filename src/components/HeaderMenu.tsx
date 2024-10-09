import Link from "next/link";
import { motion } from "framer-motion";

const HeaderMenu = () => {
  return (
    <motion.nav
      className="bg-gray-800 p-4 fixed top-0 left-0 right-0 z-50" // Thêm lớp CSS để giữ cố định
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-3xl mx-auto flex justify-between">
        <Link href="/" className="text-white font-bold text-xl">
          Trang Chủ
        </Link>
        <Link href="/profile" className="text-white font-bold text-xl">
          Hồ Sơ
        </Link>
        {/* Thêm các liên kết khác ở đây nếu cần */}
      </div>
    </motion.nav>
  );
};

export default HeaderMenu;
