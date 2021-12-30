import { Container, Stack } from "@mui/material";

const About = () => {
  return (
    <Container sx={{py: 5}}>
      <Stack spacing={2}>
      <h1>About</h1>
      <p>
        This is an about page
      </p>
      </Stack>
    </Container>
  )
};

export default About;