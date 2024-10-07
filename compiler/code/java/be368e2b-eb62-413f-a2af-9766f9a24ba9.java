import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        String str = scanner.nextLine();
        
        if (isPalindrome(str)) {
            System.out.println("true");
        } else {
            System.out.println("false");
        }
        
        scanner.close();
    }

    public static boolean isPalindrome(String s) {
        int n = s.length();
        int left = 0;
        int right = n - 1;

        while (left < right) {
            if (!Character.isLetterOrDigit(s.charAt(left))) {
                left++;
                continue;
            }
            if (!Character.isLetterOrDigit(s.charAt(right))) {
                right--;
                continue;
            }
            if (Character.toLowerCase(s.charAt(left)) != Character.toLowerCase(s.charAt(right))) {
                return false;
            } else {
                left++;
                right--;
            }
        }
        return true;
    }
}
