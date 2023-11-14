import React from 'react';

export default function List({items, remove}) {
  return (
    <div >
      {items.map(item =>(
        <div className='list_container' key={item.id}>
          <p>{item.date}</p>
          <p>{item.distance}</p>
          <button onClick={()=>remove(item.id)}>remove</button>
        </div>
        ))}
    </div>
  );
}