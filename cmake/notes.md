# ${CMAKE_PROJECT_NAME} vs ${PROJECT_NAME}

In the context of an aggregated module file, like in the following directive:

*add_subdirectory(module)*

- CMAKE_PROJECT_NAME refers to the project name set in the root "CMakeLists.txt".
- PROJECT_NAME       refers to the project name set regardless which "CMakeLists.txt".

** Practically we can use both: **

When executing cmake from the root directory:

- CMAKE_PROJECT_NAME will refer to the outer or global project name.
- PROJECT_NAME       will refer to the inner or module project name.

When executing cmake from a module directory, both variables will refer to the same module project name.

# ${CMAKE_CURRENT_SOURCE_DIR} vs ${CMAKE_CURRENT_LIST_DIR}

In the context of an aggregated module file, like in the following directive:

*add_subdirectory(module)*

- Both variables refer to the same module directory.

In the context of an included utility file, like in the following directive:

*include(sub/CMakeLists.txt)*

- CMAKE_CURRENT_SOURCE_DIR refers to the outer directory.
- CMAKE_CURRENT_LIST_DIR   refers to the directory of the included file.

** Practically: **

As the former scenario is the more common CMAKE_CURRENT_SOURCE_DIR is used the most offen as a variable to locate resource files relative to the directory of the module in line and in conjuction also with CMAKE_CURRENT_BINARY_DIR.

In the later scenario CMAKE_CURRENT_LIST_DIR comes in handy when we need to locate resource files relative to the directory of an included "CMakeLists.txt".

# Default Compile Flags

|                         |   |              |
| ----------------------- | - | ------------ |
| CMAKE_CXX_FLAGS         | : |              |
| CMAKE_CXX_FLAGS_DEBUG   | : | -g           |
| CMAKE_CXX_FLAGS_RELEASE | : | -O3 -DNDEBUG |
