import CloseIcon from '@mui/icons-material/Close';
import { Container, IconButton, Modal as MuiModal, SxProps } from '@mui/material';

interface IModal {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  sx?: SxProps;
}

export default function Modal({ open, onClose, children, sx }: IModal) {
  return (
    <MuiModal onClose={onClose} open={open}>
      <Container
        maxWidth='md'
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          maxHeight: '90vh',
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          rowGap: 2,
          bgcolor: 'background.paper',
          boxShadow: 24,
          borderRadius: 4,
          border: '3px solid black',
          p: 4,
          width: { xs: '95vw' },
          ...sx,
        }}
      >
        <IconButton
          color='inherit'
          onClick={onClose}
          sx={{ position: 'absolute', top: 1, right: 1 }}
        >
          <CloseIcon />
        </IconButton>
        {children}
      </Container>
    </MuiModal>
  );
}
