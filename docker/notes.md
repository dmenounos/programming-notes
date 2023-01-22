# Detached vs Foreground

The [documentation](<https://docs.docker.com/engine/reference/run/#detached-vs-foreground>) says.

> Containers started in detached mode exit when the root process used to run the container exits.
>
> In foreground mode, docker run can attach the console to the process’s standard input, output, and standard error. It can even pretend to be a TTY (what most command line executables expect) and pass along signals.

This howoever is misleading. 

Containers in foreground mode will also exit when the root process exits. E.g.: 

	docker run --rm debian:buster echo lala 

In addition docker can also attach to the process's STDIN in detached mode. E.g.:

	docker run -d -it --rm --name test-detach debian:buster bash

So the difference is that in detached mode STDIN and STDOUT will not be attached to the current terminal - they will be detached :)

# Stateless

There are not truly stateless containers, but rather containers that are removed automatically after shutdown. This happens either:

* Explicitly, by passing the --rm option to the docker command.
* Implicitly, with the docker compose up / down commands.

They make most sense when set to run either in (1) foreground mode or (2) background mode that is also kept alive.

They do not make much sense when set to run in (3) background mode that is not kept alive.

Why? Because we likely need the possibility to interact or inspect the container. 
In cases (1) and (2) that will be with the actual terminal and the log while the container is still running.
In case (3) however the container will exit automatically, since it is not kept alive, and the "--rm" will also delete the log.

# Keep Alive

So how do we keep a container alive? The simplest way is to pass the "-it" flags and run "bash". E.g. with the debian image:

Foreground (1):

	docker run -it --rm debian:buster bash

Background (2):

	docker run -d -it --rm --name=test-keep-alive debian:buster bash

The same can be done when creating an image with a dockerfile by running "bash" - either directly or indirectly via a script file.

Either:

	--- Dockerfile ---
	CMD ["bash"]

Or:

	--- Dockerfile ---
	ENTRYPOINT ["/entrypoint.sh"]
	CMD ["bash"]

	--- entrypoint.sh ---
	#!/bin/bash
	exec "$@"
