import React, { useEffect, useState } from 'react';
import { useAccount, useConnect, useDisconnect, useEnsName, useBalance, useNetwork } from 'wagmi';
import { Menu, MenuItem, Button, Typography, Snackbar, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const WalletDropdown = () => {
  const { address, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: ensName } = useEnsName({ address });
  const { data: balanceData, isLoading: balanceLoading } = useBalance({ addressOrName: address });
  const { chain } = useNetwork();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(address);
    setSnackbarOpen(true);
  };

  const handleDisconnect = () => {
    disconnect();
    handleClose();
  };

  useEffect(() => {
    if (isConnected) {
      // Fetch additional data like transaction history here
    }
  }, [isConnected]);

  return (
    <div>
      <Button onClick={handleClick}>
        {isConnected ? ensName ?? address : 'Connect Wallet'}
      </Button>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {isConnected ? (
          <>
            <MenuItem onClick={handleDisconnect}>Disconnect</MenuItem>
            <MenuItem onClick={handleClose}>
              <Typography>Your Wallet: {ensName ?? address}</Typography>
              <Typography>
                Balance: {balanceLoading ? 'Loading...' : `${balanceData?.formatted} ${balanceData?.symbol}`}
              </Typography>
              <Typography>Network: {chain?.name ?? 'Unknown Network'}</Typography>
              <Button onClick={handleCopyAddress}>Copy Address</Button>
            </MenuItem>
          </>
        ) : (
          connectors.map((connector) => (
            <MenuItem key={connector.id} onClick={() => connect(connector)}>
              {connector.name}
            </MenuItem>
          ))
        )}
      </Menu>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
        message="Address copied to clipboard!"
        action={
          <IconButton size="small" aria-label="close" color="inherit" onClick={() => setSnackbarOpen(false)}>
            <CloseIcon fontSize="small" />
          </IconButton>
        }
      />
    </div>
  );
};

export default WalletDropdown;
