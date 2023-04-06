import React, { useEffect, useState } from 'react';
import { fetchProperties } from './api/propertyAPI';
import './Listings.css';

interface Property {
  id: number;
  name: string;
  price: number;
  image: string;
}

const Listings: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <div className="listings-container">
      {loading ? (
        <p>Loading properties...</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        properties.map((property) => (
          <div className="property-card" key={property.id}>
            <p className="property-name">{property.name}</p>
            <img className="property-image" src={property.image} alt={property.name} />
            <p className="property-price">${property.price}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Listings;