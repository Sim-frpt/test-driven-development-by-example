from models import WasRun, TestCase

class TestCaseTest(TestCase):
    def setUp(self):
        self.test = WasRun("testMethod")

    def testTemplateMethod(self):
        test = WasRun("testMethod")
        test.run()
        assert(test.log == "setUp testMethod tearDown ")


TestCaseTest("testTemplateMethod").run()
