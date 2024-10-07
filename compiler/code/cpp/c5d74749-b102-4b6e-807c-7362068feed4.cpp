#include <iostream>
#include<vector>
using namespace std;

int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        int idx=0;
        int n=gas.size();
        int fuel=0, totaldiff=0;

        for(int i=0;i<n;i++){
            int diff=gas[i]-cost[i];
            totaldiff+=diff;
            fuel+=diff;
            if(fuel<0){
                idx=i+1;
                fuel=0;
            }
        }

        return (totaldiff<0)? -1:idx;
    }

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      int n;
      cin>>n;
      vector<int> gas(n), cost(n);

      for(int i=0;i<n;i++){
        cin>>gas[i]
      } 
      for(int i=0;i<n;i++){
        cin>>cost[i]
      }

      cout<<canCompleteCircuit(gas,cost);
      // Return 0 to indicate successful execution
      return 0; 
  }