import React from 'react'; 

import styles from '../css/AddTime.module.css';
import {ReactComponent as AddSVG} from "../svg/add.svg"
import { Button } from '@mui/material';

export default function() {
    return <>
        <Button className={styles.button} variant="text">
            <AddSVG />
        </Button>
    </>        
}
