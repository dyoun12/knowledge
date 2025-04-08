---
date: 2025-04-01
tags:
  - Kubernetes
---
# 개요
> **Helm**은 **Kubernetes 패키지 매니저**로, Kubernetes 애플리케이션을 보다 쉽게 **설치, 관리, 배포, 업그레이드**할 수 있도록 도와준다. Kubernetes에서 여러 리소스(Deployment, Service, ConfigMap, Secret 등)를 관리할 때, 개별적인 YAML 파일을 작성하고 `kubectl apply`로 배포해야 하는데, 이 과정이 복잡하고 반복적일 수 있다. **Helm**은 이를 해결하기 위해 **Chart**라는 패키징 시스템을 제공하여, Kubernetes 애플리케이션을 한 번에 관리할 수 있는 기능을 제공한다.

## 용어 정리
| 용어          | 설명                                                                                      |
| ----------- | --------------------------------------------------------------------------------------- |
| Chart       | Kubernetes 애플리케이션을 정의한 패키지 (YAML + 템플릿)                                                 |
| Release     | Chart를 기반으로 배포된 애플리케이션 인스턴스                                                             |
| Repository  | Helm Chart를 저장하는 공간 (예: [https://charts.helm.sh/stable](https://charts.helm.sh/stable)) |
| Values.yaml | 설정값을 정의하는 파일 (변경 가능)                                                                    |

# 사용 방법
## Helm 설치
```sh
# Helm 설치
curl -fsSL https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash

# Bitnami의 Helm Chart 저장소 추가 
helm repo add bitnami https://charts.bitnami.com/bitnami

# 변경사항 적용
helm repo update
```

## chart 생성
```sh
# 배포 관리를 위한 chart 생성
helm create mychart

# 생성된 mychart 구조 확인
tree mychart
```

![asdf](Blog/k8s%20-%20Helm/img01.png)

> `values.yaml` 파일을 통해 k8s 리소스를 정의하고, 추후 `helm install` 명령어를 통해 정의된 리소스를 생성 및 관리할 수 있다.

## `values.yaml` 수정
```yaml
replicaCount : 3
image.tag : latest
service.type : NodePort
```

## Helm Release 적용
```sh
helm install my-nginx ./mychart
```
![](Blog/k8s%20-%20Helm/img02.png)

> Helm Release에 변경사항이 있을 시 `upgrade` 명령어로 대체한다.

```sh
helm upgrade < release-name > ./mychart
```

## Helm Release 확인
```sh
helm list
```
![](Blog/k8s%20-%20Helm/img03.png)

```sh
kubectl get po -o wide
```
![](Blog/k8s%20-%20Helm/img04.png)

## Helm Release 삭제
```sh
helm uninstall <mychart-name>
```

---
# 참고문헌

- [helm-quickstart](https://helm.sh/docs/intro/quickstart/)

---
# 연결문서

- 