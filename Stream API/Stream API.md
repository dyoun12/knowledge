---
tags:
  - JAVA
---
# 개요
Stream API는 java 내의 컬렉션 데이터를 보다 효율적으로 처리할 수 있도록 만들어진 패키지이다. 반복문이나 데이터 처리과정을 간결하게 표현할 수 있어서 가독성을 향상시킬 수 있고 병렬처리를 지원하여 대용량 데이터 처리에 적합한 API이다.

Stream API의 특징은 다음과 같이 정리할 수 있다.
> 1. Lazy Evaluation (지연 연산)
	- 중간 연산은 실제로 종결 연산이 호출될 때까지 실행되지 않는다.
> 1. Immutable (불변성)
	- 원본 데이터를 변경하지 않고 새로운 스트림을 생성하여 처리한다.
> 1. 재사용되지 않음
> 2. 작은 데이터에선 비효율적
	- 데이터가 적을 경우 단순 반복문보다 비효율적일 수 있다.
    
# 문법

## 스트림 객체 생성
### 배열 -> Stream
```java
Arrays.stream({new Object(), new Object() ...})
```
배열에서 스트림 객체로 변환할 수 있도록 ``java.util.Arrays`` 패키지에서 배열을 인자로 받는 스태틱 메소드 ``stream()``이 정의되어 있다.

아래는 배열을 스트림으로 변환하는 예제이다.

```java
String[] stringArr = {"a1", "b1", "c1" };
Stream<String> StringArrStream = Arrays.stream(stringArr);
```

```java
People[] objectArr = {new People("p1", 20), new People("p2", 30), new People("p3", 40)};
Stream<People> objectArrStream = Arrays.stream(objectArr);
```

```java
int[] intArr = {1, 2, 3};
IntStream intArrStream = Arrays.stream(intArr);
```

```java
double[] doubleArr = {0.1d, 0.2d, 0.3d};
DoubleStream doubleArrStream = Arrays.stream(doubleArr);
```

```java
long[] longArr = {11, 22, 33};
LongStream longArrStream = Arrays.stream(longArr);
```

여기서 객체 타입인 ``String``, ``People``을 요소로 하는 배열은 ``Stream<T>`` 를, 기본 타입인 ``int``, ``double``, ``long``을 요소로 하는 배열은 각각 ``IntStream``, ``DoubleStream``, ``LongStream``으로 반환됨을 확인할 수 있다.

### Collection -> Stream
일반적으로 ``Collection`` 타입의 객체에서 Stream 타입 객체로 변환할 수 있는 ``.stream()``을 제공한다. 또 다른 방법으로 ``StreamSupport.stream()``도 활용해 볼 수 있으니 참고 하자. 
``` java
Collection<Object> collection = new ArrayList<>();
		
Stream<Object> collectionStream1 = collection.stream();
		
Stream<Object> collectionStream2 = StreamSupport.stream(collection.spliterator(), false);
```

### Stream.builder()
요소를 추가할 수 있는 ``builder``를 호출하여 즉석에서 Stream 객체를 생성하는 것도 가능하다.
``` java
Stream<Object> builderStream = Stream.builder()
										.add(new Object())
										.add(new Object())
										.build();
```

## Stream API 활용 방법
``` java
CollectionInstance.stream()
                  .중간연산메소드()
                  .중간연산메소드()
                  ...
                  .종결연산메소드();
```
``Stream`` 객체는 종결 연산 메소드를 호출하기 전까지 중간 연산 메소드를 이용하여 요소들을 변환하거나, 정렬, 필터와 같은 작업을 수행할 수 있다. 마지막에 종결 연산 메소드를 사용하면 중간 연산된 요소들을 이용하여 합을 구하거나, 일치하는 요소를 찾는 등 다량의 데이터 처리를 반복문 없이 수행할 수 있다.
## 자주 사용하는 메소드
### 중간 연산 메소드
| <center>Method</center> | <center>설명</center> | <center>예시</center> |
|:-:|:-|:-|
| ``filter()`` | 조건에 맞는 데이터만 필터링 | ``stream.filter(x -> x > 10)`` |
| ``map()`` | 데이터를 다른 형식으로 변환 | ``stream.map(x -> x * 2)``|
| ``flatMap()`` | 중첩된 데이터를 평면화(flatten)하여 스트림으로 변환 | ``stream.flatMap(Collection::stream)`` |
| ``sorted()`` | 데이터를 정렬 (기본 정렬 또는 Comparator 지정 가능) | ``stream.sorted()`` or ``stream.sorted(Comparator.comparing(String::length))`` |
| ``distinct()`` | 중복 제거 | ``stream.distinct()`` |
| ``limit()`` | 최대 파라미터만큼의 데이터를 제한 | ``stream.limit(5)`` |
| ``skip()`` | 처음 n개의 데이터를 건너뜀 | ``stream.skip(2)`` |

중간 연산 메소드의 경우 종결 연산 이전이므로 중간 연산을 적용한 ``Stream`` 타입의 객체를 반환한다.

### 종결 연산 메소드

| <center>Method</center> | <center>설명</center> | <center>예시</center> |
|:-:|:-|:-|
| ``forEach()`` | 스트림의 각 요소에 대해 동작 수행 | ``stream.forEach(System.out::println)`` |
| ``collect()`` | 스트림 데이터를 컬렉션 또는 특정 형식으로 변환 | ``stream.collect(Collectors.toList())`` |
| ``count()`` | 스트림 내 요소의 개수를 반환 | ``long count = stream.count()`` |
| ``findFirst()`` or ``findAny()`` | 첫 번째 요소 혹은 임의의 반환 | ``Optional<T> e = stream.findFirst()`` |
| ``allMatch()`` | 모든 요소가 조건에 만족하는지 확인 | ``stream.allMatch(x -> x > 10)`` |
| ``anyMatch()`` | 하나 이상의 요소가 조건에 만족하는지 확인 | ``stream.anyMatch(x -> x > 10)`` |
| ``noneMatch()`` | 모든 요소가 조건에 만족하는지 않는지 확인 | ``stream.noneMatch(x -> x > 10)`` |
| ``reduce()`` | 스트림 데이터를 하나로 합침(집계) | ``int sum = stream.reduce(0, Integer::sum)`` |

---
# 참고문헌
- https://docs.oracle.com/javase/8/docs/api/java/util/stream/Stream.html
