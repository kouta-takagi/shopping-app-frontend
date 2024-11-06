import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className="bg-blue-600 text-white py-4 shadow-md">
      <div className="flex justify-between items-center w-full max-w-5xl mx-auto px-6">
        <Link href="/" className="font-bold text-2xl">
          通販アプリ
        </Link>
        <Link href="/cart_items">
          <FontAwesomeIcon icon={faCartShopping} className="text-2xl" />
        </Link>
      </div>
    </header>
  );
}
