import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <header>
        <div className="flex justify-between w-full">
          <Link href="/" className="font-bold text-xl no-underline">
            通販アプリ
          </Link>
          <Link href="/cart_items">
            <FontAwesomeIcon icon={faCartShopping} className="size-6" />
          </Link>
        </div>
      </header>
      <div className="flex justify-between">
        <p>ka</p>
        <p>sa</p>
      </div>
      <footer></footer>
    </>
  );
}
