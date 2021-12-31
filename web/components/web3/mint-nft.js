import { Button, Card, CardActions, CardContent, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';

const MintNFT = () => {
  return (
    <>
      <Stack id="demo">
        <h2>Mint an NFT</h2>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item>
            <Card sx={{ maxWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Gift Mint
                </Typography>
                <Image alt="sample NFT" src='/sample-nft.png' width={250} height={250}/>
                <p>Mint this sample NFT to the connected wallet.</p>
              </CardContent>
              <CardActions>
                <Button variant="contained">Mint</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Whitelist Mint
                </Typography>
                <Image alt="sample NFT" src='/sample-nft.png' width={250} height={250}/>
                <p>Mint this sample NFT to the connected wallet. Cost: 0.01 ETH</p>
              </CardContent>
              <CardActions>
                <Button variant="contained">Mint</Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ maxWidth: 275 }}>
              <CardContent>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                  Public Mint
                </Typography>
                <Image alt="sample NFT" src='/sample-nft.png' width={250} height={250}/>
                <p>Mint this sample NFT to the connected wallet. Cost: 0.02 ETH</p>
              </CardContent>
              <CardActions>
                <Button variant="contained">Mint</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default MintNFT;