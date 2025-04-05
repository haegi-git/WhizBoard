'use client';

import { useEffect, useState } from 'react';
import { IoArrowBackCircleOutline } from 'react-icons/io5';
import CreatePopup from './CreatePopup';
import { ListItemType } from '@/types/listItemTypes';
import List from './List';

export default function ListBox() {
  const [isOpen, setIsOpen] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [listItem, setListItem] = useState<ListItemType[]>();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
  };
  const handelePopupToggle = () => {
    setIsPopupOpen((prev) => !prev);
  };

  useEffect(() => {
    const getListItem = async () => {
      const res = await fetch('/api/list', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });
      if (!res.ok) throw new Error('리스트 가져오기 실패');
      const data = await res.json();
      setListItem(data);
      console.log(data);
    };
    getListItem();
  }, []);

  return (
    <>
      {isOpen ? null : (
        <IoArrowBackCircleOutline
          className="absolute top-12 right-12 text-4xl cursor-pointer"
          onClick={handleToggle}
        />
      )}

      <List isOpen={isOpen} setIsOpen={setIsOpen} handelePopupToggle={handelePopupToggle} />

      {isPopupOpen ? <CreatePopup /> : null}
    </>
  );
}
