import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login, Personal } from "./pages";
import React from "react";
import { fetchAuthMe} from './redux/slices/auth';
import { theme } from "./components/Header";

import { ThemeProvider } from "@mui/material";
import Paper from '@mui/material/Paper';
export function App() {
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  console.log(Header.theme, 'Header.theme')

  return (
    <ThemeProvider theme={theme}>
      <Paper style={{height: "100%"}}>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/posts/:id" element={<FullPost />} />
          <Route path="/posts/:id/edit" element={<AddPost />} />
          <Route path="/posts/personal" element={<Personal />} />
          <Route path="/add-post" element={<AddPost />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
        </Routes>
      </Container>
      </Paper>
      </ThemeProvider>
  );
}

export default App;
