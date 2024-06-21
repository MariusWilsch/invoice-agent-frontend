import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Pricing = () => {
  return (
    <div className="p-4">
      <Card>
        <CardHeader>
          <CardTitle>Pricing Plans</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border p-4 rounded-lg">
              <h2 className="text-xl font-bold">Basic Plan</h2>
              <p className="text-muted-foreground">$10/month</p>
              <p>Includes basic features.</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h2 className="text-xl font-bold">Pro Plan</h2>
              <p className="text-muted-foreground">$20/month</p>
              <p>Includes all basic features plus additional pro features.</p>
            </div>
            <div className="border p-4 rounded-lg">
              <h2 className="text-xl font-bold">Enterprise Plan</h2>
              <p className="text-muted-foreground">$50/month</p>
              <p>Includes all pro features plus enterprise-level support.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Pricing;