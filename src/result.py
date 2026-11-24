class Result(Base):
    count: int = 0

    def add(self):
        return 2

    def total(self):
        return self.count
