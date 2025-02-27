---
date: 2025-02-27
tags:
  - JAVA
---
Overriding이란 상속관계에 있는 부모 자식 클래스가 있을 때 부모 클래스에서 정의한 메소드를 자식 클래스에서 덮어쓰는 것을 의미한다. 

객체가 생성될 때는 부모 클래스부터 상속관계의 위에서 아래로 내려가며 생성됨에 반해 메소드 호출이 일어날 경우 아래에서 위로, 자식 클래스에서 해당 이름의 Overriding된 메소드가 있는지 확인하고 없다면 부모 클래스에서 해당 메소드를 호출하게 된다.


# 예제
## `toString()`
`toString()` 메소드는 최상위 객체인 `Object`에서 정의한 메소드로 인스턴스가 위치한 메모리상의 주소값을 출력하도록 구성되어 있다.

`System.out.println()` 메소드에서는 인자 값을 콘솔 창에 문자열로 출력하는 메소드로 객체가 해당 위치에 인자로 제공될 경우 `toString()`을 작성하지 않아도 자동으로 붙어 객체의 주소 값을 출력하게 된다.

``` java
class Custom {
	private String name = "유재석";
}

public class Test {

	public static void main(String[] args) {
		Custom c = new Custom();
		System.out.println(c);
		System.out.println(c.toString());
	}

}

/* 출력
* step03.util.Custom@24d46ca6
* step03.util.Custom@24d46ca6
*/
```

이 때 `Custom` 클래스에 `toString()` 메소드를 다음과 같이 오버라이딩 해보자.

``` java
class Custom {
	private String name = "유재석";
	
	@Override
	public String toString() {
		return name;
	}
}

// ~ 생략 ~

/* 출력
* 유재석
* 유재석
*/
```

`Object` 클래스에서 정의한 `toString()`을 `Custom` 클래스에서 재정의 함으로써 자식 클래스 인스턴스에 `toString()`을 호출할 경우, 이를 자식 클래스에서 처리할 수 있음을 볼 수 있다.

---
## 메소드 인식 순서
그렇다면 오버라이딩된 메소드를 인식하는 순서는 어떻게 되는지 알아보자. 

``` java
Object c = new Custom();
System.out.println(c);				// 유재석
System.out.println(c.toString());	// 유재석
```

`Custom` 클래스 인스턴스를 `Object` 타입 변수 `c`에 할당해 업캐스팅을 시켰을 때 시스템은 변수 c에 대해서 유재석을 출력하는 것을 알 수 있다.

이는 최 상위 클래스인 `Object`에서 정의한 `toString`이 `Custom`에서 재정의 되어 출력 되었다.

비슷한 예제로 다음을 확인해보자.

``` java
public class Test2 {

	static HashMap<Object, Object> allData(){
		// 생략
	}
	
	public static void main(String[] args) {
		HashMap<Object, Object> map = allData();
		Set<Object> keys = map.keySet();
		
		System.out.println(keys); // [c1, c2, c3]
		
		for (Object val : keys) {
			System.out.println(val);
		}
	}

}
```

위와 같이 작성된 코드가 있을 때 `main`의 `map` 변수에서는 `key`와 `value`를 `Object` 타입으로 지정했다. 이 때 `key`들을 출력해보면 `Object` 객체의 `toString` 메소드가 아닌 문자열 형식으로 키 값이 출력되는 것을 알 수 있다.

정리해보자면 `allData()` 메소드는 반환 타입이 `HashMap<Object, Object>`로 설정되어 있지만 `HashMap<String, ??>` 과 같이 `key`가 `String` 타입으로 되어있을 가능성이 높다는 것을 앞선 예시들로 추측할 수 있다.

이처럼 형 변환이 이뤄져 있는 상황이라도 자식 클래스에서 재 정의된 함수를 호출하면 자식 클래스에서 우선적으로 찾아 호출하는 것을 알 수 있다.


---
# 참고문헌

- 

---
# 연결문서

- 