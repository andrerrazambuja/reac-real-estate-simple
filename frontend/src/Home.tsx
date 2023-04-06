import React from 'react';
import './Home.css';

const Home: React.FC = () => {
    return (
      <div className="container">
        <div className="content">
          <h2>Welcome to the Real Estate Company</h2>
          <img src="https://i.pinimg.com/originals/67/08/39/6708398b2d2acb9d33cd5ae7a6270347.png"></img>
          <p>Your one-stop solution for buying and selling properties.</p>
        </div>
      </div>
    );
  };

export default Home;