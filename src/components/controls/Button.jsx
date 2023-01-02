import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const ButtonStyled = styled(Button)(({ theme }) => ({
  margin: theme.spacing(0.5),
  textTransform: 'none',
}));

const ButtonX = ({ text, size, color, variant, onClick, ...other }) => {
  return (
    <ButtonStyled
      variant={variant}
      size={size || 'large'}
      color={color || 'primary'}
      onClick={onClick}
      {...other}
    >
      {text}
    </ButtonStyled>
  );
};

export default ButtonX;
