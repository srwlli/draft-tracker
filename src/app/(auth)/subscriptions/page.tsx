'use client';

import { AuthPageLayout } from '@/components/auth-page-layout';
import { TextCard } from '@/components/text-card';
import { Button } from '@/components/ui/button';
import { Crown, Zap, Star, Check, CreditCard, Shield, Users } from 'lucide-react';

export default function SubscriptionsPage() {
  return (
    <AuthPageLayout title="Subscriptions">
      <div className="space-y-6">

        {/* Current Plan */}
        <TextCard
          title="Current Plan"
          description="Your active subscription details"
          icon={<Crown className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 rounded-lg bg-green-50/50 border border-green-200">
              <div>
                <h3 className="text-sm font-medium text-green-800">Free Plan</h3>
                <p className="text-sm text-green-700 mt-1">Active since August 2024</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-800">$0/month</p>
                <p className="text-xs text-green-600">No expiration</p>
              </div>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Current Features</h3>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p>✅ Create unlimited drafts</p>
                <p>✅ Real-time draft synchronization</p>
                <p>✅ Mobile-optimized interface</p>
                <p>✅ Basic player rankings</p>
                <p>❌ Advanced analytics</p>
                <p>❌ League integrations</p>
                <p>❌ Priority support</p>
              </div>
            </div>
          </div>
        </TextCard>

        {/* Available Plans */}
        <TextCard
          title="Available Plans"
          description="Choose the plan that fits your fantasy needs"
          icon={<Star className="h-5 w-5" />}
        >
          <div className="space-y-6">
            
            {/* Free Plan */}
            <div className="p-4 rounded-lg border-2 border-muted">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Free</h3>
                  <p className="text-sm text-muted-foreground">Perfect for casual drafters</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold">$0</p>
                  <p className="text-sm text-muted-foreground">forever</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Unlimited draft creation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Real-time synchronization</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Mobile-first interface</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Basic player rankings</span>
                </div>
              </div>
              <Button className="w-full" disabled>Current Plan</Button>
            </div>

            {/* Pro Plan */}
            <div className="p-4 rounded-lg border-2 border-blue-500 bg-blue-50/30 relative">
              <div className="absolute -top-2 left-4">
                <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded">POPULAR</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-blue-800">Pro</h3>
                  <p className="text-sm text-blue-600">For serious fantasy players</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-blue-800">$9.99</p>
                  <p className="text-sm text-blue-600">per month</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Everything in Free</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Advanced player analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">ESPN/Yahoo league sync</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Custom ranking imports</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Weekly trend analysis</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Priority support</span>
                </div>
              </div>
              <Button className="w-full">Upgrade to Pro</Button>
            </div>

            {/* Premium Plan */}
            <div className="p-4 rounded-lg border-2 border-purple-500 bg-purple-50/30">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-purple-800">Premium</h3>
                  <p className="text-sm text-purple-600">For fantasy commissioners</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-purple-800">$19.99</p>
                  <p className="text-sm text-purple-600">per month</p>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Everything in Pro</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">League management tools</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Advanced draft analytics</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Multi-league management</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">Custom branding options</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">24/7 dedicated support</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Check className="h-4 w-4 text-green-600" />
                  <span className="text-sm">API access for integrations</span>
                </div>
              </div>
              <Button className="w-full" variant="outline">Upgrade to Premium</Button>
            </div>

          </div>
        </TextCard>

        {/* Payment & Billing */}
        <TextCard
          title="Payment & Billing"
          description="Manage your payment methods and billing"
          icon={<CreditCard className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Payment Method</h3>
                <p className="text-sm text-muted-foreground">No payment method on file</p>
              </div>
              <Button variant="outline" size="sm">Add Payment</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Billing History</h3>
                <p className="text-sm text-muted-foreground">View past invoices and payments</p>
              </div>
              <Button variant="outline" size="sm">View History</Button>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-sm font-medium">Usage Statistics</h3>
                <p className="text-sm text-muted-foreground">Track your plan usage</p>
              </div>
              <Button variant="outline" size="sm">View Usage</Button>
            </div>
          </div>
        </TextCard>

        {/* Security & Privacy */}
        <TextCard
          title="Security & Privacy"
          description="Your subscription and payment security"
          icon={<Shield className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Payment Security</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>🔒 256-bit SSL encryption</p>
                  <p>💳 PCI DSS compliant processing</p>
                  <p>🛡️ Fraud detection monitoring</p>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-medium mb-2">Privacy Protection</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>🔐 Data encryption at rest</p>
                  <p>📊 Anonymous usage analytics</p>
                  <p>🚫 No data selling to third parties</p>
                </div>
              </div>
            </div>
          </div>
        </TextCard>

        {/* FAQ */}
        <TextCard
          title="Frequently Asked Questions"
          description="Common questions about subscriptions"
          icon={<Users className="h-5 w-5" />}
        >
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium mb-2">Can I cancel anytime?</h3>
              <p className="text-sm text-muted-foreground">Yes, you can cancel your subscription at any time. You&apos;ll continue to have access to premium features until the end of your billing period.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">What happens to my drafts if I downgrade?</h3>
              <p className="text-sm text-muted-foreground">All your existing drafts and data remain accessible. You&apos;ll just lose access to premium features like advanced analytics and league integrations.</p>
            </div>
            <div>
              <h3 className="text-sm font-medium mb-2">Do you offer team discounts?</h3>
              <p className="text-sm text-muted-foreground">Yes! Contact us for pricing on team plans for 5+ users. Perfect for fantasy leagues and commissioners.</p>
            </div>
          </div>
        </TextCard>

      </div>
    </AuthPageLayout>
  );
}