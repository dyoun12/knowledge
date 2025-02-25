---
date: 2025-02-25
tags:
  - Javascript
  - AJAX
---
# 1. AJAX란?
> AJAX(Asynchronous JavaScript And XML)는 **페이지 새로고침 없이 서버와 데이터를 교환하는 기술**이다.
- **비동기(Asynchronous)** 방식으로 클라이언트(브라우저)와 서버가 통신함.
- HTML, CSS, JavaScript, `XMLHttpRequest` 객체를 사용하여 구현.
- XML뿐만 아니라 JSON, plain text 등 **다양한 데이터 형식** 지원.
- **데이터를 동적으로 가져와 화면을 갱신**하는 데 유용.

# 2. AJAX의 필요성
1. **빠른 사용자 경험(UX) 제공**
    - 전체 페이지를 다시 로드하지 않고 필요한 데이터만 갱신할 수 있음.
2. **서버 부하 감소**
    - 필요한 데이터만 요청하므로 네트워크 트래픽 감소.
3. **싱글 페이지 애플리케이션(SPA) 구현에 필수적**
    - React, Vue.js, Angular 등과 함께 많이 사용됨.

# 3. AJAX 핵심 개념

## XMLHttpRequest 객체
> 비동기로 요청을 보내는 객체로 요청과 응답 처리를 수행하는 단일 객체이다.

## 변수 및 메소드

| name                                             | 설명                                                                                                                                                        |
| ------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `readyState`                                     | `readyState` = 0 : 요청 전<br>`readyState` = 1 : 요청 시작<br>`readyState` = 2 : 응답 `header` 도착<br>`readyState` = 3 : 응답 `body` 수신 중<br>`readyState` = 4 : 응답 완료 |
| `status`                                         | HTTP 상태 코드 (200: 성공, 404: 실패 등)                                                                                                                           |
| `responseText` \| `responseHTML`\| `responseXML` | 서버에서 응답한 데이터 (text, html, yml 형식)                                                                                                                         |
| `onreadystatechange`                             | 요청 상태가 변경될 때마다 실행되는 콜백 함수를 지정하는 변수                                                                                                                        |
| `open(method, url, async)`                       | `method`: `GET` 또는 `POST` 방식 지정<br>`url`: 요청을 보낼 서버의 URL<br>`async`: `true`(비동기), `false`(동기)                                                             |
| `send()`                                         | 서버에 요청을 전송하는 메서드로 `POST` 요청 시 `send(데이터)` 형태로 전송                                                                                                          |

# 예제
```javascript
const xhttp = new XMLHttpRequest();

// 요청 상태 변화 감지
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log("응답 데이터: ", this.responseText);
    }
};

// 요청 설정 (GET 방식, 서버 URL, 비동기 여부)
xhttp.open("GET", "https://jsonplaceholder.typicode.com/todos/1", true);
xhttp.send(); // 서버 요청 전송
```


---
# 참고문헌

- 

---
# 연결문서

- 