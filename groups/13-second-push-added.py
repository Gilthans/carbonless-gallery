def save(path, data):
    write(path, data)


def drop(
    path,
    force=False,
    quiet=True,
):
    remove(path, force, quiet)
