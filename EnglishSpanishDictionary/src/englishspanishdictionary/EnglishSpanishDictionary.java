/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package englishspanishdictionary;

import java.util.HashMap;
import java.util.Map;

public class EnglishSpanishDictionary {
    public static void main(String[] args) {
    Map<String, String> engSpanDictionary = new HashMap<>();
    
    engSpanDictionary.put("Monday", "Lunes");
    engSpanDictionary.put("Tuesday", "Martes");
    engSpanDictionary.put("Wednesday", "Miercoles");
    engSpanDictionary.put("Thursday","Jueves");
    engSpanDictionary.put("Friday", "Viernes");
    
    System.out.println(engSpanDictionary.get("Monday"));
    System.out.println(engSpanDictionary.get("Tuesday"));
    System.out.println(engSpanDictionary.get("Wednesday"));
    System.out.println(engSpanDictionary.get("Thursday"));
    System.out.println(engSpanDictionary.get("Friday"));
    
    System.out.println(engSpanDictionary.values());
    System.out.println(engSpanDictionary.keySet());
    }
}
