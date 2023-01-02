import { Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const ButtonStyled = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ActionButton = ({ children, onClick, ...other }) => {
  return (
    <ButtonStyled onClick={onClick} {...other}>
      {children}
    </ButtonStyled>
  );
};

export default ActionButton;
