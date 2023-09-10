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
<title>회원정보수정 액션폼</title>
</head>
<body>
	<%
		if(userDTO.getUserId()==null || userDTO.getUserPw()==null || userDTO.getUserName()==null || userDTO.getUserHp()==null || userDTO.getUserEmail()==null){
	%>			
			<script>
				alert("필수 입력사항을 입력해주세요");
				history.go(-1);
			</script>
	<%			
		}
		else{
			UserDAO userDAO = new UserDAO();
			int result = userDAO.update(userDTO);
			if(result>=1){				
	%>
				<script>
					alert("회원정보수정 완료");
					location.href="./signUp.jsp";
				</script>
	<%
			}
			else {
	%>
				<script>
					alert("회원정보수정 실패");
					history.go(-1);
				</script>
	<%
			}
			
		}
	%>
</body>
</html>