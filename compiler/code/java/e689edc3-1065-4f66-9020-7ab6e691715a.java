import java.util.Scanner;

public class GasStation {
    public static int canCompleteCircuit(int[] gas, int[] cost) {
        int totalGas = 0, totalCost = 0, tank = 0, start = 0;
        
        for (int i = 0; i < gas.length; i++) {
            totalGas += gas[i];
            totalCost += cost[i];
            tank += gas[i] - cost[i];
            
            // If tank is negative, cannot reach the next station from this start
            if (tank < 0) {
                start = i + 1;  // Move start to the next station
                tank = 0;       // Reset the tank
            }
        }
        
        // If total gas is less than total cost, it's impossible to complete the circuit
        if (totalGas < totalCost) {
            return -1;
        }
        
        return start;
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        
        // Read the number of gas stations
        int n = scanner.nextInt();
        
        int[] gas = new int[n];
        int[] cost = new int[n];
        
        // Read the gas array
        for (int i = 0; i < n; i++) {
            gas[i] = scanner.nextInt();
        }
        
        // Read the cost array
        for (int i = 0; i < n; i++) {
            cost[i] = scanner.nextInt();
        }
        
        int start = canCompleteCircuit(gas, cost);
        
        if (start != -1) {
            System.out.println(start);
        } else {
            System.out.println(-1);
        }
        
        scanner.close();
    }
}
