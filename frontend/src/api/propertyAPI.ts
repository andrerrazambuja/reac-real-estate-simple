import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

export interface Property {
  id?: number;
  name: string;
  price: number;
  image?: string;
  numberOfRooms?: number;
  area?: number;
}

export const fetchProperties = async () => {
  const response = await axios.get(`${API_BASE_URL}/properties`);
  return response.data;
};

export const getPropertyById = async (id: number) => {
  const response = await axios.get(`${API_BASE_URL}/properties/${id}`);
  return response.data;
};

export const createProperty = async (property: Property) => {
  const response = await axios.post(`${API_BASE_URL}/properties`, property);
  return response.data;
};

export const updateProperty = async (property: Property) => {
  const response = await axios.put(`${API_BASE_URL}/properties/${property.id}`, property);
  return response.data;
};

export const deleteProperty = async (id?: number) => {
  if (!id) return; // handle the case where id is undefined

  const response = await axios.delete(`${API_BASE_URL}/properties/${id}`);
  return response.data;
};
