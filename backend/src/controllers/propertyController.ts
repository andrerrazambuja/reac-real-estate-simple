import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Property } from '../entities/Property';

export const getAllProperties = async (req: Request, res: Response) => {
  const propertyRepository = getRepository(Property);
  try {
    const properties = await propertyRepository.find();
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching properties', error });
  }
};

export const getPropertyById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const propertyRepository = getRepository(Property);
  try {
    const property = await propertyRepository.findOne({ where: { id } });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching property', error });
  }
};

export const createProperty = async (req: Request, res: Response) => {
  const propertyRepository = getRepository(Property);
  try {
    const newProperty = propertyRepository.create(req.body);
    const savedProperty = await propertyRepository.save(newProperty);
    res.json(savedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error creating property' });
  }
};

export const updateProperty = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const propertyRepository = getRepository(Property);
  try {
    const property = await propertyRepository.findOne({ where: { id } });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    const updatedProperty = propertyRepository.merge(property, req.body);
    const savedProperty = await propertyRepository.save(updatedProperty);
    res.json(savedProperty);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error updating property' });
  }
};

export const deleteProperty = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const propertyRepository = getRepository(Property);
  try {
    const property = await propertyRepository.findOne({ where: { id } });
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    await propertyRepository.delete(id);
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error deleting property' });
  }
};