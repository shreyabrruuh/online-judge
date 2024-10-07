import java.util.Scanner;

public class HappyNumber {
    public static boolean isHappy(int n) {
        if (n == 1) return true;
        if (n == 7) return true;
        if (n > 1 && n < 10) return false;
        if (n <= 0) return false;
        int sum = 0;
        while (n > 0) {
            sum += (n % 10) * (n % 10);
            n /= 10;
        }
        return isHappy(sum);
    }

    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
            
            int num = scanner.nextInt();
            boolean result = isHappy(num);
            System.out.println(result ? "true" : "false");
        
        scanner.close();
    }
}

