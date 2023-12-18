import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        src="/circles.svg"
        alt=".."
        className={styles.circles}
        width={323}
        height={15}
        priority
      />
      <h1>치타는 달린다</h1>
      <h2>짤 생성기</h2>
      <Image
        src="/circles.svg"
        alt=".."
        className={styles.circles}
        width={323}
        height={15}
        priority
      />

      <div className={styles.description}>
        <p>치타는 웃고 있다</p>
        <div />
        <p>아아..</p>
        <p>지금부터라도 달리면 되지 않을까?</p>
      </div>

      <Link className={styles.uglyButton} href="/generate">
        짤 생성하기
      </Link>
    </main>
  );
}
