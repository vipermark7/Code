package com.example.android.exampleproject

import android.os.Bundle
import android.support.v7.app.AppCompatActivity

class Main2Activity : AppCompatActivity() {

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main2)
    }
}
/*    package com.example.android.exampleproject;

    import android.support.v7.app.AppCompatActivity;
    import android.os.Bundle;
    import android.view.View;
    import android.widget.Button;
    import android.widget.TextView;

    public class MainActivity extends AppCompatActivity {
        int clicks = 0;

        @Override
        protected void onCreate(Bundle savedInstanceState) {
            super.onCreate(savedInstanceState);
            setContentView(R.layout.activity_main);
        }

        public void increment(View view) {
            clicks = clicks + 1;
            displayQuantity(clicks);

        }

        private void displayQuantity(int numberOfCoffees) {
            TextView quantityTextView = (TextView) findViewById(R.id.numberofclicks);
            quantityTextView.setText("" + numberOfCoffees);
        }
    }
    */


