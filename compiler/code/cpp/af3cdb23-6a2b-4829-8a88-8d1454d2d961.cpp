#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;

int romanToInt(string s) {
        int ans=0;
        unordered_map<char, int> mp;

        mp['I']=1;
        mp['V']=5;
        mp['X']=10;
        mp['L']=50;
        mp['C']=100;
        mp['D']=500;
        mp['M']=1000;
        
        for(int i=0;i<s.length();i++){
            if(mp[s[i]]<mp[s[i+1]]){
                ans-=mp[s[i]];
            }
            else{
                ans+=mp[s[i]];
            }
        }
        return ans;
    
    }

  // Define the main function
  int main() { 
      
      string s;
      cin>>s;
      cout << romanToInt(s); 
      
      // Return 0 to indicate successful execution
      return 0; 
  }