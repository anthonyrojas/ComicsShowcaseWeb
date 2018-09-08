import React from 'react';
import './Parallax.css';

const Parallax = (props) => (
    <div className="Parallax" style={{backgroundImage: `url(${props.image})`}}>
    </div>
);
export default Parallax;