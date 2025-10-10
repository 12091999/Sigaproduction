import React from 'react';
import Image from 'next/image';

const About = () => {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Hero Section */}
            <div className="relative h-[400px]">
                <Image
                    src="/images/studio-hero.jpg" // Make sure to add your image
                    alt="Studio 3 Banyuwangi"
                    layout="fill"
                    objectFit="cover"
                    className="brightness-50"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">
                        Studio 3 Banyuwangi
                    </h1>
                </div>
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-4 py-16">
                {/* About Section */}
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Tentang Kami
                    </h2>
                    <p className="text-gray-600 mb-8">
                        Studio 3 Banyuwangi adalah studio fotografi profesional yang berlokasi di jantung kota Banyuwangi. 
                        Didirikan pada tahun 2015, kami telah melayani ribuan klien dengan berbagai kebutuhan fotografi,
                        dari foto keluarga hingga acara pernikahan.
                    </p>

                    {/* Services */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">Foto Studio</h3>
                            <p className="text-gray-600">
                                Studio foto modern dengan berbagai backdrop dan lighting profesional
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">Dokumentasi Event</h3>
                            <p className="text-gray-600">
                                Layanan dokumentasi untuk berbagai acara dan kegiatan
                            </p>
                        </div>
                        <div className="p-6 bg-white rounded-lg shadow-md">
                            <h3 className="text-xl font-bold mb-4">Foto Produk</h3>
                            <p className="text-gray-600">
                                Fotografi produk profesional untuk kebutuhan bisnis
                            </p>
                        </div>
                    </div>

                    {/* Facilities */}
                    <h2 className="text-3xl font-bold text-gray-800 mb-6">
                        Fasilitas Kami
                    </h2>
                    <ul className="list-disc list-inside text-gray-600 mb-8">
                        <li>Studio indoor dengan area 200m²</li>
                        <li>Peralatan fotografi profesional</li>
                        <li>Ruang make up dan ruang ganti</li>
                        <li>Area tunggu yang nyaman</li>
                        <li>Parking area yang luas</li>
                    </ul>

                    {/* Contact Info */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h2 className="text-3xl font-bold text-gray-800 mb-6">
                            Hubungi Kami
                        </h2>
                        <div className="space-y-4">
                            <p className="flex items-center text-gray-600">
                                <span className="font-bold w-24">Alamat:</span>
                                <span>Jl. Contoh No. 123, Banyuwangi, Jawa Timur</span>
                            </p>
                            <p className="flex items-center text-gray-600">
                                <span className="font-bold w-24">Telepon:</span>
                                <span>+62 123 4567 890</span>
                            </p>
                            <p className="flex items-center text-gray-600">
                                <span className="font-bold w-24">Email:</span>
                                <span>info@studio3banyuwangi.com</span>
                            </p>
                            <p className="flex items-center text-gray-600">
                                <span className="font-bold w-24">Jam Buka:</span>
                                <span>Senin - Minggu: 09:00 - 21:00 WIB</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default About;