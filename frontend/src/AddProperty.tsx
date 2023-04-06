import React, { useState } from 'react';
import { createProperty } from './api/propertyAPI';
import './AddProperty.css';

interface Props {
  onPropertyAdded: () => void;
}

const AddProperty: React.FC<Props> = ({ onPropertyAdded }) => {
  const [name, setName] = useState<string>('');
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<string>('');
  const [numberOfRooms, setNumberOfRooms] = useState<number>(0);
  const [area, setArea] = useState<number>(0);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      await createProperty({ name, price, image, numberOfRooms, area });
      setName('');
      setPrice(0);
      setImage('');
      setNumberOfRooms(0);
      setArea(0);
      onPropertyAdded();
    } catch (error) {
      console.error('Error creating property:', error);
    }
  };

  return (
    <div className="add-property-container">
      <h2 className="add-property-title">Add Property</h2>
      <form onSubmit={handleSubmit} className="add-property-form">
        <label className="add-property-label">
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="add-property-input" />
        </label>
        <label className="add-property-label">
          Price:
          <input type="number" value={price} onChange={(e) => setPrice(Number(e.target.value))} className="add-property-input" />
        </label>
        <label className="add-property-label">
          Image:
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="add-property-input" />
        </label>
        <label className="add-property-label">
          Number of Rooms:
          <input type="number" value={numberOfRooms} onChange={(e) => setNumberOfRooms(Number(e.target.value))} className="add-property-input" />
        </label>
        <label className="add-property-label">
          Area:
          <input type="number" value={area} onChange={(e) => setArea(Number(e.target.value))} className="add-property-input" />
        </label>
        <button type="submit" className="add-property-button">Add Property</button>
      </form>
    </div>
  );
};

export default AddProperty;
