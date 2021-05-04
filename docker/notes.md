# Detached vs Foreground

The [documentation](<https://docs.docker.com/engine/reference/run/#detached-vs-foreground>) says.

> Containers started in detached mode exit when the root process in the containers exits.
> 
> In foreground mode, docker run can attach the console to the process’s standard input, output, and standard error. It can even pretend to be a TTY (what most command line executables expect) and pass along signals.

Also:

> -i --interactive
> Keep STDIN open even if not attached.
> 
> -t --tty
> Allocate a pseudo-tty



This howoever is misleading. 

Containers in foreground mode will also exit when the root process exits. E.g.: 

	docker run --rm debian:buster echo lala 

In addition docker can also attach to the process's STDIN in detached mode. E.g.:

	docker run -d -it --rm --name test-detach debian:buster bash

So the difference is that in detached mode STDOUT and STDIN will not be attached to the current terminal - they will be detached :)

# Stateless

Stateless containers are created using the "--rm" flag and are deleted automatically when they exit.

They make most sense either in foreground mode or in background mode that is also keep alive.

They do not make much sense in background mode that is not also keep alive.

# Keep Alive

The simplest way to make a container stay alive is to pass the "-it" flags and run "bash". E.g. with the debian image:

Foreground:

	docker run -it --rm debian:buster bash

Background:

	docker run -d -it --rm --name test-keep-alive debian:buster bash

The same can be done, when creating an custom image with a dockerfile, by running "bash" either directly or indirectly via a script file. E.g.:

Either:

	CMD ["bash"]

Or:

	# --- Dockerfile ---
	ENTRYPOINT ["/entrypoint.sh"]
	CMD ["bash"]

	# --- entrypoint.sh ---
	#!/bin/bash
	exec "$@"
