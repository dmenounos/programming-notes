# Equals

Predicate that tests whether two objects are equal.

An equals function should abide to the following properties:

- *reflexive*  : a == a
- *symetric*   : if a == b then b == a
- *transitive* : if a == b and b == c then a == c

# HashCode

Encodes an object as a unique integer.

A hashcode function should abide to the following properties:

- If two objects are equal, then the hashCodes of the two objects must also be equal. (1) (2)
- If two objects are not equal, then it is not required the hashCodes of the two objects to also not be equal. (3) (4)
- If the hashCodes of two objects are different, then the two objects must be not equal. (2) (4)

Practically we can think hashCode() as a grouping function.

- When two objects are equal, they must be in the same group. (1) (2)
- When two objects are not equal, they could be in the same group. (3) (4)
- When two objects are not in the same group, they must be not equal. (2) (4)

| # | a == b      | hashcode(a) == hashcode(b) | correct |
| - | ----------- | -------------------------- | ------- |
| 1 | T           | T                          | Yes     |
| 2 | T           | F                          | No      |
| 3 | F           | T                          | Yes     |
| 4 | F           | F                          | Yes     |

The truth table is equivalent to the following 
[conditional statement](https://en.wikipedia.org/wiki/Material_conditional) of 
[boolean algebra](https://en.wikipedia.org/wiki/Boolean_algebra) :


```
a == b -> hashcode(a) == hashcode(b) <=>
a != b || hashcode(a) == hashcode(b)
```

## Example 1 - Object

```
int hash = 0;
hash = hashcode(a)
hash = hash ^ (hashcode(b) << 1);
...
hash = hash ^ (hashcode(n) << 1);
```

## Example 2 - Object

```
int hash = 0;
hash = 31 * hash + hashcode(a);
hash = 31 * hash + hashcode(b);
...
hash = 31 * hash + hashcode(n);
```

## Example 3 - Vector

```
int hash = 0;
for (int i = 0; i < size(v); ++i) {
    hash = 31 * hash + v[i];
}
```

The following table shows the executions for vectors of various sizes:

| # | expanded execution                        | equivalent expression                            |
| - | ----------------------------------------- | ------------------------------------------------ |
| 1 | 31 * (0) + V_0                            | 31^0 * V_0                                       |
| 2 | 31 * (V_0) + V_1                          | 31^1 * V_0 + 31^0 * V_1                          |
| 3 | 31 * (31 * V_0 + V_1) + V_2               | 31^2 * V_0 + 31^1 * V_1 + 31^0 * V_2             |
| n | 31 * (31^n-2 * V_0 + ... + V_n-2) + V_n-1 | 31^n-1 * V_0 + ... + 31^1 * V_n-2 + 31^0 * V_n-1 |

# References
- https://en.cppreference.com/w/cpp/utility/hash
- https://docs.oracle.com/javase/8/docs/api/java/lang/Object.html
- http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes/java/lang/String.java
- http://developer.classpath.org/doc/java/lang/String-source.html
- https://stackoverflow.com/questions/5889238/why-is-xor-the-default-way-to-combine-hashes
- https://stackoverflow.com/questions/3613102/why-use-a-prime-number-in-hashcode
