# How to hide output like [ 33%] Building C object ...

	cmake -DCMAKE_RULE_MESSAGES:BOOL=OFF

# How to show full command output

	cmake -DCMAKE_VERBOSE_MAKEFILE:BOOL=ON

# How to make make to show full command output

	make VERBOSE=1

# How to make make hide lines entering and leaving directories

	make --no-print-directory
