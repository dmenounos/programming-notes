
# Java List Iteration

Given a List reference such as:

	List<Character> l

## Index Loop

	for (int i = 0; i < l.size(); i++) {
		Character c = l.get(i);
	}

## Reverse Index Loop

	for (int i = l.size(); i > 0; i--) {
		Character c = l.get(i - 1);
	}

## Iterator Loop

	for (Iterator<Character> it = l.iterator(); it.hasNext();) {
		Character c = it.next();
	}

## Reverse Iterator Loop

	for (ListIterator<Character> it = l.listIterator(l.size()); it.hasPrevious();) {
		Character c = it.previous();
	}

## ForEach Loop

	for (Character c : l) {
		System.out.print(c)
	}
