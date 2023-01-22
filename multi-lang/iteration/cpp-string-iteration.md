
# C++ String Iteration

Given a string reference such as:

	const std::string& s

## Index Loop

	for (std::size_t i = 0; i < s.size(); i++) {
		const char& c = s[i];
	}

## Reverse Index Loop

	for (std::size_t i = s.size(); i > 0; i--) {
		const char& c = s[i - 1];
	}

## Iterator Loop

	for (auto i = std::begin(s); i != std::end(s); ++i) {
		std::cout << *i;
	}

## Reverse Iterator Loop

	for (auto i = std::rbegin(s); i != std::rend(s); ++i) {
		std::cout << *i;
	}

## ForEach Loop

	for (const auto& c : s) {
		std::cout << c;
	}
