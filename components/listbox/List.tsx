import { ListItemType } from '@/types/listItemTypes';
import { useEffect, useState } from 'react';
import { IoArrowForwardCircleOutline } from 'react-icons/io5';

export type ListProps = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handelePopupToggle: () => void;
};

export default function List({ isOpen, setIsOpen, handelePopupToggle }: ListProps) {
  const [listItem, setListItem] = useState<ListItemType[]>();

  const handleToggle = () => {
    setIsOpen((prev) => !prev);
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
        {listItem?.map((item) => {
          return (
            <li
              key={item._id}
              className="flex cursor-pointer
               items-center p-4 border-b-2 border-black"
            >
              {item.title}
            </li>
          );
        })}

        <button
          onClick={handelePopupToggle}
          className="bg-amber-700
           p-4 absolute bottom-0 w-full rounded-b-lg cursor-pointer"
        >
          Create List
        </button>
      </ul>
    </div>
  );
}
