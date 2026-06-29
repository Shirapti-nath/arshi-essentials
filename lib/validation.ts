import type { CheckoutDetails } from "@/types";

export type CheckoutErrors = Partial<Record<keyof CheckoutDetails, string>>;

export function validateCheckoutDetails(
  details: CheckoutDetails
): CheckoutErrors {
  const errors: CheckoutErrors = {};

  if (!details.name.trim()) errors.name = "Name is required";
  if (!/^[6-9]\d{9}$/.test(details.phone.replace(/\s/g, "")))
    errors.phone = "Enter a valid 10-digit mobile number";
  if (!details.address.trim()) errors.address = "Address is required";
  if (!details.city.trim()) errors.city = "City is required";
  if (!/^\d{6}$/.test(details.pincode))
    errors.pincode = "Enter a valid 6-digit pincode";

  return errors;
}

export function isCheckoutDetailsValid(details: CheckoutDetails): boolean {
  return Object.keys(validateCheckoutDetails(details)).length === 0;
}
