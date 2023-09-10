import React from 'react';
import axios from 'axios';
import './scss/signin.scss';

export default function SignInComponent(){

    const [state, setState]=React.useState({
        user_id: '',
        user_pw: ''
    })

    const {user_id, user_pw} = state;

    const onChangeUserId=(e)=>{
        setState({
            ...state,
            user_id:e.target.value
        })
    }

    const onChangeUserPw=(e)=>{
        setState({
            ...state,
            user_pw:e.target.value
        })
        
    }
     const onSubmitSignIn=(e)=>{
        e.preventDefault();
        axios({
            url:'/member/signInAction.jsp',
            method: 'POST',
            data:{},
            params: {
                "userId": user_id,
                "userPw": user_pw
            }
        })
        .then((res)=>{
            console.log( res );
            console.log( res.data );
            if(res.status===200){
                const result = res.data;
                try {                    
                    if( result === -1 ){
                        alert('아이디 불일치');                                               
                    }
                    else if( result === 0 ){
                        alert('비밀번호 불일치');
                    }
                    else if( result === 1 ){
                        alert('로그인 성공');
                    }
                    else{
                        alert('데이터베이스 오류');
                    }
                } 
                catch (error) {
                    console.log( error );
                }
            }
            
        })
        .catch((err)=>{
            console.log('AXIOS 실패!' + err);
        });
    }


    return (
        <div id='signIn'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h1>로그인</h1>
                        <p>로그인을 하시면 보다 많은 혜택을 누리실 수 있습니다.</p>
                    </div>
                    <div className="content">
                        <form>
                            <div className="login-box">
                                <ul>
                                    <li><input onChange={onChangeUserId} type="text" name='userId' id='userId' placeholder='아이디' value={user_id}/></li>
                                    <li><input onChange={onChangeUserPw} type="text" name='userPw' id='userPw' placeholder='패스워드' value={user_pw}/></li>
                                </ul>
                            </div>
                            <div className="button-box">
                                <button onClick={onSubmitSignIn} type='submit'>로그인</button>
                            </div>
                            <ul>
                                <li><a href="!#">아이디 찾기</a></li>
                                <i>|</i>
                                <li><a href="!#">비밀번호 찾기</a></li>
                                <i>|</i>
                                <li><a href="!#">회원 가입</a></li>
                            </ul>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};