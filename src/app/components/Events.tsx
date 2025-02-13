"use client";
import React, { useState, useMemo } from "react";
import { Habibi } from "next/font/google";
import { upComingEvents } from "../data/EventDB";
import Link from "next/link";

const habibi = Habibi({
    subsets: ["latin"],
    weight: "400",
});

interface Event {
    eventName: string;
    location: string;
    date: string;
    time: string;
    regular: string;
    vip: string;
    vvip: string;
}

interface EventsProps {
    events?: Event[];
}

type TicketType = "regular" | "vip" | "vvip";

const Events: React.FC<EventsProps> = ({ events = upComingEvents }) => {
    const [selectedTickets, setSelectedTickets] = useState<Record<string, TicketType | null>>({});

    const eventList = useMemo(() => events, [events]);

    const handleSelectTicket = (eventId: string, type: TicketType) => {
        setSelectedTickets((prev) => ({
        ...prev,
        [eventId]: prev[eventId] === type ? null : type, // Deselect if clicked twice
        }));
    };

    return (
        <section className="px-4 md:px-10 lg:px-20">
            <h2 className={`underline text-center text-2xl md:text-3xl ${habibi.className} font-bold my-6`}>
                Upcoming Events
            </h2>
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-2">
                {eventList.map((event, i) => {
                const selectedTicket = selectedTickets[event.eventName];
                return (
                    <li
                    key={i}
                    className="border p-6 rounded-lg shadow-md bg-white flex flex-col justify-between list-none transition-all duration-300 hover:shadow-lg"
                    >
                        <div>
                            <h3 className="text-xl md:text-2xl font-semibold">{event.eventName}</h3>
                            <p className="text-gray-600 text-sm md:text-base">
                            Join us for an unforgettable experience at {event.eventName}
                            </p>
                            <p className="text-gray-600 text-sm md:text-base">{event.location}</p>
                            <p className="text-gray-500 text-sm md:text-base">
                            {event.date} • {event.time}
                            </p>

                            {/* Separator Line */}
                            <div className="w-full bg-[#0E464F] h-1 mt-2"></div>

                            {/* Ticket Type Section */}
                            <p className="mt-3 font-semibold text-base md:text-lg">Select Ticket Type:</p>
                            <div className="w-full bg-[#0E464F] h-auto rounded-lg p-4 mt-2">
                                <div className="text-white flex flex-col sm:flex-row justify-between gap-3 cursor-pointer">
                                    {(["regular", "vip", "vvip"] as TicketType[]).map((type) => (
                                    <p
                                        key={type}
                                        tabIndex={0}
                                        role="button"
                                        aria-pressed={selectedTicket === type}
                                        onClick={() => handleSelectTicket(event.eventName, type)}
                                        onKeyDown={(e) => {
                                        if (e.key === "Enter" || e.key === " ") {
                                            handleSelectTicket(event.eventName, type);
                                        }
                                        }}
                                        className={`border px-4 py-2 text-sm md:text-base rounded-md font-medium transition-all duration-300 text-center sm:w-auto w-full ${
                                        selectedTicket === type
                                            ? type === "regular"
                                            ? "bg-green-600 border-green-400"
                                            : type === "vip"
                                            ? "bg-yellow-600 border-yellow-400"
                                            : "bg-blue-600 border-blue-400"
                                            : `hover:${
                                                type === "regular"
                                                ? "bg-green-500"
                                                : type === "vip"
                                                ? "bg-yellow-500"
                                                : "bg-blue-500"
                                            }`
                                        }`}
                                    >
                                        {type === "regular"
                                        ? "🎟 Regular: " + event.regular
                                        : type === "vip"
                                        ? "🌟 VIP: " + event.vip
                                        : "👑 VVIP: " + event.vvip}
                                    </p>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {selectedTicket ? (
                            <Link
                            href={`/booking?eventName=${encodeURIComponent(
                                event.eventName
                            )}&ticketType=${encodeURIComponent(selectedTicket)}`}
                            >
                            <button
                                className="w-full mt-4 bg-[#0E464F] text-white py-3 rounded-lg font-semibold text-sm md:text-base transition-all duration-300 hover:bg-[#092d34] focus:bg-[#061f23] focus:outline-none"
                            >
                                Buy Now
                            </button>
                            </Link>
                        ) : (
                            <button
                            className="w-full mt-4 bg-gray-400 text-white py-3 rounded-lg font-semibold text-sm md:text-base cursor-not-allowed"
                            disabled
                            >
                            Select Ticket to Buy
                            </button>
                        )}
                    </li>
                );
                })}
            </div>
        </section>
    );
};

export default Events;
