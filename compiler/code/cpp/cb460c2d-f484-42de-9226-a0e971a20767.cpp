#include <iostream>
#include<vector>
using namespace std;

int canCompleteCircuit(vector<int>& gas, vector<int>& cost) {
        for(int i=0;i<gas.size();i++)
        {
            cost[i]=gas[i]-cost[i];
        }
        int res=0;
        for(int i=0;i<cost.size();i++)
        {
            res+=cost[i];
        }
        if(res<0)
            return -1;
        res=0;
        int idx=0;
        for(int i=0;i<cost.size();i++)
        {
            res+=cost[i];
            if(res<0)
            {
                idx=i+1;
                res=0;
            }
        }
        return idx;
    }

  // Define the main function
  int main() { 
      // Output "Hello World!" to the console
      int n;
      cin>>n;
      vector<int> gas(n), cost(n);

      for(int i=0;i<n;i++){
        cin>>gas[i];
      } 
      for(int i=0;i<n;i++){
        cin>>cost[i];
      }

      cout<<canCompleteCircuit(gas,cost);
      // Return 0 to indicate successful execution
      return 0; 
  }