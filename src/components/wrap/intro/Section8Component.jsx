import React from 'react';
import './scss/section8.scss';

export default function Section8Component(){
    return (
        <section id="section8">
            <div className="container">
                <div className="gap">
                    <div className="content">
                        <div className="left">
                            <h2>
                                Vocal 그레이 | 작곡 그레이
                                <br />
                                맛동산 NEW CM송
                            </h2>
                            <p>
                                맛동산 먹고 즐거운 파티
                                <br />
                                그레이가 부르는 맛동산송을 감상해보세요.
                            </p>
                            <a href="!#">해태제과 유튜브 Go</a>
                            <a href="!#">파티를 위한 맛동산 모음전 🎉</a>
                        </div>
                        <div className="right">
                            <iframe width="884" height="497.250" src="https://www.youtube.com/embed/PSCjgNoAZMw" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen=""></iframe>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};