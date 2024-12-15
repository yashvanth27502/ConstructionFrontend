import React, { useState } from 'react';
import { PencilIcon, TrashIcon } from '@heroicons/react/24/solid';

const MaterialTable = ({ materials, onEdit, onDelete }) => {
  const [expandedDescription, setExpandedDescription] = useState(null);

  const handleDescriptionToggle = (materialId) => {
    setExpandedDescription(prev => (prev === materialId ? null : materialId));
  };

  return (
    <div className="overflow-x-auto mt-8">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="border-b">
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Machine No</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Name</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Category</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Subcategory</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Description</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Price</th>
            <th className="px-6 py-3 text-left text-sm font-medium text-gray-500">Actions</th>
          </tr>
        </thead>
        <tbody>
          {materials.map((material) => (
            <tr key={material.id} className="border-b hover:bg-gray-50">
              {/* Machine No */}
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                MACHINE-{material.id}
              </td>

              {/* Name */}
              <td className="px-6 py-4 text-sm font-medium text-gray-900">{material.name}</td>

              {/* Category */}
              <td className="px-6 py-4 text-sm text-gray-500">{material.category}</td>

              {/* Subcategory */}
              <td className="px-6 py-4 text-sm text-gray-500">{material.name}</td>

              {/* Description */}
              <td className="px-6 py-4 text-sm text-gray-500">
                {material.description && material.description.length > 200 ? (
                  <>
                    {expandedDescription === material.id
                      ? material.description
                      : `${material.description.substring(0, 200)}...`}
                    <button
                      onClick={() => handleDescriptionToggle(material.id)}
                      className="text-indigo-600 hover:text-indigo-800 ml-2"
                    >
                      {expandedDescription === material.id ? 'Read Less' : 'Read More'}
                    </button>
                  </>
                ) : (
                  material.description || 'No description available'  // Handle empty descriptions
                )}
              </td>

              {/* Price */}
              <td className="px-6 py-4 text-sm text-gray-500">{material.price}</td>

              {/* Actions (Edit/Delete) */}
              <td className="px-6 py-4 text-sm text-gray-500">
                <button
                  onClick={() => onEdit(material)}
                  className="text-indigo-600 hover:text-indigo-800 mr-2"
                >
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button
                  onClick={() => onDelete(material.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MaterialTable;
