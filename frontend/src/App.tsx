import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Header';
import Home from './Home';
import Listings from './Listings';
import Admin from './Admin';
import AddProperty from './AddProperty';
import EditProperty from './EditProperty';
import NotFound from './NotFound';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/listings" element={<Listings />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/add-property" element={<AddProperty onPropertyAdded={() => {}} />} />
          <Route path="/admin/edit-property/:id" element={<EditProperty property={{ id: 0, name: '', price: 0 }} onPropertyUpdated={() => {}} onPropertyDeleted={() => {}} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;