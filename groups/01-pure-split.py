import time


def load(
    path,
    retries=3,
    timeout=30
):
    return fetch(path, retries, timeout)


def save(path, data):
    write(path, data)
