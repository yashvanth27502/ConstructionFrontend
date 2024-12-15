import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';

const MaterialForm = ({ materialToEdit, onSave }) => {
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm();

  const categoryOptions = ["Metal", "Wood", "Concrete", "Glass"];
  const subcategoryOptions = {
    Metal: ["Cast Iron", "Steel", "Aluminum"],
    Wood: ["Plywood", "Hardwood", "Softwood"],
    Concrete: ["Precast", "Ready-Mix"],
    Glass: ["Tempered", "Laminated", "Frosted"],
  };

  const selectedCategory = watch("category");

  useEffect(() => {
    if (materialToEdit) {
      Object.keys(materialToEdit).forEach((key) => setValue(key, materialToEdit[key]));
    } else {
      reset();
    }
  }, [materialToEdit, setValue, reset]);

  const onSubmit = async (data) => {
    try {
      await onSave(data); // Call onSave to handle the save logic externally

      // Display success message
      setMessage('Material saved successfully!');
      setMessageType('success');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    } catch (error) {
      // Display error message
      setMessage('Error in saving the material.');
      setMessageType('error');
      setTimeout(() => setMessage(''), 3000); // Clear message after 3 seconds
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">
        {materialToEdit ? 'Edit Material' : 'Add Material'}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Category Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Category</label>
          <select
            {...register("category", { required: "Category is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          >
            <option value="">Select a category</option>
            {categoryOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm">{errors.category.message}</p>}
        </div>

        {/* Subcategory Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Subcategory</label>
          <Controller
            name="subcategory"
            control={control}
            rules={{ required: "Subcategory is required" }}
            render={({ field }) => (
              <select
                {...field}
                className="w-full border border-gray-300 p-2 rounded"
                disabled={!selectedCategory}
              >
                <option value="">Select a subcategory</option>
                {selectedCategory &&
                  subcategoryOptions[selectedCategory]?.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
              </select>
            )}
          />
          {errors.subcategory && <p className="text-red-500 text-sm">{errors.subcategory.message}</p>}
        </div>

        {/* Name Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            {...register("name", { required: "Name is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Description</label>
          <textarea
            {...register("description", { required: "Description is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          ></textarea>
          {errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}
        </div>

        {/* Price Field */}
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Price</label>
          <input
            type="number"
            {...register("price", { required: "Price is required" })}
            className="w-full border border-gray-300 p-2 rounded"
          />
          {errors.price && <p className="text-red-500 text-sm">{errors.price.message}</p>}
        </div>

        <button
          type="submit"
          className="w-full text-white p-2 rounded hover:bg-green-600"
          style={{ backgroundColor: 'green' }}
        >
          Save
        </button>
      </form>

      {/* Message Section */}
      {message && (
        <div
          className={`mt-4 text-center p-2 rounded ${
            messageType === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
};

export default MaterialForm;
