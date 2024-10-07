#include <iostream>
#include<string>
using namespace std;

bool isPalindrome(string s) {
        int n=s.length();
        int left=0;
        int right=n-1;

        while(left<right){
            if(!isalnum(s[left])){
                left++;
                continue;
            }
            if(!isalnum(s[right])){
                right--;
                continue;
            }
            if(tolower(s[left])!=tolower(s[right])){
                return false;
            }else{
            left++;
            right--;
            }
        }
        return true;
    }

  // Define the main function
  int main() { 
      string str;
      cin>>str;
      if(isPalindrome(str)){
        cout<<"true";
      } else{
        cout<<"false";
      }
      
      // Return 0 to indicate successful execution
      return 0; 
  }