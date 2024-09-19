import styles from "./page.module.scss";
import Influencers from "./components/influencers";
export default function Home() {
  return (
    <div className={styles.container}>
      <Influencers />
    </div>
  );
}
