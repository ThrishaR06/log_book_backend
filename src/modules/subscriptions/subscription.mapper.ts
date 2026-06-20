export class SubscriptionMapper {
  static toPlanDTO(plan: any) {
    switch (plan.name) {
      case "free":
        return {
          planId: plan.id,
          key: "free_trial",
          name: "Free Trial",
          price: `₹${plan.amount}`,
          features: [
            "Max 3 surgical cases",
            "Standard PDF exports",
            "Single-device offline sync",
          ],
          cta: "Trial Active",
        };

      case "monthly":
        return {
          planId: plan.id,
          key: "pro_monthly",
          name: "Pro Monthly",
          price: `₹${plan.amount}`,
          period: "month",
          features: [
            "Unlimited surgical cases",
            "Full PDF & Excel reports",
            "Multi-device offline backup",
            "Advanced finance tracker",
          ],
          cta: "Upgrade to Pro",
        };

      case "yearly":
        return {
          planId: plan.id,
          key: "premium_yearly",
          name: "Premium Yearly",
          price: `₹${plan.amount}`,
          period: "year",
          features: [
            "Unlimited surgical cases",
            "Priority PDF & Excel reports",
            "Dedicated cloud backup",
            "Custom procedure templates",
            "24/7 Priority support",
          ],
          cta: "Go Premium (Save 16%)",
        };

      default:
        return null;
    }
  }
}