

import { handleGetOnePlant } from "@/lib/actions/admin/plant-action";
import Link from "next/link";
import Image from "next/image";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const response = await handleGetOnePlant(id);

  if (!response.success) {
    throw new Error(response.message || "Failed to load plant");
  }

  const plant = response.data;

  return (
    <div className="p-6">
      {/* Navigation Links */}
      <div className="flex gap-4 mb-4">
        <Link
          href="/admin/plant"
          className="text-blue-500 hover:underline"
        >
          Back to Plants
        </Link>

        <Link
          href={`/admin/plant/${id}/edit`}
          className="text-green-500 hover:underline"
        >
          Edit Plant
        </Link>
      </div>

      <h1 className="text-2xl font-bold mb-4">Plant Details</h1>

      <div className="border border-gray-300 rounded-lg p-6 space-y-3">
        <p><strong>Name:</strong> {plant.name}</p>
        <p><strong>Description:</strong> {plant.description}</p>
        <p><strong>Category:</strong> {plant.category}</p>
        <p><strong>Price:</strong> Rs. {plant.price}</p>

        {/* Plant Image */}
        {plant.plantImage && (
          <div className="mt-4">
            <p className="font-semibold mb-2">Plant Image:</p>
            <Image
              src={`${process.env.NEXT_PUBLIC_API_BASE_URL}${plant.plantImage}`}
              alt={plant.name}
              width={300}
              height={300}
              className="rounded-lg object-cover"
            />
          </div>
        )}
      </div>
    </div>
  );
}
