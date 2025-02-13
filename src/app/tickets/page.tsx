"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import Barcode from "react-barcode";

interface TicketData {
    image: string | null;
    fullName: string;
    email: string;
    eventName: string;
    ticketType: string;
}

const MyTickets: React.FC = () => {
    const [ticketData, setTicketData] = useState<TicketData | null>(null);

    useEffect(() => {
        const storedData = localStorage.getItem("formData");
        if (storedData) {
        setTicketData(JSON.parse(storedData));
        }
    }, []);

    if (!ticketData) {
        return (
        <div className="flex items-center justify-center min-h-screen">
            <p>Loading ticket information...</p>
        </div>
        );
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-[#07373F]  px-4">
            <h2 className="text-3xl font-bold mb-6 text-white">My Ticket</h2>
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-md overflow-hidden">
                <div className="absolute top-0 left-0 h-full w-2  bg-[#0e464fc7]  " />
                <div className="absolute top-0 right-0 h-full w-2  bg-[#0e464fc7] " />
                <div className="absolute top-0 left-0 h-2 w-full  bg-[#0e464fc7]  " />
                <div className="absolute bottom-0 left-0 h-2 w-full  bg-[#0e464fc7]  " />

                <div className="flex justify-center mb-4">
                    {ticketData.image ? (
                        <Image
                        src={ticketData.image}
                        alt="Profile"
                        width={150}
                        height={150}
                        className="rounded-full object-cover border-4 border-[#0E464F] "
                        />
                    ) : (
                        <div className="w-36 h-36 bg-gray-300 rounded-full flex items-center justify-center">
                        No Image
                        </div>
                    )}
                </div>
                <div className="text-center">
                    <h3 className="text-2xl font-semibold">{ticketData.fullName}</h3>
                    <p className="text-gray-600 mt-2 font-bold">Event Name: {ticketData.eventName}</p>
                    <p className="text-gray-600 mt-1 capitalize  font-bold">
                        Ticket Type: {ticketData.ticketType}
                    </p>
                </div>
                <div className="mt-6 flex justify-center">
                    <div className="bg-gray-200 p-4 rounded-md">
                        <Barcode
                        value={ticketData.email}
                        width={2}
                        height={50}
                        displayValue={false}
                        background="#f3f3f3"
                        lineColor="#000"
                        />
                    </div>
                </div>
                <div className="mt-6 text-center">
                    <Link href="/" className="text-blue-500 underline">
                        Back to Events
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default MyTickets;
