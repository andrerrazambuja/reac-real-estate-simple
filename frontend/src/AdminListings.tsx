import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { fetchProperties } from './api/propertyAPI';
import './AdminListings.css';

interface Property {
  id: number;
  name: string;
  price: number;
  image: string;
}

const AdminListings: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [showPopup, setShowPopup] = useState<boolean>(false);
  const [popupImage, setPopupImage] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertiesData = await fetchProperties();
        setProperties(propertiesData);
      } catch (error) {
        console.error('Error fetching properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleImageClick = (image: string) => {
    setPopupImage(image);
    setShowPopup(true);
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="admin-listings-container">
      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Price</th>
              <th colSpan={2}></th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.name}</td>
                <td>${property.price}</td>
                <td>
                  <button onClick={() => handleImageClick(property.image)} className="property-image-btn">
                    View Image
                  </button>
                </td>
                <td>
                  <Link to={`/admin/edit-property/${property.id}`}>Edit</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showPopup && (
        <div className="property-image-popup">
          <button onClick={handlePopupClose} className="property-image-popup-close">
            X
          </button>
          <img src={popupImage} alt="Property" />
        </div>
      )}
    </div>
  );
};

export default AdminListings;
