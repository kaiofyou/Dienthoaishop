import styles from "./Footer.module.css";

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p>
          &copy; {new Date().getFullYear()} Dienthoai Shop. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
