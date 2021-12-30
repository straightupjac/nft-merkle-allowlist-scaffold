import { Container, Grid } from '@mui/material';
import styles from '../styles/Home.module.css';

const GetStarted = () => {
  return (
    <Container width="100%">
      <Grid container justifyContent="center" alignItems="center">
        <a href="https://github.com/straightupjac/nft-merkle-whitelist-scaffold/tree/main/contracts" target="_blank" rel="noreferrer" className={styles.card}>
          <h2>Contract Setup&rarr;</h2>
          <p>Set up your ERC721 contract, merkle whitelist and deploy.</p>
        </a>
        <a href="https://github.com/straightupjac/nft-merkle-whitelist-scaffold/tree/main/web" target="_blank" rel="noreferrer" className={styles.card}>
          <h2>Web Setup&rarr;</h2>
          <p>Set up your web interface.</p>
        </a>

        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank" rel="noreferrer"
          className={styles.card}
        >
          <h2>Deploy &rarr;</h2>
          <p>
            Instantly deploy your Next.js to a public URL with Vercel.
          </p>
        </a>
        <a
          href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank" rel="noreferrer"
          className={styles.card}
        >
          <h2>Feedback &rarr;</h2>
          <p>
            Noticed an issue? Create an issue, open a PR or reach out to me <a href="https://twitter.com/straightupjac" target="_blank" rel="noreferrer">@straightupjac</a>
          </p>
        </a>
      </Grid>
    </Container>
);
}

export default GetStarted;
