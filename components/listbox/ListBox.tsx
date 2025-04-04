'use client';

import { useState } from 'react';
import { IoArrowForwardCircleOutline, IoArrowBackCircleOutline } from 'react-icons/io5';
import CreatePopup from './CreatePopup';

export default function ListBox() {
  const [isOpen, setIsOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handelePopupToggle = () => {
    setIsPopupOpen((prev) => !prev);
  };
  return (
    <>
      {isOpen ? null : (
        <IoArrowBackCircleOutline
          className="absolute top-12 right-12 text-4xl cursor-pointer"
          onClick={handleToggle}
        />
      )}

      <div
        className={`fixed
         top-10 bg-gray-300 w-[300px] min-h-[400px] max-h-[500px] rounded-lg
         animation duration-500 ease-in-out
         shadow-lg ${isOpen ? 'right-10' : 'right-[-300px]'}`}
      >
        <h1 className="font-bold text-center p-4 border-b-4 border-white">Check List</h1>
        <IoArrowForwardCircleOutline
          onClick={handleToggle}
          className="absolute top-2 right-2 text-4xl cursor-pointer"
        />

        <ul className="w-full h-full overflow-y-auto flex flex-col">
          <li className="flex items-center p-4 border-b-2 border-black">아이템1</li>
          <li className="flex items-center p-4 border-b-2 border-black">아이템1</li>
          <li className="flex items-center p-4 border-b-2 border-black">아이템1</li>
          <button
            onClick={handelePopupToggle}
            className="bg-amber-700
           p-4 absolute bottom-0 w-full rounded-b-lg cursor-pointer"
          >
            Create List
          </button>
        </ul>
      </div>

      <CreatePopup />
    </>
  );
}
