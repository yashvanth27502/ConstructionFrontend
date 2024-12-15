import { useParams } from 'react-router-dom';

const subcategories = {
  metal: [
    { title: 'Steel', description: 'Steel is a versatile material used for construction.' },
    { title: 'Aluminum', description: 'Aluminum is a lightweight and durable material.' },
  ],
  wood: [
    { title: 'Oak', description: 'Oak is a strong and durable hardwood.' },
    { title: 'Pine', description: 'Pine is a softwood, commonly used for framing.' },
  ],
  // Add other categories and subcategories here
};

function Category() {
  const { categoryName } = useParams();
  const categorySubcategories = subcategories[categoryName] || [];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-center">{categoryName.charAt(0).toUpperCase() + categoryName.slice(1)}</h2>
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categorySubcategories.map((subcategory) => (
          <div key={subcategory.title} className="max-w-xs mx-auto rounded-lg border p-4 shadow-lg">
            <h3 className="text-xl font-semibold">{subcategory.title}</h3>
            <p className="mt-2 text-sm">{subcategory.description}</p>
          </div>
        ))}
      </div>
  {/* Add more subcategory cards here */}
</div>
  );
}

export default Category;
