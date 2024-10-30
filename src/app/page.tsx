import Link from "next/link";

export default function Home() {
  return (
    <>
      <header>
        <Link href="/" className="font-bold text-xl no-underline">
          通販アプリ
        </Link>
        <Link href=""></Link>
        <FontAwesomeIcon icon="fa-solid fa-cart-shopping" />
      </header>
      <div></div>
      <footer></footer>
    </>
  );
}
