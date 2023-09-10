import React from 'react';
import './scss/section10.scss';

export default function Section10Component(){

    const onClickInsta=(e)=>{
        e.preventDefault();
    }

    
    return (
        <section id="section10">
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2>해태제과 인스타그램</h2>
                        <a href="!#" onClick={onClickInsta}>@haitai_co</a>
                    </div>
                </div>
            </div>
        </section>
    );
};