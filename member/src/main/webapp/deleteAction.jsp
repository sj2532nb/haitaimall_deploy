<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import = "member.UserDAO" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:useBean id="userDTO" class="member.UserDTO" scope="page"/>
<jsp:setProperty name="userDTO" property="userId"/>
<jsp:setProperty name="userDTO" property="userPw"/>
<jsp:setProperty name="userDTO" property="userName"/>
<jsp:setProperty name="userDTO" property="userHp"/>
<jsp:setProperty name="userDTO" property="userEmail"/>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원탈퇴 액션폼</title>
</head>
<body>
<%
	if( userDTO.getUserId()==null || userDTO.getUserPw()==null ){
%>
	<script>
		alert("아이디, 비밀번호를 입력해주세요");
		history.go(-1);
	</script>
<%
	}
	else{
		UserDAO userDAO = new UserDAO();
		int result = userDAO.delete(userDTO.getUserId(), userDTO.getUserPw());
		
		if(result>=1){
			session.invalidate();
%>			
			<script>
				alert("회원탈퇴 완료");
				location.href="./signUp.jsp";
			</script>			
<%			
		}
		else {
%>		
		<script>				
			alert("회원탈퇴 실패");
			history.go(-1);
		</script>
<%			
		}
	}
%>
</body>
</html>