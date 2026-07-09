import styles from "@/styles/components/hero.module.scss";

export default function Hero() {
  return (
    <section className={styles.hero}>
      <h1>シンプルなLPサンプル</h1>
      <p>React + TypeScriptで作成</p>
      <button>お問い合わせ</button>
    </section>
  );
}
