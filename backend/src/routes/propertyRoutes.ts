import { Router } from 'express';
import { getAllProperties, getPropertyById, createProperty, updateProperty, deleteProperty } from '../controllers/propertyController';


const router = Router();

// Get all properties
router.get('/properties', getAllProperties);

// Get a property by ID
router.get('/properties/:id', getPropertyById);


// Create a new property
router.post('/properties', createProperty);

// Update an existing property
router.put('/properties/:id', updateProperty);

// Delete an existing property
router.delete('/properties/:id', deleteProperty);

export default router;