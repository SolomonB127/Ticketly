"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [image, setImage] = useState<string | null>(null);
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [eventName, setEventName] = useState<string>("");
    const [ticketType, setTicketType] = useState<string>("");
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        // Read query parameters for eventName and ticketType
        const eventNameParam = searchParams.get("eventName");
        const ticketTypeParam = searchParams.get("ticketType");
        if (eventNameParam) setEventName(eventNameParam);
        if (ticketTypeParam) setTicketType(ticketTypeParam);

        // Also check localStorage for any existing form data (without overriding query params)
        const storedData = localStorage.getItem("formData");
        if (storedData) {
        const parsedData = JSON.parse(storedData);
        if (!eventNameParam) setEventName(parsedData.eventName || "");
        if (!ticketTypeParam) setTicketType(parsedData.ticketType || "");
        setFullName(parsedData.fullName || "");
        setEmail(parsedData.email || "");
        setImage(parsedData.image || null);
        }
    }, [searchParams]);

    useEffect(() => {
        localStorage.setItem("formData", JSON.stringify({ fullName, email, eventName, ticketType, image }));
    }, [fullName, email, eventName, ticketType, image]);

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "my_unsigned_preset");

        try {
            const response = await fetch("https://api.cloudinary.com/v1_1/dlzm632an/image/upload", {
            method: "POST",
            body: formData,
            });
            const data = await response.json();
            setImage(data.secure_url);
        } catch (error) {
            console.error("Image upload failed", error);
        }
        }
    };

    const validateForm = () => {
        let newErrors: { [key: string]: string } = {};
        if (!image) newErrors.image = "Profile picture is required";
        if (!fullName.trim()) newErrors.fullName = "Full Name is required";
        if (!email.trim()) newErrors.email = "Email is required";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email format";
        if (!eventName.trim()) newErrors.eventName = "Event Name is required";
        if (!ticketType.trim()) newErrors.ticketType = "Ticket Type is required";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateForm()) {
        // Redirect to the "My Tickets" page once the form is valid
        router.push("/tickets");
        }
    };

    return (
            <section className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
            <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">Attendee Details</h2>

                <div className="mb-6 border border-gray-300 p-4 bg-[#07373F] rounded-lg">
                    <h4 className="p-2 text-white text-center">Upload Photo</h4>
                    <div className="border border-gray-400 h-44 bg-[#0E464F] rounded-lg flex flex-col justify-center items-center relative">
                        {image ? (
                        <Image src={image} alt="Uploaded Preview" width={180} height={180} className="rounded-md object-cover z-10" />
                        ) : (
                        <Image src="/Section Title.png" alt="Click To Upload Img" width={100} height={100} />
                        )}
                        <input
                        type="file"
                        accept="image/*"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleImageUpload}
                        aria-describedby="imageError"
                        />
                    </div>
                    {errors.image && <span id="imageError" className="text-red-500 text-sm block mt-2">{errors.image}</span>}
                </div>

                <form className="flex flex-col" onSubmit={handleSubmit} aria-live="polite">
                    <label className="text-gray-700 font-medium" htmlFor="fullName">
                        Full Name
                    </label>
                    <input
                        id="fullName"
                        placeholder="Enter your name"
                        className="input-field"
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    {errors.fullName && <span className="text-red-500 text-sm">{errors.fullName}</span>}

                    <label className="text-gray-700 font-medium mt-3" htmlFor="email">
                        Email
                    </label>
                    <input
                        id="email"
                        placeholder="Enter your email"
                        className="input-field"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {errors.email && <span className="text-red-500 text-sm">{errors.email}</span>}

                    <label className="text-gray-700 font-medium mt-3" htmlFor="eventName">
                        Event Name
                    </label>
                    <input
                        id="eventName"
                        placeholder="Enter event name"
                        className="input-field"
                        type="text"
                        value={eventName}
                        readOnly
                    />
                    {errors.eventName && <span className="text-red-500 text-sm">{errors.eventName}</span>}

                    <label className="text-gray-700 font-medium mt-3" htmlFor="ticketType">
                        Ticket Type
                    </label>
                    <input
                        id="ticketType"
                        placeholder="Enter ticket type"
                        className="input-field"
                        type="text"
                        value={ticketType}
                        readOnly
                    />
                    {errors.ticketType && <span className="text-red-500 text-sm">{errors.ticketType}</span>}

                    <button
                        className="bg-gradient-to-r from-[#07373F] to-[#0E464F] text-white font-bold py-2 px-4 rounded-md mt-4 hover:bg-indigo-600 hover:to-blue-600 transition ease-in-out duration-150"
                        type="submit"
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};

export default Page;
