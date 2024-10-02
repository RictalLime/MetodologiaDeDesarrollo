import React from "react";
import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
import styles from "../styles/Home.module.css";

function MenuCerrarSesion() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleProfileClick = () => {
    setDropdownVisible(!isDropdownVisible);
  };

  const handleDocumentClick = (event) => {
    if (
      !event.target.closest(`.${styles.dropdownWrapper}`) &&
      !event.target.closest(`.${styles.profile}`)
    ) {
      setDropdownVisible(false);
    }
  };

  // Add event listener for clicks outside the dropdown
  if (typeof window !== "undefined") {
    document.addEventListener("click", handleDocumentClick);
  }

  return (
    <>
      <Head>
        <title>Dropdown Menu 09</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans&display=swap"
          rel="stylesheet"
        />
      </Head>
      <header className="fixed h-20 px-4 w-full flex items-center justify-end bg-gray-900">
        <div className="flex gap-4 items-center">
          <Image
            className="cursor-pointer w-9 h-9 transition-transform duration-200 hover:scale-110"
            src="/assets/message.svg"
            alt="Message"
            width={36}
            height={36}
          />
          <Image
            className="cursor-pointer w-9 h-9 transition-transform duration-200 hover:scale-110"
            src="/assets/notification.svg"
            alt="Notification"
            width={36}
            height={36}
          />
          <Image
            className="w-12 h-12 cursor-pointer object-cover rounded-full transition-transform duration-200 hover:scale-105"
            src="/assets/natalia.jpg"
            alt="Natalia"
            width={50}
            height={50}
            onClick={handleProfileClick}
          />
        </div>

        <div
          className="absolute right-4 top-20 p-4 w-76 bg-gray-900 text-white rounded-lg hidden flex-col animate-fadeIn"
          id="dropdown"
        >
          <nav>
            <ul>
              <li>
                {/* SVG for user profile */}
                My Profile
              </li>
              <li>
                {/* SVG for settings */}
                Account Settings
              </li>
            </ul>
            <hr className={styles.divider} />
            <ul>
              <li>
                {/* SVG for device management */}
                Device Management
              </li>
              <li>
                {/* SVG for logout */}
                Sign Out
              </li>
            </ul>
            <hr className={styles.divider} />
            <div className={styles.switchAccount}>
              <h2>Switch Account</h2>
              <ul>
                <li className={styles.active}>
                  <Image
                    src="/assets/natalia.jpg"
                    alt="Natalia"
                    width={44}
                    height={44}
                  />
                  <div className={styles.user}>
                    <div className={styles.name}>Natalia Taylor</div>
                    <div className={styles.email}>natalia@example.com</div>
                  </div>
                  <div className={styles.marker}></div>
                </li>
                <li>
                  <Image
                    src="/assets/melissa.jpg"
                    alt="Melissa"
                    width={44}
                    height={44}
                  />
                  <div className={styles.user}>
                    <div className={styles.name}>Melissa Johnson</div>
                    <div className={styles.email}>mel@example.com</div>
                  </div>
                </li>
              </ul>
              <button className={styles.signOutAll}>
                {/* SVG for sign out */}
                Sign out all accounts
              </button>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default MenuCerrarSesion;
