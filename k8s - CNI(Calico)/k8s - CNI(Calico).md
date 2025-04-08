---
date: 2025-03-31
tags:
  - Kubernetes
  - Network
---
# 개요
> **CNI(Container Network Interface)**는 **컨테이너 네트워크를 설정하고 관리하는 표준 인터페이스**로 Kubernetes와 같은 컨테이너 오케스트레이션 시스템에서 컨테이너가 서로 통신할 수 있도록 네트워크를 구성하는 핵심 컴포넌트이다.

## CNI의 주요 역할
1. **컨테이너 네트워크 인터페이스 설정**
    - 컨테이너가 생성될 때 IP 주소를 할당하고 네트워크를 구성함.
2. **컨테이너 간 통신 지원**
    - Pod 간, 서비스 간 트래픽을 주고받을 수 있도록 함.
3. **네트워크 정책 적용**
    - 네트워크 격리 및 보안 정책을 설정할 수 있음.
4. **IP 주소 관리**
    - 각 컨테이너(Pod)에 고유한 IP를 할당하고 추적함.

## 동작 방식
1. 컨테이너 생성 요청 (Kubernetes, containerd 등에서 요청)
2. CNI 플러그인이 실행됨 (ex: Calico, Flannel, Cilium 등)
3. IP 주소 할당 및 라우팅 테이블 설정
4. 컨테이너 네트워크 인터페이스 설정 완료

## CNI가 없다면?
> Kubernetes에서 기본적으로 컨테이너 간 네트워크를 지원하지 않기 때문에 **CNI 플러그인**을 반드시 설정해야 한다. 단 Docker를 기반으로 CRI를 설정했다면, Docker가 기본 네트워크 기능(Bridge, Overlay)를 통해 CNI 설정을 하지 않더라도 파드 간 통신이 불가능하진 않다.

요약하자면, 멀티 노드 환경에서 Pod 간 네트워크를 연결해야 하거나 쿠버네티스의 네트워크 정책 및 Ingress 설정이 필요하다면 CNI를 추가해야 한다. 

# Calico
> Calico 는 k8s CNI를 지원하는 플러그인 중 하나로, *BGP(Border Gateway Protocol)*를 사용한 IP 기반 네트워크를 구성한다. 네트워크 정책 적용이 뛰어나고, 네이티브 라우팅을 사용하기 때문에 Overlay 네트워크가 필요하지 않다는 특징이 있다.

## 설치
```sh
kubectl apply -f https://docs.projectcalico.org/manifests/calico.yaml
```

---
# 참고문헌

- 

---
# 연결문서

- 