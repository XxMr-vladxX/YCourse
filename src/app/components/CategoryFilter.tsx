import { Code, Palette, Box, Gamepad2 } from 'lucide-react';
import { categories } from '../data/courses';

interface CategoryFilterProps {
  selectedCategory: number | null;
  onCategoryChange: (categoryId: number | null) => void;
}

const iconMap: Record<string, any> = {
  'code': Code,
  'palette': Palette,
  'box': Box,
  'gamepad-2': Gamepad2,
};

export function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="w-full overflow-x-auto">
      <div className="flex gap-3 pb-4">
        <button
          onClick={() => onCategoryChange(null)}
          className={`flex-shrink-0 rounded-xl px-6 py-3 text-sm font-medium transition-all ${
            selectedCategory === null
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Todos los cursos
        </button>
        {categories.map((category) => {
          const Icon = iconMap[category.icon];
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`flex-shrink-0 flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-all ${
                selectedCategory === category.id
                  ? 'text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              style={{
                backgroundColor: selectedCategory === category.id ? category.color : undefined,
                boxShadow: selectedCategory === category.id ? `0 10px 40px -10px ${category.color}60` : undefined,
              }}
            >
              <Icon className="h-4 w-4" />
              {category.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
