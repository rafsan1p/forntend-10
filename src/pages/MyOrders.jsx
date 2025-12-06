import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
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
            <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
                <span className="loading loading-spinner loading-lg text-primary w-24 h-24"></span>
            </div>
        );
    }

    return (
        <div className="overflow-x-auto min-h-[calc(100vh-200px)] shadow-xl p-4 sm:p-6 md:p-10 lg:p-14 space-y-4 sm:space-y-6">
            <div className="flex justify-between items-center flex-wrap gap-4">
                <p className="font-bold text-xl sm:text-2xl">My Orders</p>
                
                {myOrders.length > 0 && (
                    <button 
                        onClick={handleDownloadPDF}
                        className="btn btn-primary"
                    >
                        Download Report (PDF)
                    </button>
                )}
            </div>

            {myOrders.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-xl text-gray-500">No orders found!</p>
                </div>
            ) : (
                <table className="table table-base">
                    <thead className="font-bold text-xl">
                        <tr>
                            <th>No</th>
                            <th>Product Name</th>
                            <th>Price</th>
                            <th>Phone</th>
                            <th>Quantity</th>
                            <th>Address</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myOrders.map((order, index) => (
                            <tr key={order._id}>
                                <th>{index + 1}</th>
                                <td>{order?.productName}</td>
                                <td>{order?.price}</td>
                                <td>{order?.phone}</td>
                                <td>{order?.quantity}</td>
                                <td>{order?.address}</td>
                                <td>
                                    {new Date(order?.date).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric',
                                        hour: 'numeric',
                                        minute: 'numeric',
                                        hour12: true
                                    })}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default MyOrders;