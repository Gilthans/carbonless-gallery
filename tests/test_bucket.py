from ratelimit.bucket import TokenBucket


def test_takes_until_empty():
    bucket = TokenBucket(capacity=2, rate=1)
    assert bucket.take() and bucket.take()
    assert not bucket.take()


def test_refuses_more_than_capacity():
    bucket = TokenBucket(capacity=2, rate=1)
    try:
        bucket.take(3)
    except ValueError:
        pass
    else:
        raise AssertionError("expected ValueError")
