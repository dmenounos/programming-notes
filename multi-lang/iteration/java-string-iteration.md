
# Java String Iteration

Given a String reference such as:

	String s

## Index Loop

	for (int i = 0; i < s.length(); i++) {
		char c = s.charAt(i);
	}

## Reverse Index Loop

	for (int i = s.length(); i > 0; i--) {
		char c = s.charAt(i - 1);
	}

## Iterator Loop

	CharacterIterator it = new StringCharacterIterator(s);
	boolean done = it.current() == CharacterIterator.DONE;

	for (it.first(); !done; done = it.next() == CharacterIterator.DONE) {
		char c = it.current();
	}

## Reverse Iterator Loop

	CharacterIterator it = new StringCharacterIterator(s);
	boolean done = it.current() == CharacterIterator.DONE;

	for (it.last(); !done; done = it.previous() == CharacterIterator.DONE) {
		char c = it.current();
	}

## ForEach Loop

	s.chars().forEach(i -> System.out.print((char) i));
