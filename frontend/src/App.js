import './App.css';
import Home from './pages/Home';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
function App() {
  const token = Cookies.get('token');
  if (!token) {
    localStorage.removeItem('user');
  }
  return (
    <>
      <Home />
    </>
  );
}
export default App;
