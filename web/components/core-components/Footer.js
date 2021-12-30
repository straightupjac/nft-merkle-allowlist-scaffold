import Box from "@mui/material/Box";
import styles from '@styles/Home.module.css';
import Typography from '@mui/material/Typography';
import MuiNextLink from '@components/core-components/MuiNextLink';
import { Twitter } from "@mui/icons-material";
import { Stack } from "@mui/material";

const Footer = () => {
  return (
  <Box component="footer" alignItems="center" className={styles.footer} sx={{ py: 5, px: 4 }}>
      <Stack
        direction="row"
        alignItems="center"
        spacing={4}
      >
        <MuiNextLink
          sx={{ textDecoration: "none", color: 'black' }}
          href="https://twitter.com/straightupjac"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Twitter fontSize="large" />
        </MuiNextLink>
        <Typography >
          © {new Date().getFullYear()}
        </Typography>
      </Stack>
  </Box>);
};

export default Footer;
