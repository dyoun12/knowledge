---
date: 2025-02-25
tags:
  - JAVA
  - Servlet
---
# 개요

웹 애플리케이션에서 HTTP는 본래 **무상태(stateless) 프로토콜**로 설계되었기 때문에, 클라이언트와 서버 간의 요청이 독립적으로 처리된다. 하지만 로그인 상태 유지, 장바구니 정보 저장 등 **사용자 상태를 유지해야 하는 기능**이 필요해지면서, 이를 해결하기 위한 방식으로 **쿠키(Cookie)와 세션(Session)**이 등장했다. 

## 필요성
#### (1) HTTP의 무상태 특성 

- HTTP는 요청과 응답이 독립적으로 동작, 이전 요청의 정보를 기억하지 않는다. 
- 사용자가 로그인한 후에도 요청이 새롭게 발생하면 로그인 상태가 유지되지 않음. 
#### (2) 상태 유지를 위한 방법 

> 이를 해결하기 위해 클라이언트와 서버가 정보를 저장하고 관리하는 방법이 필요하며, 대표적인 방식이 **쿠키와 세션**이다.

- **쿠키(Cookie):** 클라이언트(브라우저)에 데이터를 저장하여 상태를 유지
- **세션(Session):** 서버에 데이터를 저장하고 클라이언트는 세션 ID만 보관 


# 문법

## Cookie
### 1. 생성
```java
Cookie cookie = new Cookie("key", 데이터);

cookie.setMaxAge(seconds)
```

> `setMaxAge()`를 통해서 Cookie의 유효 시간을 설정할 수 있다.

### 2. 추가
```java
response.addCookie(cookie);
```

### 3. 획득
```java
Cookie[] cookies = request.getCooies();
```

#### key 획득
```java
cookies.getName();
```

#### value 획득
```java
cookies.getValue(key);
```

#### EL tag
```jsp
${cookie.<key>.value}
```
### 4. 수정 및 삭제
```java
Cookie cookie = new Cookie("삭제할 key", null);

response.addCookie(cookie);
```

## Session

## 1. 생성
```java
HttpSession session = request.getSession();
```
## 2. 데이터 저장
```java
session.setAttribute("key", 객체타입 데이터)
```

## 3. 데이터 획득

#### Value 획득
```java
session.getAttribute("key");
```

#### EL tag
```jsp
${session.<key>}
```
## 4. 수정 및 삭제
```java
HttpSession session = request.getSession();

session.invalidate();
```


---
# 참고문헌

- 

---
# 연결문서

- 