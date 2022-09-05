import React from "react";
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import Container from '@mui/material/Container';
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuth,  logout} from '../../redux/slices/auth';
import Switch from '@mui/material/Switch';
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    mode: "light",
  },
  typography: {
    button: {
      textTransform: "none",
      fontWeight: 400,
    },
  },
});

function changeTheme(){
  if(theme.palette.mode === "dark"){
    return theme.palette.mode = "light";
  }
  else{
    return theme.palette.mode = "dark";
  }
}

export const Header = () => {
  const dispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);

  const onClickLogout = () => {
    if(window.confirm('Вы уверены, что хотите выйти?')) {
      dispatch(logout());
      window.localStorage.removeItem('token');
    }
  };

  return (
    <div className={styles.root}>
      <Container maxWidth="lg">
        <div className={styles.inner}>
          <Link className={styles.logo} to="/">
            <div>COLLECTION SERVICE</div>
          </Link>
          <div className={styles.buttons}>
          <Switch onChange={() => changeTheme()}/>
            {isAuth ? (
              <>
              <Button>
                <Link to="/posts/personal">
                  <Avatar
                    variant="contained"
                    alt="Remy Sharp"
                    src=""
                    sx={{ width: 32, height: 32 }}
                  />
                </Link>
                </Button>
                <Link to="/add-post">
                  <Button variant="contained">Добавить коллекцию</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to="/register">
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};


export { theme };