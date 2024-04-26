import React from 'react'
import OneUser from './OneUser.jsx'
import { useOutletContext } from "react-router-dom";
function Users() {
  const [items, setItems, setShowNot, setNotify] = useOutletContext();
  return (
    <div className=' flex flex-col gap-4'>
      {items.length == 0 && (
              <div className=" w-full h-[400px] text-2xl font-semibold flex items-center justify-center">
                Couldn't find any user!
              </div>
            )}
      {items.map((item) => {
        return (
          <OneUser key={item.email} user={item} users={items} setUsers={setItems} setShowNot={setShowNot} setNotify={setNotify} />
        )
      })}
    </div>
  )
}

export default Users