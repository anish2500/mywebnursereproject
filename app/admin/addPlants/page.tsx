// app/admin/add-plants/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function AddPlantsPage() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // TODO: Replace with your actual API call
      // await fetch('/api/admin/plants', {
      //   method: 'POST',
      //   body: formData
      // });
      
      // Show success message
      alert('Plant added successfully!');
      // Redirect to plants list or reset form
      // router.push('/admin/plants');
    } catch (error) {
      console.error('Error adding plant:', error);
      alert('Failed to add plant. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header - Reused from home page */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-green-600">nurser</span>E Admin
          </h1>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => router.back()}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="md:flex md:items-center md:justify-between mb-8">
          <div className="flex-1 min-w-0">
            <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:truncate">
              Add New Plant
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Fill in the details below to add a new plant to your inventory.
            </p>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <form onSubmit={handleSubmit} className="space-y-8 divide-y divide-gray-200 p-6">
            <div className="space-y-8 divide-y divide-gray-200">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900">Plant Information</h3>
                  <p className="mt-1 text-sm text-gray-500">
                    Basic information about the plant.
                  </p>
                </div>

                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-3">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Plant Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="scientificName" className="block text-sm font-medium text-gray-700">
                      Scientific Name
                    </label>
                    <input
                      type="text"
                      name="scientificName"
                      id="scientificName"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Description <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="description"
                        name="description"
                        rows={3}
                        required
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Write a brief description about the plant.
                    </p>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                      Price (NPR) <span className="text-red-500">*</span>
                    </label>
                    <div className="mt-1 relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500 sm:text-sm">NPR</span>
                      </div>
                      <input
                        type="number"
                        name="price"
                        id="price"
                        min="0"
                        step="0.01"
                        required
                        className="pl-16 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="0.00"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                      Stock <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="number"
                      name="stock"
                      id="stock"
                      min="0"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                      Category <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-green-500 focus:outline-none focus:ring-green-500 sm:text-sm"
                      defaultValue=""
                    >
                      <option value="" disabled>Select a category</option>
                      <option>Indoor Plants</option>
                      <option>Outdoor Plants</option>
                      <option>Flowering Plants</option>
                      <option>Succulents</option>
                      <option>Bonsai</option>
                      <option>Herbs</option>
                    </select>
                  </div>

                  <div className="sm:col-span-6">
                    <label className="block text-sm font-medium text-gray-700">Plant Images</label>
                    <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                      <div className="space-y-1 text-center">
                        <svg
                          className="mx-auto h-12 w-12 text-gray-400"
                          stroke="currentColor"
                          fill="none"
                          viewBox="0 0 48 48"
                          aria-hidden="true"
                        >
                          <path
                            d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                            strokeWidth={2}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <div className="flex text-sm text-gray-600">
                          <label
                            htmlFor="file-upload"
                            className="relative cursor-pointer bg-white rounded-md font-medium text-green-600 hover:text-green-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-green-500"
                          >
                            <span>Upload files</span>
                            <input
                              id="file-upload"
                              name="file-upload"
                              type="file"
                              className="sr-only"
                              multiple
                            />
                          </label>
                          <p className="pl-1">or drag and drop</p>
                        </div>
                        <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                      </div>
                    </div>
                  </div>

                  <div className="sm:col-span-6">
                    <label htmlFor="care-instructions" className="block text-sm font-medium text-gray-700">
                      Care Instructions
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="care-instructions"
                        name="care-instructions"
                        rows={4}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500 sm:text-sm"
                        placeholder="Watering schedule, sunlight requirements, etc."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-5">
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                >
                  {isSubmitting ? 'Adding...' : 'Add Plant'}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>

      {/* Bottom Navigation - Same as home page */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 lg:hidden">
        <div className="max-w-3xl mx-auto px-2">
          <div className="flex justify-between">
            <Link
              href="/admin/home"
              className="w-full flex flex-col items-center justify-center px-2 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <span className="text-xl">🏠</span>
              <span className="mt-1">Home</span>
            </Link>
            <Link
              href="/admin/add-plants"
              className="w-full flex flex-col items-center justify-center px-2 py-3 text-sm font-medium text-green-600 border-t-2 border-green-500"
            >
              <span className="text-xl">➕</span>
              <span className="mt-1">Add Plants</span>
            </Link>
            <Link
              href="/admin/orders"
              className="w-full flex flex-col items-center justify-center px-2 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <span className="text-xl">📦</span>
              <span className="mt-1">Orders</span>
            </Link>
            <Link
              href="/admin/settings"
              className="w-full flex flex-col items-center justify-center px-2 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
            >
              <span className="text-xl">⚙️</span>
              <span className="mt-1">Settings</span>
            </Link>
          </div>
        </div>
      </nav>
    </div>
  );
}