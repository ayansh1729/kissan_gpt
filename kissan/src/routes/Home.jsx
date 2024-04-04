import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Right from '../components/Right';

function Home() {
  const [menu, setMenu] = useState(false);
  const [chatid,setChatid] = useState(null);

  return (
    <div className="main flex h-screen w-screen">
      <Sidebar menu={menu} setMenu={setMenu} setChatid={setChatid}/>
      <Right menu={menu} setMenu={setMenu} chatid={chatid}/>
    </div>
  );
}

export default Home;
