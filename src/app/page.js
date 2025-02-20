import Roadmap from "./components/Roadmap";
import { default as styles } from "./styles/Roadmap.module.css";

export default function Home() {
  return (
    <div className={styles.roadmap}>
      <h1 className={styles.header}>Welcome to the Learning Roadmap</h1>
      <Roadmap />
    </div>
  );
}
