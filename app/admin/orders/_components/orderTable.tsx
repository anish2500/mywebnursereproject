import { Order } from "@/lib/api/admin/order";
import Link from "next/link";

interface OrderTableProps {
    orders: Order[];
}

export default function OrderTable({ orders }: OrderTableProps) {
    return (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-slate-50 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Order ID
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Customer Email
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Items
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Total Amount
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Payment Status
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Payment Method
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Date
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200">
                        {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-slate-50 transition-colors">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-800">
                                    {order._id.slice(-8)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    {order.userId?.email || 'No email'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    {order.items?.length || 0} items
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-emerald-600">
                                    Rs {order.totalAmount?.toFixed(2)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
                                        ${order.paymentStatus === 'paid'
                                            ? 'bg-emerald-100 text-emerald-800'
                                            : order.paymentStatus === 'pending'
                                            ? 'bg-yellow-100 text-yellow-800'
                                            : order.paymentStatus === 'failed'
                                            ? 'bg-red-100 text-red-800'
                                            : order.paymentStatus === 'refunded'
                                            ? 'bg-blue-100 text-blue-800'
                                            : 'bg-slate-100 text-slate-800'
                                        }`}
                                    >
                                        {order.paymentStatus || 'pending'}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    {order.paymentMethod || 'N/A'}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-600">
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm">
                                    <Link
                                        href={`/admin/orders/${order._id}`}
                                        className="text-emerald-600 hover:text-emerald-800 font-medium"
                                    >
                                        View Details
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {orders.length === 0 && (
                <div className="p-8 text-center text-slate-500">
                    No orders found
                </div>
            )}
        </div>
    );
}
