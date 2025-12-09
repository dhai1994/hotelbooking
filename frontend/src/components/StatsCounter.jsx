import React, { useState, useEffect } from 'react';

const stats = [
  { label: 'Bookings', targetValue: 5000, suffix: '+' },
  { label: 'Countries', targetValue: 35, suffix: '' },
  { label: 'Awards Won', targetValue: 12, suffix: '+' },
];


const CounterItem = ({ targetValue, label, duration = 2000, suffix }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
   
    const frameRate = 50; 
    const totalFrames = duration / frameRate;
    const increment = targetValue / totalFrames; 

    const timer = setInterval(() => {
      start += increment;
      
      if (start >= targetValue) {
      setCount(targetValue);
        clearInterval(timer);
      } else {
       setCount(Math.round(start)); 
      }
    }, frameRate);

    return () => clearInterval(timer);
    
  }, [targetValue, duration]); 
  return (
    <div className="flex flex-col items-center text-center">
      <div className="text-5xl font-bold font-serif text-white mb-2">
        {new Intl.NumberFormat().format(count)}{suffix}
      </div>
      <p className="text-lg text-gray-400 uppercase tracking-widest">{label}</p>
    </div>
  );
};


const StatsCounter = () => {
  return (
    <div className="bg-black py-20">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {stats.map((stat, index) => (
            <CounterItem 
              key={index} 
              targetValue={stat.targetValue} 
              suffix={stat.suffix} 
              label={stat.label} // Passes the label string
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsCounter;