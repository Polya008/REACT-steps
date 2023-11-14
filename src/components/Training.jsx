import React, { useState } from 'react';
import List from './List';

function dateSorter({date: a}, {date: b}) {
  const c = new Date(a);
  const d = new Date(b);
  return c - d;
}

export default function Training() {
  const [trains, setTrains]=useState([])
  const [form, setForm]=useState({
      id: '',
      date: 0,
      distance: 0
  })

  const handleChange=(event)=>{
    const { name, value } = event.target;
    setForm((prevForm)=>({...prevForm,[name]:value}));
  }

  const handleAddTrain = (e)=>{
    e.preventDefault();
    const newTrain={
      id: form.date,
      date: form.date,
      distance: parseFloat(form.distance) 
    };

    const index=trains.findIndex((item) => 
      new Date(item.date).getTime() === new Date(form.date).getTime()
    );

    if (index !== -1) {
      setTrains((prevTrains)=>{
        const head = prevTrains.slice(0, index);
        const tail = prevTrains.slice(index + 1);
        const oldElement = prevTrains[index];
        const newElement = { ...oldElement, distance: newTrain.distance + oldElement.distance };

        const newTrains = [...head, newElement, ...tail];
        return newTrains.sort(dateSorter);
      });
    } else {
      setTrains((prevTrains)=>[...prevTrains, newTrain].sort(dateSorter));
    }
  }

  const handleRemove=(train)=>{
    setTrains((prevTrains)=>prevTrains.filter(t=>t.id!==train))
  }

  return (
    <div>
      <form onSubmit={handleAddTrain} className='list_container'>
        <input type='date' name='date' value={form.date} onChange={handleChange}></input>
        <input type='number' name='distance' value={form.distance} onChange={handleChange}></input>
        <button>ok</button>
      </form>
      <List items={trains} remove={handleRemove}/>
    </div>
  );
}