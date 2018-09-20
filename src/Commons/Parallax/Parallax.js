import React from 'react';
import './Parallax.css';

const Parallax = (props) => (
    <div className={"Parallax " + props.classes} style={{backgroundImage: `url(${props.image})`}}>
    </div>
);
export default Parallax;