import { MouseEvent } from 'react';

import Button from './components/Button/Button';
import Input from './components/Input/Input';
import './index.css';

const App = () => {
   const addCounter = (e: MouseEvent) => {
      console.log(e);
   };

   return (
      <>
         <Button onClick={addCounter}>Кнопка</Button>
         <Button appearence='big' onClick={addCounter}>
            Кнопка
         </Button>
         <Input placeholder='Email' />
      </>
   );
};

export default App;

// => video 102
