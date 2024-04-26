import React from 'react'
import { useOutletContext } from "react-router-dom";
import OneProduct from "./OneProduct"

function Products() {
  const [items, setItems, setShowNot, setNotify] = useOutletContext();
  return (
    <div className=' grid grid-cols-2 grid-rows-2 gap-4'>
      {items.map(item => {
        return (
          <OneProduct key={item.id} product={item} products={items} setProducts={setItems} setShowNot={setShowNot} setNotify={setNotify} />
        )
      })}
    </div>
  )
}

export default Products