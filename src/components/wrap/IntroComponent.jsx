import React from 'react';
import Section1Component from './intro/Section1Component';
import Section2Component from './intro/Section2Component';
import Section3Component from './intro/Section3Component';
import Section4Component from './intro/Section4Component';
import Section5Component from './intro/Section5Component';
import Section6Component from './intro/Section6Component';
import Section7Component from './intro/Section7Component';
import Section8Component from './intro/Section8Component';
import Section9Component from './intro/Section9Component';
import Section10Component from './intro/Section10Component';
import './scss/intro.scss';

export default function IntroComponent(){
    
    return (
        <div id="intro">
            <Section1Component/>
            <Section2Component/>
            <Section3Component/>
            <Section4Component/>
            <Section5Component/>
            <Section6Component/>
            <Section7Component/>
            <Section8Component/>
            <Section9Component/>
            <Section10Component/>
        </div>
    );
};