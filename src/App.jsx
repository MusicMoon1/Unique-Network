import { theme } from './utils/Theme'
import './App.css'
import Routes from './pages/Routes'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuthcontexts } from './context/Authcontexts';
import { Box, CircularProgress } from '@mui/material';


function App() {
  const { isAppLoading } = useAuthcontexts()


  if (isAppLoading)
    return (
      <Box sx={{ width: "100%", height: "100vh",background:theme.colors.background, display: "flex", justifyContent: "center", alignItems: "center" }}>
        {/* <CircularProgress color="success"/> */}
        <div className="loader"></div>
      </Box>
    )
  return (
    <>
      <Routes />
      <ToastContainer />
    </>
  );

}

export default App
