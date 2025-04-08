### **🔹 (1) Docker 설치 및 실행**

sh

복사편집

`sudo apt update && sudo apt install -y docker.io sudo systemctl enable --now docker`

### **🔹 (2) Docker가 CRI 인터페이스를 제공하는지 확인**

Docker는 기본적으로 Kubernetes가 요구하는 **CRI (Container Runtime Interface)** 를 직접 제공하지 않기 때문에, 이를 지원하는 **cri-dockerd** 플러그인이 필요합니다.

sh

복사편집

`sudo apt install -y cri-dockerd sudo systemctl enable --now cri-docker`