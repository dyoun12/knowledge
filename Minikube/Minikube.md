---
date: 2025-03-28
tags:
  - Kubernetes
  - Minikube
  - Docker
---
# 개요
> Minikube는 로컬 환경에서 Kubernetes 클러스터를 실행할 수 있도록 도와주는 경량 도구이다. 개발 및 테스트 목적에서 Kubernetes의 동작을 이해하고 실험하는 데 유용하다.

## 1. 주요 특징
- 단일 노드의 클러스터 실행
- 다양한 하이퍼바이저 및 컨테이너 런타임에서 구동 가능 (Docker, VMware, VitualBox 등)
- 로컬 개발 및 학습 환경에 적합
- 다양한 애드온 기능

## 2. 시스템 구조
> Minikube는 가상머신 (VM) 또는 컨테이너 (Docker 드라이버 사용)를 이용하여 단일 노드 클러스터를 실행한다. 

### 내부 구성 요소

| 구분                    | 설명                            |
| --------------------- | ----------------------------- |
| Kubernetes API Server | 클러스터의 상태를 관리하고 명령을 처리하는 중앙 서버 |
| Controller Manager    | 클러스터의 상태를 원하는 상태로 유지하는 역할 수행  |
| Scheduler             | 적절한 노드에 파드를 배치하는 역할           |
| Kubelet               | 노드에서 실행되며, 컨테이너의 상태를 관리       |
| Kube-proxy            | 클러스터 네트워킹을 관리하고 서비스와 파드를 연결   |

### 연결
> Deployment에 속한 파드에서 제공하는 애플리케이션을 이용하기 위해서는 외부와 쿠버네티스 클러스터 내부 내트워크를 연결하는 SVC(Service)를 생성해야한다.

#### **Deployment
```yaml
apiVersion: apps/v1 
kind: Deployment 
metadata: 
	name: nginx-deployment 
spec: 
	replicas: 2 
	selector: 
		matchLabels: 
			app: nginx 
	template: 
		metadata: 
			labels: 
				app: nginx 
		spec: 
			containers: 
				- name: nginx 
				  image: nginx:latest 
				  ports: 
				- containerPort: 80  
```

**MatchLabels.app : nginx**
> deployment가 동작할 때 이름이 nginx인 템플릿을 찾아 동작을 수행함을 명시

**Replicas : 2**
> 특정 파드에 장애 발생 시 템플릿을 이용해 2개의 파드를 유지함을 보장

#### **Service**
```yaml
apiVersion: v1 
kind: Service 
metadata: 
	name: nginx-service 
spec: 
	selector: 
		app: nginx 
	ports: 
		- protocol: TCP 
		  port: 8080 
		  targetPort: 80 
		  nodePort: 30080 
```

**port : 8080**
>SVR-nginx-service 컨테이너의 포트

**targetPort : 80**
>POD-nginx 컨테이너의 포트

**nodePort : 30080**
> minikube 컨테이너의 포트

#### **Command**

**yaml 파일을 기준으로 각 요소 생성**
```bash
kubectl apply -f deployment.yaml

kubectl apply -f service.yaml
```

**nginx-service를 이용한 애플리케이션 접속**
```bash
kubectl get service
```
![](Blog/Minikube/img01.png)

```bash
curl `minikube ip`:30080
```


---
# 참고문헌

- 

---
# 연결문서

- 