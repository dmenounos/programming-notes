
# C++ Vector Iteration

Given a vector reference such as:

	const std::vector<char>& v

## Index Loop

	for (std::size_t i = 0; i < v.size(); i++) {
		const char& c = v[i];
	}

## Reverse Index Loop

	for (std::size_t i = v.size(); i > 0; i--) {
		const char& c = v[i - 1];
	}

## Iterator Loop

	for (auto i = std::begin(v); i != std::end(v); ++i) {
		std::cout << *i;
	}

## Reverse Iterator Loop

	for (auto i = std::rbegin(v); i != std::rend(v); ++i) {
		std::cout << *i;
	}

## ForEach Loop

	for (const auto& c : v) {
		std::cout << c;
	}
