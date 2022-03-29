import React, { useState } from 'react'; 

import styles from '../css/TimeList.module.css';
import AddTime from './AddTime';

interface ITimeItem {
    id: number
    hour: number
    minute: number
}

export default function() {
    const [timeItems, setTimeItems] = useState<Array<ITimeItem>>([])
    
    return <div>
        {timeItems.map(item => (<p>{item.hour}</p>))}
        <AddTime /> 
    </div>
}
