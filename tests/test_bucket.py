from ratelimit.bucket import TokenBucket


def test_takes_until_empty():
    bucket = TokenBucket(capacity=2, rate=1)
    assert bucket.take() and bucket.take()
    assert not bucket.take()
