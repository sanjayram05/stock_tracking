
import './App.css';
import { AppProvider } from './context/contex';
import StockOverview from './pages/StockOverview';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import StockDetail from './pages/StockDetail';
function App() {
  return (
    <div className="App">
        <AppProvider>
        <Router>
          <Routes>
        <Route path='/' element={<StockOverview />} />
        <Route path='/detail/:symbol' element={<StockDetail />} />
        </Routes>
        </Router>
        </AppProvider>
    </div>

  );
}

export default App;
