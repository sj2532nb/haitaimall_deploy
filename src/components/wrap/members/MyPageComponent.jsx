import React from 'react';
import './scss/mypage.scss';

export default function MyPageComponent(){
    return (
        <div id='myPage'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <div className="title-gap">
                            <h2>
                                <a href="/mypage">마이페이지</a>
                                <span>
                                    <a href="!#"><img src="../../../../public/img/mypage_cart.png" alt="" /></a>
                                    <a href="/"><img src="../../../../public/img/mypage_home.png" alt="" /></a>
                                </span>
                            </h2>
                            <p>
                                <figure>
                                    <img src="../../../../public/img/mg_img_member_fault_img.png" alt="" />
                                </figure>
                                <span>
                                    <h4><strong>김도희</strong><em>님 환영합니다.</em></h4>
                                    <a href="!#">회원정보변경</a>
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="content">
                        <div className="content-gap">
                            <h2>회원정보 수정</h2>
                            <form name='updateForm' id='updateForm' action="">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td>
                                                <h4>아이디</h4>
                                                <input type="text" name='userId' id='userId' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>비밀번호</h4>
                                                <input type="text" name='userPw' id='userPw' />
                                                <p><span></span>(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)</p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>비밀번호 확인</h4>
                                                <input type="text" name='userPwChk' id='userPwChk' />
                                                <p><span>비밀번호가 일치하지 않습니다.</span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>이름</h4>
                                                <input type="text" name='userName' id='userName' />
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>휴대전화</h4>
                                                <input type="text" name='userHp' id='userHp' />
                                                <p><span></span></p>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <h4>이메일</h4>
                                                <input type="text" name='userEmail' id='userEmail' />
                                                <p><span>유효한 이메일을 입력해 주세요.</span></p>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div className="button-box">
                                    <span>
                                        <button className='update-btn' type='submit'>회원정보수정</button>
                                        <button className='cancel-btn' type='button'>취소</button>
                                    </span>
                                    <button className='delete-btn' type='button'>회원탈퇴</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};