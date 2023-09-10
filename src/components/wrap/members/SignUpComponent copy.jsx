import React from 'react';
import axios from 'axios';
import './scss/signup.scss';

export default function SignUpComponent(){

    const [state, setState] = React.useState({
        아이디:'',
        isIdErr:false,
        idErrMsg:'',
        비밀번호:'',
        isPwErr:false,
        pwErrMsg:'',
        비밀번호확인:'',
        isPwChkErr:false,
        pwChkErrMsg:'',
        이름:'',
        isNameErr:false,
        nameErrMsg:'',
        휴대전화:'',
        isHpErr:false,
        hpErrMsg:'',
        이메일:'',
        isEmailErr:false,
        emailErrMsg:'',
        전체이용약관:[
            "이용약관 동의(필수)",
            "개인정보처리방침 동의 (필수)",
            "SMS 수신 동의 (선택)",
            "이메일 수신 동의 (선택)"
        ],
        이용약관체크:[]
    });

    const {아이디, isIdErr, idErrMsg, 비밀번호, isPwErr, pwErrMsg, 비밀번호확인, isPwChkErr, pwChkErrMsg, 이름, isNameErr, nameErrMsg, 휴대전화, isHpErr, hpErrMsg, 이메일, isEmailErr, emailErrMsg, 전체이용약관, 이용약관체크} = state;

    // 아이디
    const onChangeUserId=(e)=>{
        const {value} = e.target;
        // 1. 영문소문자, 숫자만 가능
        // 2. 4~16자
        const regExp1 = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;  // 특수문자
        const regExp2 = /^(.){4,16}$/g;  // 4자 이상 16자 이하
        const regExp3 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;  // 한글
        const regExp4 = /[a-z]+[0-9]*/g;  // 영문소문자필수 1자이상 +, 숫자선택 0자이상 *
        const regExp5 = /\s/g;  // 공백

        let 아이디 = '';
        let isIdErr = false;
        let idErrMsg = '';

        아이디 = value.replace(regExp1, '');  // 특수문자 입력 방지

        // 4~16글자 아닐 경우
        // 한글 사용했을 경우
        // 영문 소문자, 숫자 미포함
        // 공백 입력했을 경우
        if(value===''){
            isIdErr = true;
            idErrMsg = '아이디를 입력해 주세요';
        }
        else if( regExp2.test(value)===false || regExp3.test(value)===true || regExp4.test(value)===false || regExp5.test(value)===true){
            isIdErr = true;
            idErrMsg = '대문자/공백/특수문자가 포함되었거나, 숫자로만 이루어진 아이디는 사용할 수 없습니다.';
        }
        else{
            axios({
                url: '/member/idCheckAction.jsp',
                method: 'POST',
                data: {},
                params: {
                    "userId": 아이디
                }
            })
            .then((res)=>{
                try {
                    if(res.data===true){
                        setState({
                            ...state,
                            isIdErr: true,
                            idErrMsg: '이미 존재하는 아이디입니다.'
                        })
                    }
                    else{
                        setState({
                            ...state,
                            isIdErr: false,
                            idErrMsg: ''
                        })
                    }
                } 
                catch (error) {
                    console.log(error);
                }
            })
            .catch((err)=>{
                console.log('AXIOS 실패' + err);
            })
        }

        setState({
            ...state,
            아이디:아이디,
            isIdErr:isIdErr,
            idErrMsg:idErrMsg
        })
    }

    // 비밀번호
    const onChangeUserPw=(e)=>{
        const {value} = e.target;
        // 1. 대소문자/숫자/특수문자 중 2가지 이상 조합
        //    입력 가능 특수문자
        //     ~ ` ! @ # $ % ^ ( ) * _ - = { } [ ] | ; : < > , . ? /
        // 2. 10~16자
        // 3. 공백 입력 불가능
        // 4. 아이디 포함 불가능
        // 5. 연속된 문자/숫자 불가능
        const regExp1 = /([A-Za-z]+[0-9]+)+|([0-9]+[A-Za-z]+)+|([A-Za-z]+[`~!@#$%^*()\-_=[{\]}\\|;:,<.>/?]+)+|([`~!@#$%^*()\-_=[{\]}\\|;:,<.>/?]+[A-Za-z]+)+|([0-9]+[`~!@#$%^*()\-_=[{\]}\\|;:,<.>/?]+)+|([`~!@#$%^*()\-_=[{\]}\\|;:,<.>/?]+[0-9]+)+/g;
        const regExp2 = /^(.){10,16}$/g;  // 4자 이상 16자 이하
        const regExp3 = /\s/g;  // 공백
        const regExp4 = /아이디/g;
        const regExp5 = /(.)\1/g;  // 동일한 문자숫자 연속
        const regExp6 = /[가-힣ㄱ-ㅎㅏ-ㅣ]/g;  // 한글

        let isPwErr = false;
        let pwErrMsg = '';

        if(regExp1.test(value)===false || regExp2.test(value)===false || regExp3.test(value)===true || regExp4.test(value)===true || regExp5.test(value)===true || regExp6.test(value)===true){
            isPwErr = true;
            pwErrMsg = 'pwErrMsg';
        }
        else{
            isPwErr = false;
            pwErrMsg = '';
        }

        setState({
            ...state,
            비밀번호:value,
            isPwErr:isPwErr,
            pwErrMsg:pwErrMsg
        })
    }

    // 비밀번호 확인
    const onChangeUserPwChk=(e)=>{
        const {value} = e.target;
        let isPwChkErr = false;
        let pwChkErrMsg = '';

        if(value!==비밀번호){
            isPwChkErr = true;
            pwChkErrMsg = '비밀번호가 일치하지 않습니다.';
        }
        else{
            isPwChkErr = false;
            pwChkErrMsg = '';
        }
        setState({
            ...state,
            비밀번호확인: value,
            isPwChkErr: isPwChkErr,
            pwChkErrMsg: pwChkErrMsg
        })
    }

    // 이름
    const onChangeUserName=(e)=>{
        const {value} = e.target;
        const regExp = /[`~!@#$%^&*()\-_=+[{\]}\\|;:'",<.>/?]/g;

        let 이름 = '';
        let isNameErr = false;
        let nameErrMsg = '';

        이름 = value.replace(regExp, '');

        if(이름===''){
            isNameErr = true;
            nameErrMsg = '이름을 입력해 주세요';
        }
        else{
            isNameErr = false;
            nameErrMsg = '';
        }

        setState({
            ...state,
            이름: 이름,
            isNameErr: isNameErr,
            nameErrMsg: nameErrMsg
        })
    }

    // 휴대전화
    const onChangeUserHp=(e)=>{
        const {value} = e.target;
        // 1. 숫자만 입력가능
        // 2. 01[0-9] ~
        const regExp1 = /[^\d]/g;  // 숫자가 아닌 것
        const regExp2 = /^01[0-9]{1}[0-9]{3,4}[0-9]{4}$/g;

        let 휴대전화 = '';
        let isHpErr = false;
        let hpErrMsg = '';

        휴대전화 = value.replace(regExp1, '');

        if(휴대전화===''){
            isHpErr = true;
            hpErrMsg = '휴대폰 번호를 입력하세요.';
        }
        else if(regExp2.test(value)===false){
            isHpErr = true;
            hpErrMsg = '유효한 휴대폰 번호를 입력해 주세요';
        }
        else{
            isHpErr = false;
            hpErrMsg = '';
        }

        setState({
            ...state,
            휴대전화: 휴대전화,
            isHpErr: isHpErr,
            hpErrMsg: hpErrMsg,
        })
    }

    // 이메일
    const onChangeUserEmail=(e)=>{
        const {value} = e.target;
        const regExp = /^[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]+(\.)?[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/?]*@[a-z0-9가-힣ㄱ-ㅎㅏ-ㅣ`~!#$%^&*\-_=+{}|'/\.?]+\.[a-z]{2,3}$/gi;
        
        let isEmailErr = false;
        let emailErrMsg = '';

        if(value===''){
            isEmailErr = true;
            emailErrMsg = '이메일을 입력해 주세요.';
        }
        else if(regExp.test(value)===false){
            isEmailErr = true;
            emailErrMsg = '유효한 이메일을 입력해 주세요.';
        }
        else{
            isEmailErr = false;
            emailErrMsg = '';
        }

        setState({
            ...state,
            이메일: value,
            isEmailErr: isEmailErr,
            emailErrMsg: emailErrMsg
        })
    }

    // 이용약관 전체 체크
    const onChangeAgreeAll=(e)=>{
        let 이용약관체크 = [];
        if(e.target.checked===true){
            이용약관체크 = 전체이용약관;
        }
        else{
            이용약관체크 = [];
        }
        setState({
            ...state,
            이용약관체크:이용약관체크
        })
    }

    // 이용약관 개별 체크
    const onChangeEachAgree=(e)=>{
        if(e.target.checked===true){  // 체크되면 개별체크 선택항목 value 값을 이용약관동의 배열에 저장(누적)시킨다.
            setState({
                ...state,
                이용약관체크: [...이용약관체크, e.target.value]
            })
        }
        else{  // 체크 안되면 개별체크 선택항목 value 값을 이용약관동의 배열에서 삭제시킨다.
            setState({
                ...state,
                이용약관체크: 이용약관체크.filter((item)=>item!==e.target.value)
            })
        }
    }

    // 가입하기 버튼 클릭
    const onSubmitSignUp=(e)=>{
        e.preventDefault();

        let cnt=0;
        이용약관체크.map((item)=>{
            if(item.indexOf('필수')!==-1){
                cnt++;
            }
        });

        // 최종 유효성 검사
        if(아이디===''){
            alert('아이디를 입력하세요');
        }
        else if(비밀번호===''){
            alert('비밀번호를 입력하세요');
        }
        else if(비밀번호확인===''){
            alert('비밀번호를 한번 더 입력하세요');
        }
        else if(이름===''){
            alert('이름을 입력하세요');
        }
        else if(휴대전화===''){
            alert('휴대전화를 입력하세요');
        }
        else if(이메일===''){
            alert('이메일을 입력하세요');
        }
        else if(cnt<2){
            alert('이용약관에 동의하세요');
        }
        else{
            const regExpHp = /^(\d{3})(\d{3,4})(\d{4})$/g;

            let 약관동의 = '';
            이용약관체크.map((item, idx)=>{
                if(idx===이용약관체크.length-1){
                    약관동의 += item
                }
                else{
                    약관동의 += item + ', '
                }
            })

            let formData = {
                "userId": 아이디,
                "userPw": 비밀번호,
                "userName": 이름,
                "userHp": 휴대전화.replace(regExpHp, '$1-$2-$3'),
                "userEmail": 이메일,
                "userAgree": 약관동의
            }

            axios({
                url: '/member/signUpAction.jsp',
                method: 'POST',
                data: {},
                params: formData
            })
            .then((res)=>{
                if(res.readyState===4 && res.status===200){
                    window.location.pathname="/intro";
                }
            })
            .catch((err)=>{
                console.log('AXIOS 실패' + err);
            })
        }
    }


    return (
        <div id='signUp'>
            <div className="container">
                <div className="gap">
                    <div className="title">
                        <h1>회원가입</h1>
                        <p>
                            안녕하세요. 해태몰의 회원이 되시면
                            <br />
                            달콤하고 풍성한 혜택을 누리실 수 있습니다.
                        </p>
                    </div>
                    <div className="content">
                        <form onSubmit={onSubmitSignUp} name='signUpForm' id='signUpForm' method='post' action="./signUpAction.jsp">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>
                                            <h4>아이디</h4>
                                            <input minLength={4} maxLength={16} onChange={onChangeUserId} type="text" name='userId' id='userId' value={아이디}/>
                                            <p><span className={`id-err-msg ${isIdErr?' on':''}`}>{idErrMsg}</span>(영문소문자/숫자, 4~16자)</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>비밀번호</h4>
                                            <input minLength={10} maxLength={16} onChange={onChangeUserPw} type="text" name='userPw' id='userPw' value={비밀번호}/>
                                            <p><span className={`pw-err-msg ${isPwErr?' on':''}`}>{pwErrMsg}</span>(영문 대소문자/숫자/특수문자 중 2가지 이상 조합, 10자~16자)</p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>비밀번호 확인</h4>
                                            <input minLength={10} maxLength={16} onChange={onChangeUserPwChk} type="text" name='userPwChk' id='userPwChk' value={비밀번호확인}/>
                                            <p><span className={`pwChk-err-msg ${isPwChkErr?' on':''}`}>{pwChkErrMsg}</span></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>이름</h4>
                                            <input maxLength={30} onChange={onChangeUserName} type="text" name='userName' id='userName' value={이름}/>
                                            <p><span className={`name-err-msg ${isNameErr?' on':''}`}>{nameErrMsg}</span></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>휴대전화</h4>
                                            <input maxLength={11} onChange={onChangeUserHp} type="text" name='userHp' id='userHp' value={휴대전화}/>
                                            <p><span className={`hp-err-msg ${isHpErr?' on':''}`}>{hpErrMsg}</span></p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <h4>이메일</h4>
                                            <input maxLength={250} onChange={onChangeUserEmail} type="text" name='userEmail' id='userEmail' value={이메일}/>
                                            <p><span className={`email-err-msg ${isEmailErr?' on':''}`}>{emailErrMsg}</span></p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className="agree-box">
                                <div className="all-check-box">
                                    <h4><label><input onChange={onChangeAgreeAll} type="checkbox" name='agreeAll' id='agreeAll' value={'전체 동의'} checked={이용약관체크.length===전체이용약관.length}/>전체 동의</label></h4>
                                    <p>이용약관, 개인정보수집 및 이용, 쇼핑정보 수신(선택)에 모두 동의합니다.</p>
                                </div>
                                <div className="each-check-box">
                                    <div className="required-check-box">
                                        <h4><label><input onChange={onChangeEachAgree} type="checkbox" name='agree1' id='agree1' value={'이용약관 동의(필수)'} checked={이용약관체크.includes('이용약관 동의(필수)')}/>이용약관 동의(필수)</label></h4>
                                        <div className="agree-content">
                                            <h5>제 1 조 | 수집하는 개인정보의 항목 및 수집방법</h5>
                                            <br />
                                            <p>
                                                ① 수집하는 개인정보 항목
                                                <br />
                                                ○ 필수항목 : 이름, 아이디, 비밀번호, 이메일, 휴대전화번호
                                                <br />
                                                ○ 선택사항 : 주소
                                                <br />
                                                <br />
                                                ② 개인정보 수집방법
                                                <br />
                                                가. 회사가 운영 중인 온라인 사이트(www.haitaimall.co.kr)를 통한 수집
                                                <br />
                                                <br />
                                                ③ 허위 정보 입력 시 회사의 조치
                                                <br />
                                                회원은 자신의 정보에 대해 정확성 및 적법성을 보장해야 합니다. 만약 이를 위반하여 타인의 정보를 도용하는 등 각종 방법으로 허위 정보를 입력할 경우 회사는 회원을 관계법령에 따라 신고 할 수 있으며 강제 탈퇴를 시킬 수도 있습니다.
                                            </p>
                                            <p>
                                                <br />
                                            </p>
                                            <h5>제 2 조 | 개인정보의 수집 및 이용 목적</h5>
                                            <br />
                                            <br />
                                            <p>
                                                ① 회사는 서비스제공을 위하여 필요한 최소한의 범위 내에서 다음 각 항목과 같은 목적으로 개인정보를 수집하고 있습니다.
                                                <br />
                                                <br />
                                                수집 및 이용목적    보유 및 이용기간
                                                <br />
                                                - 공지, 불만처리 등을 위한 원활한 의사소통 경로 확보
                                                <br />
                                                - 새로운 서비스, 신상품, 이벤트 정보 제공    개인정보 수집 및 이용목적이 달성될 때까지
                                                <br />
                                                <br />
                                                ② 고객님의 기본적 인권 침해의 우려가 있는 민감한 개인정보는 수집하지 않습니다.
                                            </p>
                                            <h5>제 3 조 | 개인정보 제공 및 공유</h5>
                                            <br />
                                            <br />
                                            <p>
                                                ① 회사는 고객의 개인정보를 ‘개인정보 수집, 제공 및 활용동의서’에서 고지한 범위 내에서만 사용하며, 원칙적으로 고객의 개인정보를 제3자에 제공하지 않습니다.
                                                <br />
                                                ② 다음의 경우에는 관련 법령의 규정에 의하여 회원의 동의 없이 개인정보를 제공하는 것이 가능합니다.
                                                <br />
                                                <br />
                                                가. 서비스 제공에 따른 요금(포인트) 정산과 상품 배송을 위하여 필요한 경우
                                                <br />
                                                나. 통계작성, 학술연구 또는 시장조사를 위하여 필요한 경우 특정 개인을 알아 볼 수 없는 형태로 가공하여 제공하는 경우
                                                <br />
                                                다. 법령의 규정에 의거하거나, 수사 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구가 있는 경우
                                            </p>
                                            <h5>제 4 조 | 개인정보의 보유, 이용기간 및 파기</h5>
                                            <br />
                                            <br />
                                            <p>
                                                ① 회사는 개인정보의 수집목적 또는 제공받은 목적이 달성된 때에는 회원의 개인정보를 지체 없이 파기합니다.
                                                <br />
                                                <br />
                                                구체적인 파기 시점은 다음과 같습니다.
                                                <br />
                                                <br />
                                                가. 회원가입 정보 : 회원가입을 탈퇴하거나 회원에서 제명된 때
                                                <br />
                                                나. 배송정보 : 물품 또는 서비스가 인도되거나 제공된 때
                                                <br />
                                                <br />
                                                ② 단, 상법 등 관련법령의 규정에 따라 보존할 필요가 있는 경우 회사는 관계법령에서 정한 일정한 기간 동안 회원의 개인정보를 보관합니다.
                                                이 경우 회사는 보관하는 정보를 그 보관의 목적으로만 이용하며 보존기간은 아래와 같습니다.
                                                <br />
                                                <br />
                                                가. 계약 또는 청약철회 등에 관한 기록
                                                <br />
                                                <br />
                                                - 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
                                                <br />
                                                - 보존 기간 : 5년
                                                <br />
                                                <br />
                                                나. 대금결제 및 재화 등의 공급에 관한 기록
                                                <br />
                                                <br />
                                                - 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
                                                <br />
                                                - 보존 기간 : 5년
                                                <br />
                                                <br />
                                                다. 전자금융 거래에 관한 기록
                                                <br />
                                                <br />
                                                - 보존 이유 : 전자금융거래법
                                                <br />
                                                - 보존 기간 : 5년
                                                <br />
                                                <br />
                                                라. 소비자의 불만 또는 분쟁처리에 관한 기록
                                                <br />
                                                <br />
                                                - 보존 이유 : 전자상거래 등에서의 소비자보호에 관한 법률
                                                <br />
                                                - 보존 기간 : 3년
                                                <br />
                                                <br />
                                                마. 웹사이트 방문기록
                                                <br />
                                                <br />
                                                - 보존 이유 : 통신비밀보호법
                                                <br />
                                                - 보존 기간 : 3개월
                                                <br />
                                                <br />
                                                ③ 파기절차
                                                <br />
                                                <br />
                                                - 회원님이 회원가입 등을 위해 입력하신 정보는 목적이 달성된 후 별도의 DB로 옮겨져(종이의 경우 별도의 서류함) 내부 방침 및 기타 관련 법령에 의한 정보보호 사유에 따라(보유 및 이용기간 참조) 일정 기간 저장된 후 파기되어집니다.
                                                <br />
                                                - 별도 DB로 옮겨진 개인정보는 법률에 의한 경우가 아니고서는 보유되어지는 이외의 다른 목적으로 이용되지 않습니다.
                                                <br />
                                                <br />
                                                ④ 파기방법
                                                <br />
                                                <br />
                                                가. 종이에 출력된 개인정보: 분쇄기로 분쇄하거나 소각
                                                <br />
                                                나. 전자적 파일형태로 저장된 개인정보: 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제
                                            </p>
                                            <h5>제 5 조 | 수집한 개인정보의 처리취급 위탁</h5>
                                            <br />
                                            <br />
                                            <p>
                                                ① 회사는 서비스 이행을 위해 아래와 같이 개인정보 처리 업무를 외부 전문업체에 위탁하여 운영하고 있습니다.
                                                <br />
                                                <br />
                                                가. 경품배송 : 대한통운
                                                <br />
                                                나. 이벤트 등 광고성 정보 전달 위탁: 휴머스온
                                                <br />
                                                <br />
                                                ② 위탁계약 시 개인정보보호의 안전을 기하기 위하여 개인정보보호 관련 지시 엄수, 개인정보에 관한 금지 및 사고시의 책임부담 등을 명확히 규정하고 당해 계약 내용을 서면 및 전자적으로 보관하고 있습니다.
                                                <br />
                                                <br />
                                                동 업체가 변경될 경우, 회사는 변경된 업체명을 개인정보 처리취급방침 화면에 공지합니다.
                                            </p>
                                            <h5>제 6 조 | 이용자 및 법정대리인의 권리와 그 행사방법</h5>
                                            <br />
                                            <br />
                                            <p>
                                                ① 이용자 및 법정 대리인은 언제든지 등록되어 있는 자신의 개인정보를 조회하거나 수정할 수 있으며 가입 해지를 요청할 수도 있습니다.
                                                <br />
                                                가. 고객상담센터 전화 : 본인 확인 후 개인정보 열람, 정정, 탈퇴
                                                <br />
                                                나. 해태몰 홈페이지 방문 : 로그인 후 『정보수정』을 클릭 하여 개인정보 열람, 정정, 탈퇴
                                                <br />
                                                다. 개인정보 관리 담당자에게 서면, 전화 또는 E-mail로 연락하시면 지체 없이 조치하겠습니다.
                                                <br />
                                                <br />
                                                ② 회사는 이용자 혹은 법정 대리인의 요청에 의해 해지 또는 삭제된 개인정보는 회사가 수집하는 개인정보의 보유 및 이용 기간에 명시된 바에 따라 처리하고 그 외의 용도로 열람 또는 이용할 수 없도록 처리하고 있습니다.
                                            </p>
                                            <h5>제 7 조 | 쿠키의 운영 및 활용</h5>
                                            <br />
                                            <br />
                                            <p>
                                                ① 해탬몰은 회원의 정보를 수시로 저장하고 찾아내는 '쿠키(COOKIE)'를운영합니다. 쿠키란 회사의 웹사이트를 운영하는데 이용되는 서버가 회원의 브라우저에 보내는 아주 작은 텍스트 파일로서 회원의 컴퓨터 하드디스크에 저장됩니다.
                                                <br />
                                                ② 해태몰 사이트는 다음과 같은 목적으로 쿠키를 사용합니다.
                                                <br />
                                                <br />
                                                가. 회원과 비회원의 접속 빈도나 방문 시간 등을 분석하고 이용자의 취향과 관심분야를 파악하여 타겟(Target) 마케팅 및 서비스 개편 등의 척도로 활용합니다.
                                                <br />
                                                나. 해태몰사이트에서는 이벤트 진행시 회원의 참여 정도 및 방문 회수를 파악하여 차별적인 응모 기회를 부여하고 개인의 관심 분야에 따라 차별화 된 정보를 제공하기 위한 자료로 이용됩니다.
                                                <br />
                                                다. 회원은 쿠키 설치에 대한 선택권을 가지고 있습니다. 따라서 회원은 웹 브라우저에서 옵션을 설정함으로써 모든 쿠키를 허용하거나, 쿠키가 저장될 때마다 확인을 거치거나, 아니면 모든 쿠키의 저장을 거부 할 수도 있습니다.
                                                <br />
                                                <br />
                                                쿠키 설치 허용 여부를 지정하는 방법 [Internet Explorer 6.0을 사용하고 있는 경우]
                                                <br />
                                                <br />
                                                1. [도구] 메뉴에서 [인터넷 옵션]을 선택합니다.
                                                <br />
                                                2. [개인정보 탭]을 클릭합니다.
                                                <br />
                                                3. [개인정보보호 수준]을 설정하시면 됩니다.
                                                <br />
                                                <br />
                                                회원께서 쿠키 설치를 거부하셨을 경우 사이트 서비스 제공에 어려움이 있습니다.
                                            </p>
                                            <h5>제 8 조 | 개인정보 관리부서 및 담당자</h5>
                                            <br />
                                            <br />
                                            <p>
                                                회사는 회원의 개인정보를 보호하고 개인정보와 관련한 불만을 처리하기 위하여 아래와 같이 관련 부서 및 개인정보 관리 담당자를 지정하고 있습니다.
                                                <br />
                                                <br />
                                                고객서비스담당 부서 : 
                                                <br />
                                                전화번호 : 02-3158-4790
                                                <br />
                                                이메일 :htmall@ht.co.kr
                                                <br />
                                                개인정보관리책임자 성명 : 박병건부장
                                                <br />
                                                전화번호 : 02-709-7529
                                                <br />
                                                이메일 : pbg68@ht.co.kr
                                                <br />
                                                <br />
                                                회사의 서비스를 이용하시며 발생하는 모든 개인정보보호 관련 민원을 개인정보 관리 담당자 혹은 담당부서로 신고하실 수 있습니다.
                                                <br />
                                                <br />
                                                회사는 이용자들의 신고사항에 대해 신속하게 충분한 답변을 드릴 것입니다. 기타 개인정보침해에 대한 신고나 상담이 필요하신 경우에는 아래 기관에 문의하시기 바랍니다.
                                                <br />
                                                <br />
                                                ① 개인분쟁조정위원회 (www.1336.or.kr/1336)
                                                <br />
                                                ② 정보보호마크인증위원회 (www.eprivacy.or.kr/02-580-0533~4)
                                                <br />
                                                ③ 대검찰청 인터넷범죄수사센터 (http://icic.sppo.go.kr/02-3480-3600)
                                                <br />
                                                ④ 경찰청 사이버테러대응센터 (www.ctrc.go.kr/02-392-0330)
                                            </p>
                                            <h5>제 9 조 | 개인정보의 기술적/관리적 보호 대책</h5>
                                            <br />
                                            <br />
                                            <p>
                                                ① 기술적 대책
                                                <br />
                                                회사는 개인정보를 처리함에 있어 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.
                                                <br />
                                                <br />
                                                가. 접속기록의 위ㆍ변조 방지 조치를 취하고 있습니다.
                                                <br />
                                                나. 개인정보는 그 종류에 따라 관련 법령이 요구하는 수준의 암호화 저장 또는 전송 시 암호화 기술을 적용하여 관리합니다.
                                                <br />
                                                다. 백신프로그램을 이용하여 컴퓨터 바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있으며, 백신프로그램을 주기적으로 업데이트하여 개인정보가 침해되는 것을 방지하고 있습니다.
                                                <br />
                                                라. 암호알고리즘을 이용하여 네트워크상 개인정보를 안전하게 전송하는 보안장치(SSL 등)를 채택하고 있습니다.
                                                <br />
                                                마. 해킹 등 외부 침입에 대비하여 침입차단시스템 및 침입방지시스템을 설치하여 보안에 최선을 다하고 있습니다.
                                                <br />
                                                <br />
                                                ② 관리적 대책
                                                <br />
                                                <br />
                                                가. 회사는 개인정보 보호에 관한 내부관리계획을 수립, 시행하고 있습니다.
                                                <br />
                                                나. 회사는 개인정보에 대한 접근권한을 필요?최소한의 인원으로 제한하고 있습니다. 그 최소한의 인원에 해당하는 자는 다음과 같습니다.
                                                <br />
                                                <br />
                                                1. 고객을 직접 상대하여 상담, CRM(마케팅 등) 업무를 수행하는 자
                                                <br />
                                                2. 개인정보관리책임자 및 그 담당자 등 개인정보관리업무를 수행하는 자
                                                <br />
                                                3. 기타 업무상 개인정보의 처리가 불가피한 자
                                                <br />
                                                <br />
                                                다. 회사는 개인정보를 처리하는 직원을 대상으로 새로운 보안기술 습득 및 개인정보 보호의무 등에 관해 정기적인 사내 교육 및 외부 위탁 교육을 실시합니다.
                                                <br />
                                                라. 회사는 직원 입사 시 보안서약서를 통하여 사람에 의한 정보유출을 사전에 방지하고 개인정보 처리취급방침에 대한 이행사항 및 직원의 준수 여부를 감사하기 위한 내부절차를 마련하고 있습니다.
                                                <br />
                                                마. 개인정보 처리자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이루어지도록 하며 입사 및 퇴사 후 개인정보 사고에 관한 책임을 명확히 합니다.
                                                <br />
                                                바. 개인정보와 일반 데이터는 혼합하여 보관하지 않고 분리하여 보관합니다.
                                                <br />
                                                사. 전산실 및 자료 보관실 등을 특별 보호구역으로 설정하여 출입을 통제합니다.
                                                <br />
                                                아. 회사는 고객의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다. 고객 스스로가 본인의 개인정보를 보호하기 위해서 자신의 아이디와 비밀번호를 적절하게 관리하고 스스로 책임을 져야 합니다.
                                                <br />
                                                자. 회사는 내부 관리자의 실수나 기술관리 상 사고로 인하여 개인정보의 도난, 유출, 변조, 훼손이 유발될 경우 적절한 대책과 보상을 강구합니다.
                                            </p>
                                            <h5>제 10 조 | 개인정보 처리취급방침의 전자적 표시</h5>
                                            <br />
                                            <br />
                                            <p>
                                                회사는 개인정보 처리취급방침을 공개함에 있어 고객이 홈페이지 등을 통하여 개인정보 처리취급방침의 주요사항을 언제든지 쉽게 확인할 수 있도록 방송통신위원회가 고시하는 방법에 따른 전자적 표시를 함께 하고 있습니다.
                                            </p>
                                            <h5>제 11 조 | 고지의 의무</h5>
                                            <br />
                                            <br />
                                            <p>
                                                정부의 정책 또는 회사의 정책에 따라 본 개인정보 처리취급방침 내용의 추가 삭제 및 수정이 있을 시에는 해태몰 홈페이지를 통해 고지할 것입니다.
                                                <br />
                                                개인정보처리취급방침공고일자 : 2014년 8월 28일
                                                <br />
                                                개인정보처리취급방침시행일자 : 2014년 8월 28일
                                            </p>
                                        </div>
                                    </div>
                                    <div className="required-check-box">
                                        <h4><label><input onChange={onChangeEachAgree} type="checkbox" name='agree2' id='agree2' value={'개인정보처리방침 동의 (필수)'} checked={이용약관체크.includes('개인정보처리방침 동의 (필수)')}/>개인정보처리방침 동의 (필수)</label></h4>
                                        <div className="agree-content">
                                            <p>
                                                1.1(총칙)
                                                <br />
                                                개인정보란 생존하는 개인에 관한 정보로서 당해 정보에 포함되어 있는 성명 등의 사항에 의하여 당해 개인을 알아볼 수 있는 부호, 문자, 음성, 음향 및 영상 등의 정보(당해 정보만으로는 특정 개인을 식별할 수 없더라도 다른 정보와 용이하게 결합하여 식별할 수 있는 것을 포함합니다)를 말합니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 귀하의 개인정보보호를 매우 중요시하며, 『개인정보보호법』,『정보통신망 이용 촉진 및 정보보호에 관한 법률』 등 개인정보보호 관련 법률 및 하위 법령들을 준수하고 있습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 개인정보취급방침을 통하여 귀하가 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다. 해태제과식품(주)은 개인정보취급방침을 홈페이지 첫화면에 공개함으로써 귀하께서 언제나 용이하게 보실 수 있습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 개인정보취급방침의 지속적인 개선을 위하여 개정하는데 필요한 절차를 정하고 있으며, 개인정보취급방침을 회사의 필요와 사회적 변화에 맞게 변경할 수 있습니다. 그리고 개인정보취급방침을 개정하는 경우 과거의 개정된 사항을 귀하께서 쉽게 알아볼 수 있도록 하고 있습니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.2(개인정보 수집에 대한 동의)
                                                <br />
                                                <br />
                                                해태제과식품(주)은 귀하께서 해태제과식품(주)의 개인정보 수집,이용 또는 이용약관의 내용에 대해 「동의함」버튼 또는 「동의안함」버튼을 클릭할 수 있는 절차를 마련하여, 「동의함」버튼을 클릭하면 개인정보 수집에 대해 동의한 것으로 봅니다.
                                                <br />
                                                <br />
                                                인터넷을 통한 동의절차를 마련하기 어려운 경우에, 해태제과식품(주)은 동의 받아야 할 사항을 전화,서면 등의 방법으로 법적 절차를 거쳐 동의를 받을 수 있습니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.3(개인정보 수집항목 및 이용목적)
                                                <br />
                                                <br />
                                                해태제과식품(주)은 회원가입시 또는 물품 주문시 아래의 개인정보 항목을 다음과 같은 목적을 위하여 수집하고 있습니다. 단, 고객의 개인정보를 수집하는 경우에는 그 목적에 필요한 최소한의 개인정보를 수집하고 있습니다. 필수항목 : 이름, 이메일, 비밀번호, 휴대전화 (회원제 서비스 이용에 따른 본인 식별 절차 등에 이용)
                                                <br />
                                                <br />
                                                선택항목 : 주소 (고지사항 전달, 상품 배송에 이용)
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                단, 이용자의 기본적 인권 침해의 우려가 있는 민감한 개인정보(인종 및 민족, 사상 및 신조, 출신지 및 본적지, 정치적 성향 및 범죄기록, 건강상태 및 성생활 등)는 수집하지 않습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 고객에게 재화나 서비스를 홍보하거나 판매를 권유하기 위하여 개인정보의 처리에 대한 동의를 받으려는 때에는 고객이 이를 명확하게 인지할 수 있도록 알리고 동의를 받습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 불법카드거래 예방을 위해 필요한 조치를 취할 수 있습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 관계법률 및 이용약관 또는 이 방침에서 별도로 정한 사항 이외에는 수집목적이 달성되거나 회원탈퇴시까지 수집된 개인정보를 보유하거나 이용할 수 있습니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.4(개인정보의 보유 및 이용기간)
                                                <br />
                                                <br />
                                                귀하의 개인정보는 다음과 같이 개인정보의 수집목적 또는 제공받은 목적이 달성되면 파기됩니다. 단, '전자상거래등에서 소비자보호에 관한 법률’, ‘국세기본법’ 등 관련 법령의 규정에 의하여 다음과 같이 거래 관련 권리 의무 관계의 확인 등을 이유로 일정기간 보유하여야 할 필요가 있을 경우에는 일정기간 보유합니다. 전자상거래등에서의 소비자보호에 관한 법률에 의한 보관 계약 또는 청약철회 등에 관한 기록 : 5년
                                                <br />
                                                <br />
                                                대금결제 및 재화등의 공급에 관한 기록 : 5년
                                                <br />
                                                <br />
                                                소비자의 불만 또는 분쟁처리에 관한 기록 : 3년
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                국세기본법 등에 따라 거래기록 등을 보관해야 하는 경우
                                                <br />
                                                <br />
                                                소비자기본법 등에 의한 소비자분쟁해결 요청을 접수 및 처리해야 하는 경우
                                                <br />
                                                <br />
                                                제조물책임법등에 따른 손해배상 요청을 접수 및 처리해야 하는 경우
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                관련 법률에 그 근거가 없더라도, 기타 회사의 중대한 손실을 예방하거나, 범죄예방 및 소송 등을 위해 보관해야 하는 경우에는 보관할 수 있으며, 단 그 목적을 달성하기 위한 최소한의 기간 및 항목만 보관합니다. 회원가입을 탈퇴하거나 제명된 경우 3개월 동안 재가입 방지를 위한 식별정보
                                                <br />
                                                <br />
                                                이용 약관에 의해 부득이 회원에서 제명된 경우 거래거절을 위한 식별정보
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                개인정보를 파기하지 않고 보존하는 경우에는, 다른 개인정보 및 개인정보파일과 논리적으로 분리하여 보관하고 해당 목적을 달성하기 위한 목적으로만 이용합니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.5(비회원의 개인정보)
                                                <br />
                                                <br />
                                                해태제과식품(주)은 비회원 주문의 경우에도 배송, 대금결제, 주문내역 조회 및 구매확인, 실명여부 확인을 위하여 필요한 개인정보만을 요청하고 있으며, 이 경우 그 정보는 대금결제 및 상품의 배송에 관련된 용도 이외에는 다른 용도로 사용되지 않습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 비회원의 개인정보도 회원과 동등한 수준으로 보호합니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.6(목적 외 사용 및 제 3자에 대한 제공 및 공유)
                                                <br />
                                                <br />
                                                해태제과식품(주)은 귀하의 개인정보를 「개인정보의 수집목적 및 이용목적」에서 고지한 범위 내에서 사용하며, 동 범위를 초과하여 이용하거나 타인 또는 타기업, 기관에 제공하지 않습니다. 특히 다음의 경우는 주의를 기울여 개인정보를 이용 및 제공할 것입니다. 위탁 처리 : 고객과의 계약을 이행하기 위해 이용자의 개인정보를 위탁 처리할 경우 반드시 사전에 위탁처리업체명과 업무위탁 목적 등에 대해 상세하게 고지합니다. 위탁 처리는 고객과의 계약을 이행하기 위해 반드시 위탁업체에 개인정보를 제공해야 하며, ‘전자상거래소비자보호법’ 등에 의한 근거가 있습니다. 따라서 위탁업체에 개인정보를 제공하는 것을 거부하는 경우에는 당사의 서비스를 제공받지 못할 수 있습니다. 단, 재화 또는 용역을 홍보하거나 판매를 권유하는 업무를 위탁하는 경우에는 서면, 전자우편, 모사전송(FAX), 휴대전화 문자전송 등의 방법으로 위탁하는 업무의 내용과 수탁자를 알려드립니다.
                                                <br />
                                                <br />
                                                제휴관계 및 제3자 제공 : 보다 나은 서비스 제공을 위하여 귀하의 개인정보를 동의를 구한 후 제휴사에게 제공하거나 또는 제휴사와 공유할 수 있습니다. 개인정보를 제공하거나 공유할 경우에는 사전에 귀하께 제휴사가 누구인지, 제공 또는 공유되는 개인정보항목이 무엇인지, 왜 그러한 개인정보가 제공되거나 공유되어야 하는지, 그리고 언제까지 어떻게 보호, 관리되는지에 대해 개별적으로 전자우편 및 서면을 통해 고지하여 동의를 구하는 절차를 거치게 되며, 귀하께서 동의하지 않는 경우에는 제휴사에게 제공하거나 제휴사와 공유하지 않습니다. 제휴관계에 변화가 있거나 제휴관계가 종결될 때도 같은 절차에 의하여 고지하거나 동의를 구합니다.
                                                <br />
                                                <br />
                                                매각, 인수합병 등 : 매각이나 인수합병 등에 의하여 개인정보가 다른 사업자에게 승계, 이전되는 경우 반드시 사전에 정당한 사유와 절차에 대해 상세하게 고지할 것이며 이용자의 개인정보에 대한 동의 철회의 선택권을 부여합니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                고지 및 동의방법은 온라인 홈페이지 초기화면의 공지사항을 통해 고지하거나 이메일 등을 이용하여 개별적으로 고지할 수 있습니다.
                                                <br />
                                                <br />
                                                다음은 예외로 합니다. 귀하로부터 별도의 동의를 받은 경우
                                                <br />
                                                <br />
                                                관계법령에 의하여 수사상의 목적으로 관계기관으로부터의 요구가 있을 경우
                                                <br />
                                                <br />
                                                통계작성, 학술연구나 시장조사를 위하여 특정 개인을 식별할 수 없는 형태로 광고주, 협력사나 연구단체 등에 제공하는 경우 등
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.7(개인정보의 열람 및 정정)
                                                <br />
                                                <br />
                                                귀하는 언제든지 등록되어 있는 귀하의 개인정보를 열람하거나 정정하실 수 있습니다. 개인정보 열람 및 정정을 하고자 할 경우에는 『개인정보변경』을 클릭하여 직접 열람 또는 정정하거나, 개인정보관리책임자 및 담당자에게 서면, 전자우편, 모사전송(FAX) 및 전화로 연락하시면 본인확인 절차를 거쳐 지체 없이 조치하겠습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 귀하로부터 전항의 요구가 있는 경우 법정 기한 내에 그 요구에 응답합니다. 단, 이 경우 해당 기간 내에 응답할 수 없는 정당한 사유가 있을 때에는 귀하에게 그 사유를 알리고 연기할 수 있으며, 그 사유가 소멸하면 지체 없이 응답합니다.
                                                <br />
                                                <br />
                                                단, 아래의 경우에는 열람을 제한하거나 거절할 수 있으며, 그 사유를 알려드립니다. 법률에 따라 열람 등이 금지되거나 제한되는 경우
                                                <br />
                                                <br />
                                                다른 사람의 생명, 신체를 해할 우려가 있거나 다른 사람의 재산과 그 밖의 이익을 부당하게 침해할 우려가 있는 경우
                                                <br />
                                                <br />
                                                오로지 해태제과식품(주)을 해할 목적으로 요구하거나, 반복적으로 요구하는 등 회사의 업무 수행에 중대한 지장을 초래하는 경우
                                                <br />
                                                <br />
                                                기타 열람을 제한하거나 거절하는 것이 객관적으로 타당한 경우
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.8(개인정보의 수집 등에 대한 동의철회, 삭제 및 처리정지 )
                                                <br />
                                                <br />
                                                회원가입 등을 통해 개인정보의 수집, 이용, 제공에 대해 귀하께서 동의하신 내용을 귀하는 언제든지 철회하거나, 삭제 및 처리정지를 요청할 수 있습니다. 동의철회는 홈페이지 첫 화면의 『정보변경』에서 "회원탈퇴" 또는 “동의철회” 를 클릭함으로써 요청할 수 있으며, 직접 개인정보관리책임자에게 서면, 전화, 전자우편 등으로 연락하시면 본인확인 절차를 거쳐 즉시 회원탈퇴를 위해 필요한 조치를 하겠습니다.
                                                (단, 재가입유예기간 동안의 재가입 방지 등을 위해 귀하께서 탈퇴하신 날로부터 3개월 경과 후에 파기하도록 합니다.)
                                                동의 철회를 하고 개인정보를 파기하는 등의 조치를 취한 경우에는 그 사실을 귀하께 지체없이 통지하도록 하겠습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 개인정보의 수집에 대한 동의철회(회원탈퇴)를 개인정보를 수집하는 방법보다 쉽게 할 수 있도록 필요한 조치를 취하겠습니다.
                                                단, 앞에서 밝힌 바와 같이 개인정보를 보존해야 하는 경우에는 예외적으로 처리될 수 있습니다.
                                                <br />
                                                <br />
                                                개인정보 수집 목적 달성 후 개인정보를 파기하는 때에는 다음 각호의 방법에 의합니다. 종이에 출력된 개인정보 : 분쇄기로 분쇄하거나 소각
                                                <br />
                                                <br />
                                                전자적 파일 형태로 저장된 개인정보 : 기록을 재생할 수 없는 기술적 방법을 사용하여 삭제
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                타인의 개인정보를 도용하여 회원가입 등을 하였음을 알게 된 때에는 지체없이 해당 아이디에 대한 서비스 이용정지 또는 회원탈퇴 등 필요한 조치를 취할 수 있습니다. 또 자신의 개인정보 도용을 인지한 이용자가 해당 아이디에 대해 서비스 이용정지 또는 회원탈퇴를 요구하는 경우에도 필요한 조치를 취할 수 있으며, 경찰의 수사에 필요한 경우에는 소정의 절차를 거쳐 수사기관에 그 내용이 제출될 수 있습니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.9(개인정보 자동수집 장치의 설치,운영 및 거부)
                                                <br />
                                                <br />
                                                해태제과식품(주)은 귀하에 대한 정보를 저장하고 수시로 찾아내는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트가 귀하의 컴퓨터 브라우저 (넷스케이프, 인터넷 익스플로러 등)로 전송하는 소량의 정보입니다. 귀하께서 웹사이트에 접속을 하면 해태제과식품(주)의 컴퓨터는 귀하의 브라우저에 있는 쿠키의 내용을 읽고, 귀하의 추가정보를 귀하의 컴퓨터에서 찾아 접속에 따른 성명 등의 추가 입력 없이 서비스를 제공할 수 있습니다. 쿠키는 귀하의 컴퓨터는 식별하지만 귀하를 개인적으로 식별하지는 않습니다.
                                                <br />
                                                <br />
                                                또한 귀하는 쿠키에 대한 선택권이 있습니다. 웹브라우저 상단의 도구 &gt;인터넷옵션 탭(option tab)에서 모든 쿠키를 다 받아들이거나, 쿠키가 설치될 때 통지를 보내도록 하거나, 아니면 모든 쿠키를 거부할 수 있는 선택권을 가질 수 있습니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.10(개인정보 보호를 위한 기술 및 관리적 대책)
                                                <br />
                                                <br />
                                                기술적 대책 해태제과식품(주)은 귀하의 개인정보를 취급함에 있어 개인정보가 분실, 도난, 누출, 변조 또는 훼손되지 않도록 안전성 확보를 위하여 다음과 같은 기술적 대책을 강구하고 있습니다.
                                                <br />
                                                <br />
                                                귀하의 개인정보는 비밀번호에 의해 보호되며 파일 및 전송데이터를 암호화하거나 파일 잠금기능(Lock)을 사용하여 중요한 데이터는 별도의 보안기능을 통해 보호되고 있습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 백신프로그램을 이용하여 컴퓨터바이러스에 의한 피해를 방지하기 위한 조치를 취하고 있습니다. 백신프로그램은 주기적으로 업데이트되며 갑작스런 바이러스가 출현할 경우 백신이 나오는 즉시 이를 제공함으로써 개인정보가 침해되는 것을 방지하고 있습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 암호알고리즘을 이용하여 네트워크 상의 개인정보를 안전하게 전송할 수 있는 보안장치를 채택하고 있습니다.
                                                <br />
                                                <br />
                                                해킹 등 외부침입에 대비하여 각 서버마다 침입차단시스템 및 취약점 분석시스템 등을 이용하여 보안에 만전을 기하고 있습니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                관리적 대책 해태제과식품(주)은 귀하의 개인정보에 대한 접근권한을 최소한의 인원으로 제한하고 있습니다. 그 최소한의 인원에 해당하는 자는 다음과 같습니다. 이용자를 직접 상대로 하여 마케팅 업무를 수행하는 자
                                                <br />
                                                <br />
                                                개인정보관리책임자 및 담당자 등 개인정보관리업무를 수행하는 자
                                                <br />
                                                <br />
                                                기타 불만처리 및 상담 등 업무상 개인정보의 취급이 불가피한 자
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                개인정보를 취급하는 직원을 대상으로 새로운 보안 기술 습득 및 개인정보 보호 의무 등에 관해 정기적인 사내 교육 및 외부 위탁교육을 실시하고 있습니다.
                                                <br />
                                                <br />
                                                개인정보 관련 취급자의 업무 인수인계는 보안이 유지된 상태에서 철저하게 이뤄지고 있으며 입사 및 퇴사 후 개인정보 사고에 대한 책임을 명확화하고 있습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 개인정보의 안전한 보관을 위한 보관시설을 마련하고 잠금장치 등을 설치하고 있습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)은 이용자 개인의 실수나 기본적인 인터넷의 위험성 때문에 일어나는 일들에 대해 책임을 지지 않습니다. 회원 개개인이 본인의 개인정보를 보호하기 위해서 자신의 ID 와 비밀번호를 적절하게 관리하고 여기에 대한 책임을 져야 합니다.
                                                <br />
                                                <br />
                                                그 외 내부 관리자의 실수나 기술관리 상의 사고로 인해 개인정보의 상실, 유출, 변조, 훼손이 유발될 경우 해태제과식품(주)은 즉각 귀하께 사실을 알리고 적절한 대책과 보상을 강구할 것입니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                기타 ‘개인정보보호법’, ‘정보통신망 이용 촉진 및 정보보호에 관한 법률’에 의한 기술적, 관리적 대책을 준수합니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.11(링크사이트)
                                                <br />
                                                <br />
                                                해태제과식품(주)은 귀하께 다른 회사의 웹사이트 또는 자료에 대한 링크를 제공할 수 있습니다. 이 경우 해태제과식품(주)은 외부사이트 및 자료에 대한 아무런 통제권이 없으므로 그로부터 제공받는 서비스나 자료의 유용성에 대해 책임질 수 없으며 보증할 수 없습니다.
                                                <br />
                                                <br />
                                                해태제과식품(주)이 포함하고 있는 링크를 클릭(click)하여 타 사이트(site)의 페이지로 옮겨갈 경우 해당 사이트의 개인정보취급방침은 해태제과식품(주)과 무관하므로 새로 방문한 사이트의 정책을 검토해 보시기 바랍니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.12(게시물)
                                                <br />
                                                <br />
                                                해태제과식품(주)은 귀하의 게시물을 소중하게 생각하며 변조, 훼손, 삭제되지 않도록 최선을 다하여 보호합니다. 그러나 다음의 경우는 그렇지 아니합니다. 스팸(spam)성 게시물 (예 : 행운의 편지, 8억 메일, 특정사이트 광고 등)
                                                <br />
                                                <br />
                                                타인을 비방할 목적으로 허위 사실을 유포하여 타인의 명예를 훼손하는 글
                                                <br />
                                                <br />
                                                동의 없는 타인의 신상공개 해태제과식품(주)의 저작권, 제 3자의 저작권 등 권리를 침해하는 내용, 기타 게시판 주제와 다른 내용의 게시물
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                해태제과식품(주)은 바람직한 게시판 문화를 활성화하기 위하여 동의 없는 타인의 신상 공개시 특정부분을 삭제하거나 기호 등으로 수정하여 게시할 수 있습니다. 다른 주제의 게시판으로 이동 가능한 내용일 경우 해당 게시물에 이동 경로를 밝혀 오해가 없도록 하고 있습니다.
                                                <br />
                                                <br />
                                                그 외의 경우 명시적 또는 개별적인 경고 후 삭제 조치할 수 있습니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                게시물을 작성하는 경우에는 관련 법률에 의하여 로그인 등 본인확인 절차를 마련할 수 있습니다. 근본적으로 게시물에 관련된 제반 권리와 책임은 작성자 개인에게 있습니다. 또 게시물을 통해 자발적으로 공개된 정보는 보호받기 어려우므로 정보공개 전에 심사숙고하시기 바랍니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.13(개인정보의 위탁 현황)
                                                <br />
                                                <br />
                                                해태제과식품(주)은 서비스 향상을 위해서 귀하의 개인정보가 필요한 경우 동의 등 법률상의 요건을 구비하여 외부에 수집, 취급, 관리 등을 위탁하여 처리할 수 있으며, 개인정보의 처리와 관련하여 아래와 같이 업무를 위탁하고 있으며, 관계 법령에 따라 위탁계약 시 개인정보가 안전하게 관리될 수 있도록 필요한 사항을 규정하고 있습니다. 또한 공유하는 정보는 당해 목적을 달성하기 위하여 필요한 최소한의 정보에 국한됩니다. 제공받는자
                                                <br />
                                                <br />
                                                이용 목적
                                                <br />
                                                <br />
                                                한진택배
                                                <br />
                                                <br />
                                                상품 배송, 배송정보 수집
                                                <br />
                                                <br />
                                                ※ 직송 등 일부 배송형태에 따라, 전자상거래소비자보호법 제21조에 의거 판매를 의뢰한 협력사에 배송정보가 제공 됩니다.
                                                <br />
                                                <br />
                                                당사는 회원님의 개인정보를 당사가 제공하는 서비스 외의 용도로 사용하거나 회원님의 동의 없이 제3자에게 제공하지 않습니다. 필요에 의하여 제3자에게 제공할 경우에는 고객님에게 알리고 별도의 동의를 받습니다. 다만, 다음 각호의 경우에는 예외로 합니다. 당사의 이용약관을 위배하거나 서비스를 이용하여 타인에게 피해를 주거나 미풍양속을 해치는 위법행위를 한 사람 등에게 법적인 조치를 취하기 위해 개인 정보를 공개해야 한다고 판단되는 경우
                                                <br />
                                                <br />
                                                법령의 규정에 의하거나, 수사상의 목적으로 법령에 정해진 절차와 방법에 따라 수사기관의 요구 있는 경우
                                                <br />
                                                <br />
                                                주문상품 배송시 업무상 배송업체에게 최소한의 배송 정보를 제공하거나, 서비스의 이행을 위하여 제공이 불가피한 경우
                                                <br />
                                                <br />
                                                통계 작성, 학술연구, 시장 조사, 정보 제공 및 공지 안내 메일 발송의 경우로서 특정 개인을 식별할 수 없는 형태로 제공되는 경우
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.14(이용자 주의사항)
                                                <br />
                                                <br />
                                                귀하의 개인정보를 최신의 상태로 정확하게 입력하여 불의의 사고를 예방해 주시기 바랍니다. 이용자가 입력한 부정확한 정보로 인해 발생하는 사고의 책임은 이용자 자신에게 있으며 타인정보의 도용 등 허위정보를 입력할 경우 회원자격이 상실될 수 있습니다.
                                                <br />
                                                <br />
                                                귀하는 개인정보를 보호받을 권리와 함께 스스로를 보호하고 타인의 정보를 침해하지 않을 의무도 가지고 있습니다. 비밀번호를 포함한 귀하의 개인정보가 유출되지 않도록 조심하시고 게시물을 포함한 타인의 개인정보를 훼손하지 않도록 유의해 주십시오. 만약 이같은 책임을 다하지 못하고 타인의 정보 및 존엄성을 훼손할 시에는 『정보통신망이용촉진및 정보보호등에관한법률』등에 의해 처벌받을 수 있습니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.15(의견수렴 및 불만처리)
                                                <br />
                                                <br />
                                                당사는 귀하의 의견을 소중하게 생각하며, 귀하는 의문사항으로부터 언제나 성실한 답변을 받을 권리가 있습니다.
                                                <br />
                                                <br />
                                                당사는 귀하와의 원활환 의사소통을 위해 다음과 같이 민원처리센터를 운영하고 있습니다.
                                                <br />
                                                <br />
                                                【 민원처리센터 】 전자우편 : htmall@ht.co.kr
                                                <br />
                                                (내용을 보내실 때 연락 가능한 전화, 휴대전화 번호를 적어 주시면 감사하겠습니다.)
                                                <br />
                                                <br />
                                                전화번호 : 080-235-6677
                                                <br />
                                                <br />
                                                팩스번호 : 02-790-8124
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                전화상담 시간은 평일 09:00~18:00까지 입니다. 전자우편이나 팩스 및 우편을 이용한 상담은 접수 후 평일 기준 24시간 내에 성실하게 답변 드리겠습니다.
                                                <br />
                                                <br />
                                                기타 개인정보에 관한 상담이 필요한 경우에는 개인정보침해신고센터, 대검찰청 인터넷범죄수사센터, 경찰청 사이버테러대응센터 등으로 문의하실 수 있습니다.
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                개인정보침해신고센터 전화 : 118
                                                <br />
                                                <br />
                                                URL : http://www.118.or.kr
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                대검찰청 인터넷범죄수사센터 전화 : 02-3480-3600
                                                <br />
                                                <br />
                                                URL : http://www.spo.go.kr/kor/depart/icic/main.jsp
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                경찰청 사이버테러대응센터 전화 : 02-392-0330
                                                <br />
                                                <br />
                                                URL : http://www.ctrc.go.kr
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.16(개인정보관리책임자 및 담당자)
                                                <br />
                                                <br />
                                                해태제과식품(주)은 귀하가 좋은 정보를 안전하게 이용할 수 있도록 최선을 다하고 있습니다. 개인정보를 보호하는데 있어 귀하께 고지한 사항들에 반하는 사고가 발생할 시에 개인정보관리책임자가 모든 책임을 집니다. 그러나 관리적, 기술적인 보완조치를 했음에도 불구하고, 해킹 등 기본적인 네트워크상의 위험성에 의해 발생하는 예기치 못한 사고로 인한 정보의 훼손 및 방문자가 작성한 게시물에 의한 각종 분쟁에 관해서는 책임이 없습니다.
                                                <br />
                                                <br />
                                                귀하의 개인정보를 취급하는 책임자 및 담당자는 다음과 같으며 개인정보 관련 문의사항에 신속하고 성실하게 답변해드리고 있습니다.
                                                <br />
                                                <br />
                                                <br />
                                                개인정보관리책임자 성 명 : 김용선 부장
                                                <br />
                                                <br />
                                                전자우편 : nemo1463@ht.co.kr
                                                <br />
                                                전화번호 : 080-235-6677
                                                <br />
                                                개인정보담당부서 부 서 명 : 온라인마케팅팀
                                                <br />
                                                전자우편 : shalla2s@ht.co.kr
                                                <br />
                                                전화번호 : 080-235-6677
                                                <br />
                                                팩스번호 : 02-790-8124
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                <br />
                                                1.17(고지의 의무)
                                                <br />
                                                <br />
                                                현 개인정보처리방침은 2012년 7월 25일에 제정된 내용이며 정부의 정책 또는 보안기술의 변경에 따라 내용의 추가 삭제 및 수정이 있을 시에는 최소7일 전부터 홈페이지의 ‘공지’란을 통해 고지할 것입니다.
                                            </p>
                                        </div>
                                    </div>
                                    <div className="required-check-box">
                                        <ul>
                                            <li><h4><label><input onChange={onChangeEachAgree} type="checkbox" name='agree3' id='agree3' value={'SMS 수신 동의 (선택)'} checked={이용약관체크.includes('SMS 수신 동의 (선택)')}/>SMS 수신 동의 (선택)</label></h4></li>
                                            <li><h4><label><input onChange={onChangeEachAgree} type="checkbox" name='agree4' id='agree4' value={'이메일 수신 동의 (선택)'} checked={이용약관체크.includes('이메일 수신 동의 (선택)')}/>이메일 수신 동의 (선택)</label></h4></li>
                                        </ul>
                                        <div className="agree-content">
                                            <p>
                                                할인쿠폰 및 혜택, 이벤트, 신상품 소식 등 쇼핑몰에서 제공하는 유익한 쇼핑정보를 SMS와 이메일로 받아보실 수 있습니다.
                                                <br />
                                                <br />
                                                단, 주문/거래 정보 및 주요 정책과 관련된 내용은 수신동의 여부와 관계없이 발송됩니다.
                                                <br />
                                                <br />
                                                선택 약관에 동의하지 않으셔도 회원가입은 가능하며, 회원가입 후 회원정보수정 페이지에서 언제든지 수신여부를 변경하실 수 있습니다.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="button-box">
                                <button type='submit'>회원가입</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
