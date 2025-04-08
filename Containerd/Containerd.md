---
date: 2025-03-31
tags:
  - Kubernetes
  - Containerd
---
# 개요

## **Containerd란?**
> `containerd`는 **컨테이너 실행을 위한 경량 런타임(Runtime)** 으로, Docker나 Kubernetes와 같은 컨테이너 오케스트레이션 도구에서 컨테이너를 관리하는 데 사용된다. 처음에는 Docker의 내부 컴포넌트로 개발되었지만, 현재는 독립적인 오픈소스 프로젝트로 운영되며, CNCF(Cloud Native Computing Foundation)의 지원을 받고 있다.

## **주요 기능**
1. **컨테이너 수명 주기 관리**
    - 컨테이너 **생성(Create)**, **시작(Start)**, **중지(Stop)**, **삭제(Delete)** 기능 제공.
    - 컨테이너의 실행 상태를 모니터링하고 로그를 수집.

2. **이미지 관리**
    - 컨테이너 이미지를 **풀(Pull)**, **푸시(Push)**, **저장(Save)**, **로드(Load)** 가능.
    - 다양한 컨테이너 이미지 포맷(예: OCI, Docker)을 지원.

3. **Namespace 기반 격리**
    - 여러 컨테이너를 그룹화하여 서로 격리된 환경을 제공.
    - 멀티테넌트 환경에서 유용하게 사용됨.

4. **플러그인 기반 아키텍처**
    - 네트워크, 스토리지, 리소스 제어 등의 기능을 플러그인 형태로 확장 가능.

5. **CRI (Container Runtime Interface) 지원**
    - Kubernetes에서 컨테이너 런타임으로 사용될 수 있도록 CRI를 지원.
    - `kubelet`과 통신하여 컨테이너를 실행 및 관리.

## **Containerd vs Docker**

| 구분  | **containerd**          | **Docker**                  |
| --- | ----------------------- | --------------------------- |
| 목적  | 컨테이너 런타임                | 컨테이너 관리 도구 (CLI 및 API 포함)   |
| 구성  | 경량, 단순한 컨테이너 실행기        | `containerd` + 추가 기능        |
| 기능  | 컨테이너 실행, 이미지 관리         | 컨테이너 실행, 네트워크, 빌드, CLI 등 제공 |
| 사용처 | Kubernetes의 기본 컨테이너 런타임 | 개발 및 운영 환경에서 널리 사용          |

> Docker는 컨테이너 실행을 위해 내부적으로 `containerd`를 사용하지만, `containerd` 자체는 독립적인 런타임으로 Kubernetes 등에서 사용된다.

# 설치 방법

| OS     | Version |
| ------ | ------- |
| Ubuntu | 24.04.2 |

## Containerd 패키지 설치
```sh
sudo apt update
sudo apt install -y containerd
```

## Containerd 설정
```sh
# Containerd 설정 파일을 저장할 폴더 생성
sudo mkdir -p /etc/containerd 

# 기본 설정 파일 내용을 config.toml 파일에 저장
sudo containerd config default | sudo tee /etc/containerd/config.toml > /dev/null
```

```toml
# ** k8s 구성 시 필수 적용 **
# config.toml
SystemdCgroup = true
```
> 중요 : 
> Containerd를 Kubernetes 환경에서 구동할 예정이라면 위와 같이 설정 값을 변경해야 한다. `SystemCgroup`은 컨테이너의 **Cgroup(컨트롤 그룹) 관리 방식**을 설정하는 옵션이다. Kubernetes에서 `containerd`를 사용할 경우, Cgroup을 **Systemd 방식**으로 관리하는 것이 안정적이므로 `true`로 변경해야 한다.
    
- 만약 해당 옵션이 `false`로 설정되어 있으면 `kubelet` 실행 시 `cgroup driver mismatch` 오류가 발생할 수 있으니 주의하자.

## **설정 변경 사항 적용**
```sh
sudo systemctl restart containerd

sudo systemctl status containerd
```

# **기본적인 사용법**

### **1. Containerd 상태 확인**

```sh
sudo systemctl status containerd
```
> `active (running)` 상태여야 정상적으로 실행 중.

### **2. Containerd CLI(`ctr`)를 사용한 컨테이너 실행**

```sh
sudo ctr image pull docker.io/library/nginx:latest
sudo ctr run --rm -t docker.io/library/nginx:latest nginx-container
```
> `nginx-container`라는 이름으로 컨테이너 실행.

### **3. 실행 중인 컨테이너 목록 확인**

```sh
sudo ctr containers list
```

# 참고문헌

- 

---
# 연결문서

- 