export interface ValidationError {
  field: string
  message: string
}

export interface ValidationResult {
  isValid: boolean
  errors: ValidationError[]
}

// Email validation
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Password validation - min 6 chars
export const validatePassword = (password: string): boolean => {
  return password.length >= 6
}

// Phone validation for South African numbers
export const validatePhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^(\+27|0)[0-9]{9}$/
  return phoneRegex.test(phone.replace(/\s/g, ""))
}

// Postal code validation for South Africa
export const validatePostalCode = (code: string): boolean => {
  return /^\d{4}$/.test(code)
}

// Card number validation (Luhn algorithm)
export const validateCardNumber = (cardNumber: string): boolean => {
  const digits = cardNumber.replace(/\D/g, "")
  if (digits.length < 13 || digits.length > 19) return false

  let sum = 0
  let isEven = false

  for (let i = digits.length - 1; i >= 0; i--) {
    let digit = Number.parseInt(digits[i], 10)

    if (isEven) {
      digit *= 2
      if (digit > 9) digit -= 9
    }

    sum += digit
    isEven = !isEven
  }

  return sum % 10 === 0
}

// Expiry date validation (MM/YY)
export const validateExpiryDate = (expiry: string): boolean => {
  const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/
  return expiryRegex.test(expiry)
}

// CVV validation
export const validateCVV = (cvv: string): boolean => {
  return /^\d{3,4}$/.test(cvv)
}

// Validate login form
export const validateLoginForm = (email: string, password: string): ValidationResult => {
  const errors: ValidationError[] = []

  if (!email) {
    errors.push({ field: "email", message: "Email is required" })
  } else if (!validateEmail(email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" })
  }

  if (!password) {
    errors.push({ field: "password", message: "Password is required" })
  } else if (!validatePassword(password)) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Validate register form
export const validateRegisterForm = (
  name: string,
  email: string,
  password: string,
  confirmPassword: string,
  agreeToTerms: boolean,
): ValidationResult => {
  const errors: ValidationError[] = []

  if (!name.trim()) {
    errors.push({ field: "name", message: "Full name is required" })
  }

  if (!email) {
    errors.push({ field: "email", message: "Email is required" })
  } else if (!validateEmail(email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" })
  }

  if (!password) {
    errors.push({ field: "password", message: "Password is required" })
  } else if (!validatePassword(password)) {
    errors.push({ field: "password", message: "Password must be at least 6 characters" })
  }

  if (password !== confirmPassword) {
    errors.push({ field: "confirmPassword", message: "Passwords do not match" })
  }

  if (!agreeToTerms) {
    errors.push({ field: "terms", message: "You must agree to the Terms of Service" })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Validate shipping form
export const validateShippingForm = (formData: {
  firstName: string
  lastName: string
  email: string
  phone: string
  address: string
  city: string
  province: string
  zipCode: string
}): ValidationResult => {
  const errors: ValidationError[] = []

  if (!formData.firstName.trim()) {
    errors.push({ field: "firstName", message: "First name is required" })
  }

  if (!formData.lastName.trim()) {
    errors.push({ field: "lastName", message: "Last name is required" })
  }

  if (!formData.email) {
    errors.push({ field: "email", message: "Email is required" })
  } else if (!validateEmail(formData.email)) {
    errors.push({ field: "email", message: "Please enter a valid email address" })
  }

  if (!formData.phone) {
    errors.push({ field: "phone", message: "Phone number is required" })
  } else if (!validatePhoneNumber(formData.phone)) {
    errors.push({ field: "phone", message: "Please enter a valid South African phone number" })
  }

  if (!formData.address.trim()) {
    errors.push({ field: "address", message: "Street address is required" })
  }

  if (!formData.city.trim()) {
    errors.push({ field: "city", message: "City is required" })
  }

  if (!formData.province) {
    errors.push({ field: "province", message: "Province is required" })
  }

  if (!formData.zipCode) {
    errors.push({ field: "zipCode", message: "Postal code is required" })
  } else if (!validatePostalCode(formData.zipCode)) {
    errors.push({ field: "zipCode", message: "Postal code must be 4 digits" })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Validate payment form
export const validatePaymentForm = (formData: {
  cardName: string
  cardNumber: string
  expiry: string
  cvv: string
}): ValidationResult => {
  const errors: ValidationError[] = []

  if (!formData.cardName.trim()) {
    errors.push({ field: "cardName", message: "Cardholder name is required" })
  }

  if (!formData.cardNumber) {
    errors.push({ field: "cardNumber", message: "Card number is required" })
  } else if (!validateCardNumber(formData.cardNumber)) {
    errors.push({ field: "cardNumber", message: "Please enter a valid card number" })
  }

  if (!formData.expiry) {
    errors.push({ field: "expiry", message: "Expiry date is required" })
  } else if (!validateExpiryDate(formData.expiry)) {
    errors.push({ field: "expiry", message: "Expiry date must be in MM/YY format" })
  }

  if (!formData.cvv) {
    errors.push({ field: "cvv", message: "CVV is required" })
  } else if (!validateCVV(formData.cvv)) {
    errors.push({ field: "cvv", message: "CVV must be 3 or 4 digits" })
  }

  return {
    isValid: errors.length === 0,
    errors,
  }
}
