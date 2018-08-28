package testSTUFF2;

import org.junit.After;
import org.junit.AfterClass;
import org.junit.Before;
import org.junit.BeforeClass;
import org.junit.Test;
import testSTUFF2.BabysitterCalc;
import junit.framework.TestCase;

public class BabysitterCalcTest extends TestCase {

	@BeforeClass
	public static void setUpBeforeClass() throws Exception {
	}

	@AfterClass
	public static void tearDownAfterClass() throws Exception {
	}

	@Before
	protected void setUp() throws Exception {
		super.setUp();
	}

	@After
	protected void tearDown() throws Exception {
		super.tearDown();
	}

	@Test
	public static void testSixToEight() throws Exception {
		assertEquals(testSTUFF2.BabysitterCalc.calculate(6, 8), 24); 
	}
	
	public static void testSixtoSeven() throws Exception {
		assertEquals(testSTUFF2.BabysitterCalc.calculate(6, 7), 12);
	}
	
	public static void testBeforeSix() throws Exception {
		assertEquals(testSTUFF2.BabysitterCalc.calculate(2, 5), 0);
	}
}
