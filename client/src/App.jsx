import { BrowserRouter as Router } from 'react-router-dom';
import '@/App.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import AppRoutes from '@/routes/AppRoutes';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
