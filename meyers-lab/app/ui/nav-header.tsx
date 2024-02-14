'use client';

import React, { useState, useEffect } from 'react';
import ReactDOM from "react-dom";
import Image from 'next/image';
import Link from 'next/link';


export default function NavHeader() {
    /**
     * TODO: Add a logo, which will be a link to the home page.
     * TODO: Add a login button, which will be a link to the login page.
     * TODO: Add a chrome extension button, which will be an external link to the chrome store.
     */

    const [position, setPosition] = useState(0);
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        // Set the initial position
        setPosition(window.scrollY);

        const handleScroll = () => {
            let moving = window.scrollY;
            setVisible(position > moving);
            setPosition(moving);
        };
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [position]);

    const headerClass = visible ? 'nav-header' : 'nav-header nav-header-hidden';

    return (
        <div className={`fixed flex flex-row justify-between bg-red items-center w-full h-20 gap-10 pl-7 pr-5 z-[100] ${headerClass}`} style={{ borderBottom: '3px solid rgb(255,255,255)'}}>
            {/* <Link href="/">
                <Image
                    src="/images/logo.png"
                    width={80}
                    height={20}
                    alt="logo"
                    style={{ cursor: 'pointer' }}
                />
            </Link> */}
            <div className="flex flex-row gap-5 px-5 text-5xl-responsive">
                Coding Intensity Reportcard
            </div>

            <div className="flex flex-row gap-5 px-5">
                <a href="http://localhost:3000/research-overview" className="text-[rgb(120,38,298)] hover:text-primary">Research Overview</a>
                <a href="http://localhost:3000/tableau" className="text-blue-800 hover:text-primary">Tableau</a>
            </div>
        </div>
    )
}