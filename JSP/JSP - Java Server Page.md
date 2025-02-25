---
date: 2025-02-25
tags:
  - JAVA
  - JSP
  - Servlet
---
# 개요

## 1. JSP란?
JSP(Java Server Pages)는 **Java 기반의 서버 측 웹 프로그래밍 기술**로, HTML 내에서 Java 코드를 실행할 수 있도록 설계되었다.  **동적 웹 페이지 생성**을 위해 사용되며, 클라이언트 요청에 따라 **서버에서 HTML을 생성**하여 응답한다.  

> Java의 강력한 기능을 활용하면서도 HTML과 함께 쉽게 작성할 수 있어 **Servlet보다 코드가 간결**하다.  

## 2. JSP의 필요성  
Servlet은 Java 코드 내에서 HTML을 출력하는 방식으로 작성되므로, 코드가 복잡하고 유지보수가 어려운 것을 확인할 수 있다.
#### 예제 (Servlet에서 HTML 출력)
```java
PrintWriter out = response.getWriter();
out.println("<html><body>");
out.println("<h1>Hello, Servlet!</h1>");
out.println("</body></html>");
```

#### 예제 (JSP에서 HTML 출력)
```html
<html>
<body>
    <h1>Hello, JSP!</h1>
</body>
</html>
```

## 3. 특징
JSP는 기본적으로 html 혹은 yml과 같이 자체 태그를 이용해 개발이 가능하며 자동적으로 **Servlet으로 변환**되어 실행된다.
1. 클라이언트가 JSP 파일 요청
2. JSP 엔진이 JSP 파일을 Servlet(Java) 코드로 변환
3. Servlet으로 컴파일 후 실행
4. HTML 응답을 생성하여 클라이언트에 전달

> 즉, JSP는 **최초 실행 시 Servlet으로 변환**되며, 이후에는 컴파일된 Servlet이 실행된다.

### 내장 객체

| 내장 객체 변수 명    | 설명                                          |
| ------------- | ------------------------------------------- |
| `request`     | 클라이언트 요청 정보를 담고 있는 객체, `HttpServletRequest` |
| `response`    | 서버 응답을 처리하는 객체, `HttpServletResponse`       |
| `session`     | 클라이언트 별 세션을 관리하는 객체, `HttpSession`          |
| `application` | 애플리케이션 전역 데이터를 저장하는 객체, `ServletContext`    |
| `out`         | HTML 출력 스트림, `JspWriter`                    |
| `config`      | 서블릿 설정 정보를 담고 있는 객체, `ServletConfig`        |
| `pageContext` | 페이지 관련 정보를 제공하는 객체, `PageContext`           |
| `page`        | 현재 JSP 페이지 자체를 가리키는 객체                      |
| `exception`   | 예외 정보를 담고 있는 객체 (에러 페이지에서 사용)               |
> 기본적으로 `servlet API`는 자동 `import`하기 때문에. 내장 객체를 사용할 수 있다.



# 문법

## 1. JSP 디렉티브 (Directives)
> JSP 페이지의 설정을 정의하는 요소로, `<%@ %>` 문법을 사용한다.

#### `page` 디렉티브
> 현재 JSP 페이지의 설정을 정의한다.

```jsp
<%@ page language="java" contentType="text/html; charset=UTF-8" %>
```

#### `include` 디렉티브
> 다른 JSP 파일을 포함한다.

```jsp
<%@ include file="header.jsp" %>
```

#### `taglib` 디렉티브
> JSTL(JavaServer Pages Standard Tag Library)을 사용할 때 선언.

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
```



## 2. JSP 액션 태그 (Action Tags)
> JSP에서 자주 사용하는 기능을 태그 형식으로 제공한다.

#### `jsp:include` (JSP 페이지 포함)
> 다른 JSP 파일을 포함할 때 사용.

```jsp
<jsp:include page="header.jsp" />
```

#### `jsp:forward` (페이지 이동)
> 다른 JSP 페이지로 요청을 전달.

```jsp
`<jsp:forward page="next.jsp" />`
```

#### `jsp:param` (파라미터 전달)
> `jsp:include` 또는 `jsp:forward`와 함께 사용하여 값을 전달.

```jsp
<jsp:forward page="next.jsp">     
	<jsp:param name="user" value="John" />
</jsp:forward>
```



## 3. 스크립트 요소 (Script Elements)
> JSP에서 Java 코드를 삽입할 때 사용하는 문법이다.
#### 선언문 (`<%! %>`)
> 멤버 변수 및 메서드를 선언하는 영역.

```jsp
<%! int count = 0; %> 
<%! public int getCount() { return count++; } %>
```

#### 스크립트릿 (`<% %>`)
> JSP 페이지 내에서 Java 코드를 실행하는 영역.

```jsp
<%     
	String name = "JSP";     
	out.println("Hello, " + name); 
%>
```

#### 표현식 (`<%= %>`)
> Java 변수를 출력하는 영역 (자동으로 `out.print()`가 적용됨).

```jsp
<p>현재 카운트: <%= getCount() %></p>
```



## 4. EL (Expression Language)
> EL (Expression Language)은 **JSP에서 Java 코드를 최소화하고 데이터를 쉽게 출력할 수 있도록 하는 표현식 언어**이다. - **`${}` 문법을 사용**하여 요청(request), 세션(session), 애플리케이션(application) 범위의 데이터를 간단하게 출력할 수 있다. - **JSP에서 Java 코드 사용을 줄이기 위해 적극 권장**됨.

#### EL 표현식

| 표현식                       | 설명                                               |
| ------------------------- | ------------------------------------------------ |
| `${requestScope.name}`    | `request.setAttribute("name", 값)`으로 저장된 값 출력     |
| `${sessionScope.name}`    | `session.setAttribute("name", 값)`으로 저장된 값 출력     |
| `${appicationScope.name}` | `application.setAttribute("name", 값)`으로 저장된 값 출력 |

#### 연산자 사용
- **산술 연산**: `${10 + 5}` → `15`
- **비교 연산**: `${10 > 5}` → `true`
- **논리 연산**: `${true && false}` → `false`



## 5. JSTL (JavaServer Pages Standard Tag Library)
> JSTL은 **JSP에서 Java 코드를 최소화하고, 태그 기반으로 반복문, 조건문 등을 쉽게 사용할 수 있도록 제공하는 표준 라이브러리**이다.

- 기존의 **스크립트릿(`<% %>`)을 대체**하여 유지보수성을 높인다.
- **JSP 표준 태그(JSP Action Tags)와 다르며, 업계에서 표준으로 사용**된다.
- JSTL을 사용하기 위해서는 **라이브러리 추가 후 태그를 선언하여 사용해야 한다.**

#### JSTL 라이브러리 추가 (Tomcat 10.x)
> Maven 사용 시 `pom.xml`에 추가할 내용은 다음과 같다.

``` yml
<!-- https://mvnrepository.com/artifact/jakarta.servlet.jsp.jstl/jakarta.servlet.jsp.jstl-api -->
<dependency>
	<groupId>jakarta.servlet.jsp.jstl</groupId>
	<artifactId>jakarta.servlet.jsp.jstl-api</artifactId>
	<version>2.0.0</version>
</dependency>


<dependency>
	<groupId>org.glassfish.web</groupId>
	<artifactId>jakarta.servlet.jsp.jstl</artifactId>
	<version>2.0.0</version>
</dependency>
```

#### JSTL 태그 선언

```jsp
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
```

#### JSTL 표현식
##### `c:if` (조건문)

```jsp
<c:if test="${param.age >= 18}">
    <p>성인입니다.</p>
</c:if>
```

#### `c:if`와 `empty` 활용
> `null`이거나 빈 값인지 확인

```jsp
<c:if test="${empty param.username}">
    <p>이름을 입력하세요.</p>
</c:if>
```

#### `c:choose`, `c:when`, `c:otherwise` (다중 조건문)

```jsp
<c:choose>
    <c:when test="${param.score >= 90}">
        <p>A 학점</p>
    </c:when>
    <c:when test="${param.score >= 80}">
        <p>B 학점</p>
    </c:when>
    <c:otherwise>
        <p>재수강</p>
    </c:otherwise>
</c:choose>
```

#### `c:forEach` (반복문)

```jsp
<c:forEach var="num" begin="1" end="5">
    <p>${num}</p>
</c:forEach>
```

#### `c:forEach` (List 반복)

```jsp
<%@ page import="java.util.*" %>
<%
    List<String> fruits = Arrays.asList("Apple", "Banana", "Cherry");
    request.setAttribute("fruits", fruits);
%>


<c:forEach var="fruit" items="${fruits}">
    <p>${fruit}</p>
</c:forEach>
```

#### `c:set` (변수 설정)

```jsp
<c:set var="username" value="John Doe" />
<p>이름: ${username}</p>
```

#### `c:remove` (변수 제거)

```jsp
<c:remove var="username" />
```

#### `c:out` (값 출력)

```jsp
<c:out value="${param.name}" default="이름 없음" />
```

---
# 참고문헌

- 

---
# 연결문서

- 