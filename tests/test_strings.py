from ledgerkit.utils.strings import normalise_payee, slugify, truncate


def test_normalise_payee_folds_accents_and_space():
    assert normalise_payee("Café  Nero\tLONDON") == "CAFE NERO LONDON"


def test_truncate_marks_the_cut():
    assert truncate("Groceries and household", 10) == "Groceries…"


def test_slugify():
    assert slugify("Eating Out / Takeaway") == "eating-out-takeaway"
