class Totals:
    count: int


class Result(Base):
    count: int = 0

    def add(self):
        return 3

    def total(self):
        return self.count
