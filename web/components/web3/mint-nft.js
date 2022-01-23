import { Grid, Stack } from '@mui/material';
import { useWeb3React } from '@web3-react/core';
import { useEffect, useState } from 'react';
import { mintGift, mintPublic, mintWhitelist, sampleNFT } from '@pages/utils/_web3';
import MintNFTCard from './mint-nft-card';
import useSWR from 'swr';
import Web3 from 'web3';

const NOT_CLAIMABLE = 0;
const ALREADY_CLAIMED = 1;
const CLAIMABLE = 2;

const MintNFT = () => {
  const web3 = new Web3(Web3.givenProvider)

  const fetcher = (url) => fetch(url).then((res) => res.json());
  const { active, account, chainId } = useWeb3React();

  const [giftClaimable, setGiftClaimable] = useState(NOT_CLAIMABLE);
  const [whitelistClaimable, setWhitelistClaimable] = useState(NOT_CLAIMABLE);
  const [alreadyClaimed, setAlreadyClaimed] = useState(false);

  const [giftMintStatus, setGiftMintStatus] = useState();
  const [whitelistMintStatus, setWhitelistMintStatus] = useState();
  const [publicMintStatus, setPublicMintStatus] = useState();

  const [numToMint, setNumToMint] = useState(2);

  useEffect(() => {
    if (!active || !account) {
      setAlreadyClaimed(false);
      return;
    }
    async function checkIfClaimed() {
      sampleNFT.methods.claimed(account).call({ from: account }).then((result) => {
        setAlreadyClaimed(result);
      }).catch((err) => {
        setAlreadyClaimed(false);
      });
    }
    checkIfClaimed();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account])


  let giftProof = [];
  let giftValid = false;
  const giftRes = useSWR(active && account ? `/api/giftProof?address=${account}` : null, {
    fetcher, revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });
  if (!giftRes.error && giftRes.data) {
    const { proof, valid } = giftRes.data;
    giftProof = proof;
    giftValid = valid;
  }

  useEffect(() => {
    if (!active || !giftValid) {
      setGiftClaimable(NOT_CLAIMABLE);
      return;
    } else if (alreadyClaimed) {
      setGiftClaimable(ALREADY_CLAIMED);
      return;
    }
    async function validateClaim() {
      sampleNFT.methods.mintGift(giftProof).call({ from: account }).then(() => {
        setGiftClaimable(CLAIMABLE);
      }).catch((err) => {
        if (err.toString().includes('claimed')) { setGiftClaimable(ALREADY_CLAIMED)}
        else { setGiftClaimable(NOT_CLAIMABLE) }
      });
    }
    validateClaim();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [giftProof])

  let whitelistProof = [];
  let whitelistValid = false;
  const whitelistRes = useSWR(active && account ? `/api/whitelistProof?address=${account}` : null, {
    fetcher, revalidateIfStale: false, revalidateOnFocus: false, revalidateOnReconnect: false });
  if (!whitelistRes.error && whitelistRes.data) {
    const { proof, valid } = whitelistRes.data;
    whitelistProof = proof;
    whitelistValid = valid;
  }

  useEffect(() => {
    if (!active || !whitelistValid) {
      setWhitelistClaimable(NOT_CLAIMABLE);
      return;
    } else if (alreadyClaimed) {
      setWhitelistClaimable(ALREADY_CLAIMED);
      return;
    }
    async function validateClaim() {
      const amount = '0.01';
      const amountToWei = web3.utils.toWei(amount, 'ether');
      sampleNFT.methods.mintWhitelist(whitelistProof).call({ from: account, value: amountToWei }).then(() => {
        setWhitelistClaimable(CLAIMABLE);
      }).catch((err) => {
        if (err.toString().includes('claimed')) { setWhitelistClaimable(ALREADY_CLAIMED)}
        else { setWhitelistClaimable(NOT_CLAIMABLE) }
      });
    }
    validateClaim();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [whitelistProof])


  const onMintGift = async () => {
    const { success, status } = await mintGift(account, giftProof);
    console.log(status);
    setGiftMintStatus(success);
  };

  const onMintWhitelist = async () => {
    const { success, status } = await mintWhitelist(account, whitelistProof);
    console.log(status);
    setWhitelistMintStatus(success);
  };

  const onPublicMint = async () => {
    const { success, status } = await mintPublic(account, numToMint);
    console.log(status);
    setPublicMintStatus(success);
  };

  return (
    <>
      <Stack id="demo">
        <h2>Mint an NFT</h2>
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          <Grid item>
            <MintNFTCard
              title={'Gift Mint'}
              description={'Mint this sample NFT to the connected wallet. Must be on gift whitelist.'}
              canMint={giftClaimable}
              mintStatus={giftMintStatus}
              action={onMintGift}
            />
          </Grid>
          <Grid item>
            <MintNFTCard
              title={'Whitelist Mint'}
              description={'Mint this sample NFT to the connected wallet. Must be on whitelist. Cost: 0.01 ETH'}
              canMint={whitelistClaimable}
              mintStatus={whitelistMintStatus}
              action={onMintWhitelist}
            />
          </Grid>
          <Grid item>
            <MintNFTCard
              title={'Public Mint'}
              description={'Mint this sample NFT to the connected wallet. Open for any wallet to mint. Cost: 0.02 ETH'}
              canMint={active}
              mintStatus={publicMintStatus}
              showNumToMint={true}
              setNumToMint={setNumToMint}
              action={onPublicMint}
            />
          </Grid>
        </Grid>
      </Stack>
    </>
  );
}

export default MintNFT;