import {useEffect, useState} from 'react';
import axios, {AxiosResponse} from 'axios';

const RANDOM_USER_EP = "https://randomuser.me/api/";

const randomUsersApi = axios.create({

  baseURL: RANDOM_USER_EP,
  headers: {
      "Content-Type": "application/json"
    },
  }
); 


const App = () => { 
  const [count, setCount] = useState<number>(10);

  const getRandomUsers = async () => {
    const res = await randomUsersApi.get("/");
    console.log("res", res);
  };
  return (
    <div>
      <span>
        <input 
          type="number"
          value={count}
          onChange={(e) => setCount(Number(e.target.value))}
        />
        <button onClick={getRandomUsers}>get</button>
      </span>
      <h2>count: {count}</h2>
      <h1>HOLAA</h1>
    </div>
  );
};




export default App;