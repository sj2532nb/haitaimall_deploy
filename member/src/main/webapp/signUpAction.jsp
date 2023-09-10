<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
    
<%@ page import = "member.UserDAO" %>
<% request.setCharacterEncoding("UTF-8"); %>

<jsp:useBean id="UserDTO" class="member.UserDTO" scope="page"/>
<jsp:setProperty name="UserDTO" property="userId"/>
<jsp:setProperty name="UserDTO" property="userPw"/>
<jsp:setProperty name="UserDTO" property="userName"/>
<jsp:setProperty name="UserDTO" property="userHp"/>
<jsp:setProperty name="UserDTO" property="userEmail"/>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>회원가입 액션폼</title>
</head>
<body>
	<%
		if(UserDTO.getUserId()==null || UserDTO.getUserPw()==null || UserDTO.getUserName()==null || UserDTO.getUserHp()==null || UserDTO.getUserEmail()==null){
	%>			
			<script>
				alert("필수 입력사항을 입력해주세요");
				history.go(-1);
			</script>
	<%			
		}
		else{
			UserDAO userDAO = new UserDAO();
			int result = userDAO.signup(UserDTO);
			if(result==-1){				
	%>
				<script>
					alert("이미 존재하는 아이디 입니다.");
					history.go(-1);
				</script>
	<%
			}
			else {
	%>
				<script>
					alert("회원가입 성공");
					location.href="./signIn.jsp";
				</script>
	<%	
			}
			
		}
	%>
</body>
</html>