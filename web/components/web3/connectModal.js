import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import styled from 'styled-components';
import Image from 'next/image';
import Stack from '@mui/material/Stack';

export default function ConnectModal(props) {
  const { isModalVisible, handleClose, handleLoginClick } = props;
  return (
    <>
      <Modal
        open={isModalVisible}
        onClose={handleClose}
        onBackdropClick={handleClose}
      >
        <Box sx={style}>
        <Stack>
          <Coinbase onClick={() => handleLoginClick('coinbase')}>
            <Image
              src="/wallets/coinbase.png"
              height={55}
              width={320}
              alt="login with Coinbase Wallet!"
            />
          </Coinbase>
          <WalletConnect onClick={() => handleLoginClick('walletconnect')}>
          <Image
              src="/wallets/walletconnect.svg"
              height={100}
              width={300}
              alt="login with Wallet Connect!"
            />
          </WalletConnect>
          <Metamask onClick={() => handleLoginClick('metamask')}>
            <Image
              src="/wallets/metamask.svg"
              height={100}
              width={300}
              alt="login with Metamask!"
            />
          </Metamask>
          <CloseModal>
            <div className="close-inner" onClick={() => handleClose()}>
              Close
            </div>
          </CloseModal>
        </Stack>
        </Box>
      </Modal>
    </>
  )
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 380,
  bgcolor: 'white',
  border: '0px',
  boxShadow: 24,
  marginLeft: 'auto',
  marginRight: 'auto',
  p: 4,
};

export const Coinbase = styled.div`
  padding-top: 20px;
  padding-bottom: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;

  :hover {
    opacity:0.8;
  }
`

export const WalletConnect = styled.div`
  cursor: pointer;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px solid #eee;

  :hover {
    opacity:0.8;
  }
`

export const Metamask = styled.div`
  cursor: pointer;

  :hover {
    opacity:0.8;
  }
`

const CloseModal = styled.div`
  padding-top: 2rem;

  .close-inner {
    text-transform:uppercase;
    font-family: "Space Mono", sans-serif;
    display:table;
    cursor:pointer;
    margin:0 auto;
    transition:0.2s all cubic-bezier(0.165, 0.84, 0.44, 1);

    color: rgba(0,0,0,0.4);
  }

  .close-inner:hover {
    color: rgba(0,0,0,0.2);
  }
`