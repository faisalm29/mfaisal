import styles from "./page.module.css";
import { css } from "@pigment-css/react";

const heading = css(({ theme }) => ({
  color: theme.colors.primary,
  fontFamily: theme.fontFamily,
  fontFeatureSettings: theme.fontFeatureSettings,
}));

export default function Home() {
  return (
    <div>
      <h1 className={heading}>
        Hello, World! ini adalah budi 0123456789 rt tt ff yang hilang tumbuh,
        yang patah berganti Rasakan itu Quontol →↗↖↙↘ Illumination Difficult
        Difftent rf kt Geist
      </h1>
    </div>
  );
}
