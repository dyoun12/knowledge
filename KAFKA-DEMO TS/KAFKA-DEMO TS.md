## 1. 업비트 웹소켓 연결 시 ssl 인증 오류 발생
![[Pasted image 20250213084210.png]]

websocket server의 인증서를 검증하지 못해 발생하는 오류.
윈도우에 설치된 인증서가 오래된 버전일경우 해당 오류가 발생할 수 있다.

인증서 업데이트
```powershell
certutil -generateSSTFromWU rootcerts.sst 

certutil -addstore -f root rootcerts.sst
```