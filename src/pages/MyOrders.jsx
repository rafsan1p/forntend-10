import axios from "axios";
import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const MyOrders = () => {
    const { user } = useContext(AuthContext);
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (user?.email) {
            axios.get(`https://missionscic10-eight.vercel.app/orders?email=${user.email}`)
                .then(res => {
                    console.log("Orders from API:", res.data);
                    setMyOrders(res.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.log(err);
                    setLoading(false);
                });
        } else {
            setLoading(false);
        }
    }, [user?.email]);

    useLayoutEffect(() => {
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
    }, []);

    const handleDownloadPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("My Orders Report", 14, 20);

        doc.setFontSize(11);
        doc.text(`Buyer: ${user?.displayName || 'N/A'}`, 14, 30);
        doc.text(`Email: ${user?.email}`, 14, 36);
        doc.text(`Date: ${new Date().toLocaleDateString()}`, 14, 42);

        const tableData = myOrders.map((order, index) => [
            index + 1,
            order?.productName || 'N/A',
            order?.price || 0,
            order?.quantity || 0,
            order?.address || 'N/A',
            order?.phone || 'N/A',
            new Date(order?.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            })
        ]);

        autoTable(doc, {
            head: [['No', 'Product Name', 'Price', 'Quantity', 'Address', 'Phone', 'Date']],
            body: tableData,
            startY: 50,
            theme: 'grid',
            headStyles: { fillColor: [41, 128, 185] },
        });

        doc.save(`My_Orders_${new Date().getTime()}.pdf`);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-primary w-16 h-16 sm:w-20 sm:h-20"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen p-2 sm:p-4 md:p-6 lg:p-10">
            <div className="max-w-7xl mx-auto">
                <div className="bg-base-100 shadow-xl rounded-lg p-4 sm:p-6 md:p-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                        <h2 className="font-bold text-xl sm:text-2xl md:text-3xl">My Orders</h2>
                        
                        {myOrders.length > 0 && (
                            <button 
                                onClick={handleDownloadPDF}
                                className="btn btn-primary btn-sm sm:btn-md w-full sm:w-auto"
                            >
                                📄 Download PDF
                            </button>
                        )}
                    </div>

                    {myOrders.length === 0 ? (
                        <div className="text-center py-16">
                            <div className="text-6xl mb-4">📦</div>
                            <p className="text-lg sm:text-xl text-gray-500">No orders found!</p>
                            <p className="text-sm text-gray-400 mt-2">Your orders will appear here</p>
                        </div>
                    ) : (
                        <>
                            <div className="hidden md:block overflow-x-auto">
                                <table className="table table-zebra w-full">
                                    <thead>
                                        <tr className="text-sm lg:text-base">
                                            <th className="text-center">No</th>
                                            <th>Product Name</th>
                                            <th className="text-center">Price</th>
                                            <th>Phone</th>
                                            <th className="text-center">Quantity</th>
                                            <th>Address</th>
                                            <th>Pickup Date</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {myOrders.map((order, index) => (
                                            <tr key={order._id} className="text-sm lg:text-base">
                                                <th className="text-center">{index + 1}</th>
                                                <td className="font-semibold">{order?.productName}</td>
                                                <td className="text-center">${order?.price}</td>
                                                <td>{order?.phone}</td>
                                                <td className="text-center">{order?.quantity}</td>
                                                <td>{order?.address}</td>
                                                <td className="whitespace-nowrap">
                                                    {new Date(order?.date).toLocaleDateString('en-US', {
                                                        year: 'numeric',
                                                        month: 'short',
                                                        day: 'numeric'
                                                    })}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="block md:hidden space-y-4">
                                {myOrders.map((order, index) => (
                                    <div key={order._id} className="card bg-base-200 shadow-md">
                                        <div className="card-body p-4">
                                            <div className="flex justify-between items-start mb-3">
                                                <div className="badge badge-primary badge-lg">#{index + 1}</div>
                                                <div className="badge badge-secondary">${order?.price}</div>
                                            </div>
                                            
                                            <h3 className="font-bold text-base sm:text-lg mb-3">{order?.productName}</h3>
                                            
                                            <div className="space-y-2 text-sm">
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Quantity:</span>
                                                    <span className="font-semibold">{order?.quantity}</span>
                                                </div>
                                                
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Phone:</span>
                                                    <span className="font-semibold">{order?.phone}</span>
                                                </div>
                                                
                                                <div className="flex justify-between">
                                                    <span className="text-gray-500">Address:</span>
                                                    <span className="font-semibold text-right">{order?.address}</span>
                                                </div>
                                                
                                                <div className="flex justify-between pt-2 border-t">
                                                    <span className="text-gray-500">Date:</span>
                                                    <span className="font-semibold">
                                                        {new Date(order?.date).toLocaleDateString('en-US', {
                                                            year: 'numeric',
                                                            month: 'short',
                                                            day: 'numeric'
                                                        })}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyOrders;