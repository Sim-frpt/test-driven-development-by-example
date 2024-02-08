class TestCase:
    def __init__(self, name):
        self.name = name

    def setUp(self):
        pass

    def run(self):
        result = TestResult()
        result.testStarted()

        self.setUp()

        method = getattr(self, self.name)
        method()

        self.tearDown()

        return TestResult()

    def tearDown(self):
        pass

class WasRun(TestCase):
    def __init__(self, name):
        super().__init__(name)

    def setUp(self):
        self.log = "setUp "

    def testMethod(self):
        self.log += "testMethod "

    def tearDown(self):
        self.log += "tearDown "

    def testBrokenMethod(self):
        raise Exception


class TestResult:
    def __init__(self):
        self.runCount = 0

    def testStarted(self):
        self.runCount += 1

    def summary(self):
        return "%d run, 0 failed" % self.runCount
