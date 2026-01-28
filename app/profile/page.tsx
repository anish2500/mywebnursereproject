'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from "@/context/AuthContext";
import Link from 'next/link';
import { handleUpdateProfile } from "@/lib/actions/auth-action";
import { toast } from "react-toastify";

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser } = useAuth();
  const [uploadingImage, setUploadingImage] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please select an image file');
      return;
    }

    setUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append('profilePicture', file);

      const response = await handleUpdateProfile(formData);
      
      if (response.data) {
        setUser(response.data);
        toast.success('Profile image updated successfully!');
        
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error(error instanceof Error ? error.message : 'Upload failed');
    } finally {
      setUploadingImage(false);
    }
  };

  const getImageUrl = (imagePath: string | null | undefined) => {
    if (!imagePath) return null;
    if (imagePath.startsWith('http')) return imagePath;

    // The backend serves images from the root, so we just need the base URL.
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050';
    
    // Add a timestamp for cache-busting to ensure the latest image is shown.
    const timestamp = new Date().getTime();

    return `${baseUrl}/${imagePath}?t=${timestamp}`;
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Please log in</h1>
          <p>You need to be logged in to view this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Profile Header */}
          <div className="px-6 py-8 sm:px-10 bg-gradient-to-r from-green-50 to-blue-50">
            <div className="flex flex-col sm:flex-row items-center">
              <div className="relative group mb-4 sm:mb-0">
                <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-white shadow-lg">
                  {user.profilePicture ? (
                    <img
                      src={getImageUrl(user.profilePicture) || ''}
                      alt={user.fullName || 'Profile'}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullName || 'U')}&background=4F46E5&color=fff&size=128`;
                      }}
                    />
                  ) : (
                    <div className="w-full h-full bg-green-100 flex items-center justify-center text-4xl text-green-600 font-semibold">
                      {user.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
                    </div>
                  )}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <label className="cursor-pointer p-2 bg-white bg-opacity-80 rounded-full">
                    <input
                      type="file"
                      ref={fileInputRef}
                      onChange={handleImageUpload}
                      className="hidden"
                      accept="image/*"
                      disabled={uploadingImage}
                    />
                    {uploadingImage ? (
                      <svg className="w-6 h-6 animate-spin text-green-600" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                    ) : (
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    )}
                  </label>
                </div>
              </div>
              <div className="sm:ml-8 text-center sm:text-left">
                <h1 className="text-2xl font-bold text-gray-900">{user.fullName || 'User'}</h1>
                <p className="text-gray-600">{user.email}</p>
                <p className="text-sm text-gray-500 mt-1">Joined on {new Date(user.createdAt).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Profile Details */}
          <div className="px-6 py-8 sm:px-10">
            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-medium text-gray-900 mb-6">Profile Information</h2>
              <div className="space-y-4">
                <div className="sm:flex">
                  <dt className="text-sm font-medium text-gray-500 w-32 flex-shrink-0">Full Name</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{user.fullName || 'Not provided'}</dd>
                </div>
                <div className="sm:flex">
                  <dt className="text-sm font-medium text-gray-500 w-32 flex-shrink-0">Email</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0">{user.email}</dd>
                </div>
                <div className="sm:flex">
                  <dt className="text-sm font-medium text-gray-500 w-32 flex-shrink-0">Role</dt>
                  <dd className="mt-1 text-sm text-gray-900 sm:mt-0 capitalize">{user.role || 'user'}</dd>
                </div>
              </div>
              <div className="mt-6">
                <Link href="/user/profile" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50">
                  Edit Profile
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}