import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Property, updateProperty, deleteProperty, getPropertyById } from './api/propertyAPI';
import './EditProperty.css';

interface Props {
  property: Property;
  onPropertyUpdated: () => void;
  onPropertyDeleted: () => void;
}

const EditProperty: React.FC<Props> = ({ onPropertyUpdated, onPropertyDeleted }) => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState<Property | undefined>(undefined);
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [numberOfRooms, setNumberOfRooms] = useState<number>(0);
  const [area, setArea] = useState<number>(0);

  const navigate = useNavigate();
  const handleUpdate = async () => {
    if (property) {
      try {
        await updateProperty({ id: property.id, name, price, image, numberOfRooms, area });
        onPropertyUpdated();
        navigate('/admin');
      } catch (error) {
        console.error('Error updating property:', error);
      }
    }
  };
  const handleDelete = async () => {
    try {
      await deleteProperty(parseInt(id || ""));
      onPropertyDeleted();
    } catch (error) {
      console.error('Error deleting property:', error);
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      if (id !== undefined) {
        try {
          const propertyData = await getPropertyById(parseInt(id));
          setProperty(propertyData);
          setName(propertyData.name);
          setPrice(propertyData.price);
          setImage(propertyData.image);
          setNumberOfRooms(propertyData.number_of_rooms);
          setArea(propertyData.area);
        } catch (error) {
          console.error('Error fetching property:', error);
        }
      }
    };

    fetchProperty();
  }, [id]);

  return (
    <div className="edit-property">
      <h2>Edit Property</h2>
      <label>
        Name:
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
      </label>
      <label>
        Image:
        <input type="text" value={image} onChange={(e) => setImage(e.target.value)} />
      </label>
      <label>
        Number of Rooms:
        <input type="number" value={numberOfRooms} onChange={(e) => setNumberOfRooms(Number(e.target.value))} />
      </label>
      <label>
        Area:
        <input type="number" value={area} onChange={(e) => setArea(Number(e.target.value))} />
      </label>
      <button onClick={handleUpdate}>Update Property</button>
      <button onClick={handleDelete}>Delete Property</button>
    </div>
  );
};

export default EditProperty;
