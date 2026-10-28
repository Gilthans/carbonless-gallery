from shortener.codes import ALPHABET, is_valid, new_code


def test_new_code_uses_the_alphabet():
    code = new_code()
    assert len(code) == 7 and all(ch in ALPHABET for ch in code)


def test_ambiguous_characters_are_invalid():
    assert not is_valid("abc0def")
