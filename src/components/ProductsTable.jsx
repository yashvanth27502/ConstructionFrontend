import React, { useState } from 'react';
import MaterialTable from './MaterialTable';

const ProductsTable = () => {
  const [materials, setMaterials] = useState([
    { id: 1, name: 'Steel', category: 'Metal', price: '$120' },
    { id: 2, name: 'Aluminum', category: 'Metal', price: '$100' },
    { id: 3, name: 'Copper', category: 'Metal', price: '$150' },
    { id: 4, name: 'Iron', category: 'Metal', price: '$90' },
  ]);

  const handleEdit = (material) => {
    // Handle edit logic here (e.g., open the edit form with the material data)
    console.log('Edit material:', material);
  };

  const handleDelete = (id) => {
    // Handle delete logic here (e.g., remove the material from state)
    setMaterials(materials.filter((material) => material.id !== id));
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="mt-3 text-center text-4xl font-semibold mb-6 w-full h-100px">Products Table</h2>
      <MaterialTable materials={materials} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default ProductsTable;
