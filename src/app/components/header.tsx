import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Header() {
  return (
    <header className="py-5 bg-blue-600">
      <div className="flex justify-between">
        <Link
          href="/"
          className="font-bold text-2xl text-black no-underline ml-10"
        >
          通販アプリ
        </Link>
        <Link href="/cart_items">
          <FontAwesomeIcon
            icon={faCartShopping}
            className="text-2xl text-black mr-10"
          />
        </Link>
      </div>
    </header>
  );
}
