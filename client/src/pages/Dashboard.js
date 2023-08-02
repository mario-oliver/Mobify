import React, { useEffect } from 'react';

const Dashboard = () => {
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:5000');
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  return <div>Dashboard</div>;
};

export default Dashboard;
