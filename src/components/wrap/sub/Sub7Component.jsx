import React from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import './scss/sub7.scss';

export default function Sub7Component(){

    const [state, setState] = React.useState({
        recipe:[]
    });

    React.useEffect(()=>{

        axios({
            url: './data/sub/sub7.json',
            method:'GET'
        })
        .then((res)=>{
            if(res.status===200){
                setState({
                    ...state,
                    recipe: res.data.recipe
                });
            }
        })
        .catch((err)=>{
            console.log(`err` + err);
        });

    },[]);


    return (
        <div id='sub7'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h2>레시피</h2>
                    </div>
                    <div className="content">
                        <ul>
                            {
                                state.recipe.map((item, idx)=>{
                                    return(
                                        <li key={idx}>
                                            <a href="!#">
                                                <figure><img src={item.src} alt="" /></figure>
                                            </a>
                                            <div>
                                                <h3><a href="!#">{item.title}</a></h3>
                                            </div>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                        <div className="pagenation">
                            <a href="!#"><img className='prev-btn' src="./img/bg_select_arrow.png" alt="" /></a>
                            <a href="!#">1</a>
                            <a href="!#"><img className='next-btn' src="./img/bg_select_arrow.png" alt="" /></a>
                        </div>
                    </div>
                    <form>
                        <select name="event-search-select" id="eventSearchSelect">
                            <option value="제목">제목</option>
                            <option value="내용">내용</option>
                            <option value="글쓴이">글쓴이</option>
                            <option value="아이디">아이디</option>
                            <option value="별명">별명</option>
                        </select>
                        <input type="text" name='event-search' id='eventSearch' />
                        <button type='button'>찾기</button>
                    </form>
                </div>
            </div>
        </div>
    );
};