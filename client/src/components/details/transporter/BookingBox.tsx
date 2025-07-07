"use client";

import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  CreditCard,
  Lock,
  Shield,
  X,
} from "lucide-react";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";

// --- Reusable UI Components (Theme-aware) ---
const Button = ({
  variant = "default",
  size,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "secondary" | "destructive" | "ghost";
  size?: "lg" | "default" | "sm" | "icon";
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  };
  const sizes = {
    lg: "h-11 rounded-md px-8",
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    icon: "h-10 w-10",
  };
  return (
    <button
      className={`${baseStyles} ${sizes[size || "default"]} ${
        variants[variant]
      } ${className}`}
      {...props}
    />
  );
};

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, ...props }, ref) => {
  return (
    <input
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

const Label = React.forwardRef<
  HTMLLabelElement,
  React.LabelHTMLAttributes<HTMLLabelElement>
>(({ className, ...props }, ref) => (
  <label
    ref={ref}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
    {...props}
  />
));
Label.displayName = "Label";

// --- Confirmation and Payment Modals Component ---

const BookingConfirmationModals = ({
  isOpen,
  onClose,
  payNowMode,
  price,
  fee,
  total,
}: {
  isOpen: boolean;
  onClose: () => void;
  payNowMode: boolean;
  price: number;
  fee: number;
  total: number;
}) => {
  const t = useTranslations("details.transporter");
  const [modalStep, setModalStep] = useState<
    "summary" | "payment" | "processing" | "success"
  >("summary");
  const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal">("card");

  useEffect(() => {
    // Reset to the first step when the modal is closed/re-opened
    if (isOpen) {
      setModalStep("summary");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleClose = () => {
    onClose();
  };

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    setModalStep("processing");
    // Simulate API call to payment gateway
    setTimeout(() => {
      setModalStep("success");
    }, 2500);
  };

  const renderSummary = () => (
    <div className="p-6 text-center space-y-4">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
        <CreditCard className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-2xl font-bold">{t("confirmAndPayTitle")}</h3>
      <p className="text-muted-foreground">{t("confirmAndPaySubtitle")}</p>
      <div className="text-left bg-secondary/50 rounded-lg p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("tripPrice")}</span>
          <span>{price.toFixed(2)} MAD</span>
        </div>
        <div className="flex justify-between">
          <span className="text-muted-foreground">{t("platformFee")}</span>
          <span>{fee.toFixed(2)} MAD</span>
        </div>
        <div className="flex justify-between font-bold text-base border-t pt-2 mt-2">
          <span>{t("total")}</span>
          <span>{total.toFixed(2)} MAD</span>
        </div>
      </div>
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="w-full" onClick={handleClose}>
          {t("cancel")}
        </Button>
        <Button className="w-full" onClick={() => setModalStep("payment")}>
          {t("payNow")}
        </Button>
      </div>
    </div>
  );

  const renderPaymentForm = () => (
    <form onSubmit={handlePayment} className="p-6">
      <div className="flex items-center mb-4">
        <Button
          variant="ghost"
          size="icon"
          className="mr-2 h-8 w-8"
          onClick={() => setModalStep("summary")}
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h3 className="text-xl font-bold">{t("paymentDetailsTitle")}</h3>
      </div>

      <div className="bg-secondary p-1 rounded-full flex mb-4">
        <button
          type="button"
          onClick={() => setPaymentMethod("card")}
          className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-all ${
            paymentMethod === "card"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {t("creditCard")}
        </button>
        <button
          type="button"
          onClick={() => setPaymentMethod("paypal")}
          className={`w-1/2 py-2 text-sm font-semibold rounded-full transition-all ${
            paymentMethod === "paypal"
              ? "bg-background shadow text-foreground"
              : "text-muted-foreground"
          }`}
        >
          {t("paypal")}
        </button>
      </div>

      {paymentMethod === "card" ? (
        <div className="space-y-4">
          <div>
            <Label htmlFor="card-name">{t("cardName")}</Label>
            <Input id="card-name" placeholder="Name on Card" required />
          </div>
          <div>
            <Label htmlFor="card-number">{t("cardNumber")}</Label>
            <Input
              id="card-number"
              placeholder="0000 0000 0000 0000"
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="expiry">{t("cardExpiry")}</Label>
              <Input id="expiry" placeholder="MM/YY" required />
            </div>
            <div>
              <Label htmlFor="cvc">{t("cardCVC")}</Label>
              <Input id="cvc" placeholder="CVC" required />
            </div>
          </div>
          <Button type="submit" size="lg" className="w-full !mt-6">
            <Lock className="mr-2 h-4 w-4" />
            {t("paySecurely")} {total.toFixed(2)} MAD
          </Button>
        </div>
      ) : (
        <div className="text-center py-8 space-y-4">
          <p className="text-muted-foreground">{t("paypalRedirect")}</p>
          <Button
            type="submit"
            size="lg"
            className="w-full bg-[#0070BA] hover:bg-[#005ea6] text-white"
          >
            {t("continueToPayPal")}
          </Button>
        </div>
      )}
    </form>
  );

  const renderProcessing = () => (
    <div className="p-6 text-center space-y-4 flex flex-col items-center justify-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      <h3 className="text-xl font-bold">{t("processingPaymentTitle")}</h3>
      <p className="text-muted-foreground">{t("processingPaymentSubtitle")}</p>
    </div>
  );

  const renderSuccess = () => (
    <div className="p-6 text-center space-y-4">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
        <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
      </div>
      <h3 className="text-2xl font-bold">{t("paymentSuccessfulTitle")}</h3>
      <p className="text-muted-foreground">{t("paymentSuccessfulSubtitle")}</p>
      <div className="pt-2 flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="w-full" onClick={handleClose}>
          {t("done")}
        </Button>
        <Button className="w-full" onClick={handleClose}>
          {t("goToChat")}
        </Button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (modalStep) {
      case "summary":
        return renderSummary();
      case "payment":
        return renderPaymentForm();
      case "processing":
        return renderProcessing();
      case "success":
        return renderSuccess();
      default:
        return null;
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4"
      onClick={handleClose}
    >
      <div
        className="bg-card rounded-xl shadow-2xl w-full max-w-md mx-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {payNowMode ? (
          renderContent()
        ) : (
          // --- Pay Later (Free) Confirmation Modal ---
          <div className="p-6 text-center space-y-4">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/50">
              <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-2xl font-bold">{t("bookingConfirmedTitle")}</h3>
            <p className="text-muted-foreground">
              {t("bookingConfirmedSubtitle")}
            </p>
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleClose}
              >
                {t("viewMyBookings")}
              </Button>
              <Button className="w-full">{t("goToChat")}</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// --- Main BookingBox Component ---

const BookingBox = ({
  price,
  fee,
  total,
}: {
  price: number;
  fee: number;
  total: number;
}) => {
  const t = useTranslations("details.transporter");
  const payNowMode = process.env.NEXT_PUBLIC_PAY_NOW_MODE === "true";
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-card border rounded-xl shadow-sm p-6 space-y-4">
        <h2 className="text-xl font-bold">{t("confirmBooking")}</h2>

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">{t("tripPrice")}</span>
            <span>{price.toFixed(2)} MAD</span>
          </div>

          {payNowMode && (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground">
                  {t("platformFee")}
                </span>
                <span>{fee.toFixed(2)} MAD</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>{t("total")}</span>
                <span>{total.toFixed(2)} MAD</span>
              </div>
            </>
          )}
        </div>

        <div className="text-xs text-muted-foreground flex gap-2">
          <Shield className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>
            {payNowMode ? t("paymentNowNote") : t("paymentLaterNote")}
          </span>
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={() => setIsModalOpen(true)}
        >
          {payNowMode ? t("proceedToPayment") : t("confirmBookingBtn")}
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <BookingConfirmationModals
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        payNowMode={payNowMode}
        price={price}
        fee={fee}
        total={total}
      />
    </>
  );
};

export default BookingBox;
