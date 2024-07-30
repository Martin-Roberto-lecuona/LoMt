import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const apiCoor = "http://127.0.0.1:8000/coordinates"

interface Point {
  x: number;
  y: string;
}
const refetch_time = 5000;

const RealTimeChart: React.FC = () => {
  const [data, setData] = useState<Point[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      // recibe lista
      try {
        const response = await fetch(apiCoor);
        const newData = await response.json();
        console.log(newData)
        setData(prevData => {
          const updatedData = [...prevData, newData];
          if (updatedData.length > 10) {
            updatedData.shift();
          }
          return updatedData;
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    
    const intervalId = setInterval(fetchData, refetch_time); 

    return () => clearInterval(intervalId); 
  }, []);

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="y" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default RealTimeChart;
