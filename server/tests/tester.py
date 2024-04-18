import unittest
import login
import spendingRecord
import updateBudget

if __name__ == '__main__':
    runner = unittest.TextTestRunner()
    loader = unittest.TestLoader()
    suite = unittest.TestSuite()
    # suite = unittest.TestSuite()
    suite.addTest(loader.loadTestsFromTestCase(login.TestLogin))
    suite.addTest(loader.loadTestsFromTestCase(spendingRecord.TestSpendingRecord))
    suite.addTest(loader.loadTestsFromTestCase(updateBudget.TestUpdateBudget))
    
    
    runner.run(suite)