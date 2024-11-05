import { useState } from 'react'; 
import Calendar from 'react-calendar';

type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];

function CalendarComponent() {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <div className='border-none'>
      <Calendar onChange={onChange} value={value} />
    </div>
  );
}

export default CalendarComponent;
