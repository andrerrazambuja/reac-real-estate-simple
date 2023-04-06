import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AdminListings from './AdminListings';
import './Admin.css';

const Admin: React.FC = () => {
  const navigate = useNavigate();

  const handleAddPropertyClick = () => {
    navigate('/admin/add-property');
  };

  return (
    <div className="admin-container">
        <AdminListings />
        <button className="add-property-button" onClick={handleAddPropertyClick}>Add Property</button>
    </div>
  );
};

export default Admin;
