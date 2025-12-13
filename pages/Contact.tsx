import { motion } from "framer-motion";
import {
  staggerContainer,
  flipFromTop,
  flipFromLeft,
  flipFromRight,
  createStaggeredFlip
} from "../components/animations/pageAnimations";
import { useState } from "react";

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

interface RateLimitData {
  lastSubmission: number;
  hourlyCount: number;
  dailyCount: number;
  lastResetHour: string;
  lastResetDay: string;
}

function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  // Rate limiting constants
  const HOURLY_LIMIT = 2;
  const DAILY_LIMIT = 5;
  const HOUR_IN_MS = 60 * 60 * 1000;
  const DAY_IN_MS = 24 * HOUR_IN_MS;

  // Rate limiting functions
  const getRateLimitData = (): RateLimitData => {
    try {
      const stored = localStorage.getItem("contactFormRateLimit");
      if (stored) {
        return JSON.parse(stored);
      }
    } catch (error) {
      console.warn("Failed to read rate limit data from localStorage:", error);
    }

    return {
      lastSubmission: 0,
      hourlyCount: 0,
      dailyCount: 0,
      lastResetHour: "",
      lastResetDay: ""
    };
  };

  const saveRateLimitData = (data: RateLimitData): void => {
    try {
      localStorage.setItem("contactFormRateLimit", JSON.stringify(data));
    } catch (error) {
      console.warn("Failed to save rate limit data to localStorage:", error);
    }
  };

  const checkRateLimit = (): {
    allowed: boolean;
    message?: string;
    waitTime?: number;
  } => {
    const now = Date.now();
    const data = getRateLimitData();

    // Get current hour and day identifiers
    const currentHour = new Date(now).toISOString().slice(0, 13); // YYYY-MM-DDTHH
    const currentDay = new Date(now).toISOString().slice(0, 10); // YYYY-MM-DD

    console.log("Rate limit check:", {
      currentHour,
      currentDay,
      data,
      HOURLY_LIMIT,
      DAILY_LIMIT,
      hourlyExceeded: data.hourlyCount >= HOURLY_LIMIT,
      dailyExceeded: data.dailyCount >= DAILY_LIMIT
    });

    // Reset counters if needed
    if (data.lastResetHour !== currentHour) {
      console.log("Resetting hourly counter");
      data.hourlyCount = 0;
      data.lastResetHour = currentHour;
      saveRateLimitData(data); // Save after reset
    }

    if (data.lastResetDay !== currentDay) {
      console.log("Resetting daily counter");
      data.dailyCount = 0;
      data.lastResetDay = currentDay;
      saveRateLimitData(data); // Save after reset
    }

    // Check daily limit first
    if (data.dailyCount >= DAILY_LIMIT) {
      console.log("Blocking due to daily limit exceeded");
      const nextReset = new Date(currentDay + "T23:59:59").getTime();
      return {
        allowed: false,
        message: "Daily message limit reached. Please try again tomorrow.",
        waitTime: Math.ceil((nextReset - now) / 1000)
      };
    }

    // Check hourly limit
    if (data.hourlyCount >= HOURLY_LIMIT) {
      console.log("Blocking due to hourly limit exceeded");
      const nextReset = new Date(currentHour + ":59:59").getTime() + 1000;
      return {
        allowed: false,
        message:
          "Too many messages sent recently. Please wait before sending another message.",
        waitTime: Math.ceil((nextReset - now) / 1000)
      };
    }

    return { allowed: true };
  };

  const updateRateLimit = (): void => {
    const now = Date.now();
    const data = getRateLimitData();

    const currentHour = new Date(now).toISOString().slice(0, 13);
    const currentDay = new Date(now).toISOString().slice(0, 10);

    console.log("Updating rate limit counters:", {
      before: data,
      incrementing: { hourlyCount: 1, dailyCount: 1 }
    });

    // Update counters
    data.lastSubmission = now;
    data.hourlyCount += 1;
    data.dailyCount += 1;
    data.lastResetHour = currentHour;
    data.lastResetDay = currentDay;

    console.log("Updated rate limit data:", data);
    saveRateLimitData(data);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = "Subject must be at least 5 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined
      }));
    }

    // Clear submit status when user makes changes
    if (submitStatus.type) {
      setSubmitStatus({ type: null, message: "" });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Check rate limiting before submitting
    console.log("About to check rate limit before submission");
    const rateLimitCheck = checkRateLimit();
    console.log("Rate limit check result:", rateLimitCheck);
    if (!rateLimitCheck.allowed) {
      console.log("Rate limit blocked submission");
      setSubmitStatus({
        type: "error",
        message: rateLimitCheck.message || "Rate limit exceeded. Please try again later."
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        // Update rate limiting data on successful submission
        updateRateLimit();

        setSubmitStatus({
          type: "success",
          message: data.message || "Message sent successfully! I'll get back to you soon."
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: ""
        });
      } else {
        setSubmitStatus({
          type: "error",
          message: data.message || "Failed to send message. Please try again."
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setSubmitStatus({
        type: "error",
        message: "Network error. Please check your connection and try again."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      className="max-w-4xl mx-auto px-4 py-8 h-[calc(100vh-111px)] overflow-y-auto scrollbar-hide"
      style={{ perspective: "1000px", transformStyle: "preserve-3d" }}
      variants={staggerContainer}
      initial="initial"
      animate="animate"
      exit="exit">
      <motion.div className="text-center mb-12" variants={flipFromTop}>
        <motion.h1
          className="text-4xl md:text-5xl font-bold text-textPrimary mb-4"
          variants={createStaggeredFlip(0.2, 0.1)(0)}>
          Get In Touch
        </motion.h1>
        <motion.p
          className="text-lg text-textTertiary max-w-2xl mx-auto"
          variants={createStaggeredFlip(0.3, 0.1)(1)}>
          Have a project in mind or want to collaborate? I{"'"}d love to hear from you.
          Let{"'"}s create something amazing together.
        </motion.p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8">
        <motion.div className="space-y-8" variants={flipFromLeft}>
          <motion.div variants={createStaggeredFlip(0.4, 0.1)(0)}>
            <h2 className="text-2xl font-semibold text-textPrimary mb-6">
              Let{"'"}s Connect
            </h2>
            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-3"
                variants={createStaggeredFlip(0.5, 0.1)(1)}>
                <div className="w-10 h-10 bg-quaternary rounded-full flex items-center justify-center border border-borderSecondary">
                  <span className="text-textPrimary">📧</span>
                </div>
                <div>
                  <p className="text-textPrimary font-medium">Email</p>
                  <p className="text-textTertiary">nikos@pountzas.gr</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3"
                variants={createStaggeredFlip(0.6, 0.1)(2)}>
                <div className="w-10 h-10 bg-quaternary rounded-full flex items-center justify-center border border-borderSecondary">
                  <span className="text-textPrimary">📍</span>
                </div>
                <div>
                  <p className="text-textPrimary font-medium">Location</p>
                  <p className="text-textTertiary">Greece</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-center space-x-3"
                variants={createStaggeredFlip(0.7, 0.1)(3)}>
                <div className="w-10 h-10 bg-quaternary rounded-full flex items-center justify-center border border-borderSecondary">
                  <span className="text-textPrimary">💼</span>
                </div>
                <div>
                  <p className="text-textPrimary font-medium">Availability</p>
                  <p className="text-textTertiary">Open to new opportunities</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          <motion.div
            className="bg-quaternary p-6 rounded-lg border border-borderSecondary"
            variants={createStaggeredFlip(0.8, 0.1)(4)}>
            <h3 className="text-lg font-semibold text-textPrimary mb-3">
              Quick Response
            </h3>
            <p className="text-textTertiary text-sm">
              I typically respond to messages within 24 hours. For urgent inquiries, feel
              free to follow up or connect via social media.
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          className="bg-quaternary p-8 rounded-lg border border-borderSecondary"
          variants={flipFromRight}>
          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            variants={staggerContainer}>
            {/* Status Message */}
            {submitStatus.type && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`p-4 rounded-lg border ${
                  submitStatus.type === "success"
                    ? "bg-green-900/20 border-green-500/30 text-green-400"
                    : "bg-red-900/20 border-red-500/30 text-red-400"
                }`}>
                {submitStatus.message}
              </motion.div>
            )}

            <motion.div variants={createStaggeredFlip(0.5, 0.1)(0)}>
              <label htmlFor="name" className="block text-textPrimary font-medium mb-2">
                Name
              </label>
              <motion.input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-tertiary border rounded-lg text-textPrimary placeholder-textTertiary focus:outline-none transition-colors ${
                  errors.name
                    ? "border-red-500"
                    : "border-borderSecondary focus:border-textPrimary"
                }`}
                placeholder="Your name"
                disabled={isSubmitting}
                variants={createStaggeredFlip(0.6, 0.1)(1)}
                whileFocus={{ scale: 1.02 }}
              />
              {errors.name && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1">
                  {errors.name}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={createStaggeredFlip(0.6, 0.1)(2)}>
              <label htmlFor="email" className="block text-textPrimary font-medium mb-2">
                Email
              </label>
              <motion.input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-tertiary border rounded-lg text-textPrimary placeholder-textTertiary focus:outline-none transition-colors ${
                  errors.email
                    ? "border-red-500"
                    : "border-borderSecondary focus:border-textPrimary"
                }`}
                placeholder="your.email@example.com"
                disabled={isSubmitting}
                variants={createStaggeredFlip(0.7, 0.1)(3)}
                whileFocus={{ scale: 1.02 }}
              />
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1">
                  {errors.email}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={createStaggeredFlip(0.7, 0.1)(4)}>
              <label
                htmlFor="subject"
                className="block text-textPrimary font-medium mb-2">
                Subject
              </label>
              <motion.input
                type="text"
                id="subject"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full px-4 py-3 bg-tertiary border rounded-lg text-textPrimary placeholder-textTertiary focus:outline-none transition-colors ${
                  errors.subject
                    ? "border-red-500"
                    : "border-borderSecondary focus:border-textPrimary"
                }`}
                placeholder="Project inquiry"
                disabled={isSubmitting}
                variants={createStaggeredFlip(0.8, 0.1)(5)}
                whileFocus={{ scale: 1.02 }}
              />
              {errors.subject && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1">
                  {errors.subject}
                </motion.p>
              )}
            </motion.div>

            <motion.div variants={createStaggeredFlip(0.8, 0.1)(6)}>
              <label
                htmlFor="message"
                className="block text-textPrimary font-medium mb-2">
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                className={`w-full px-4 py-3 bg-tertiary border rounded-lg text-textPrimary placeholder-textTertiary focus:outline-none transition-colors resize-none ${
                  errors.message
                    ? "border-red-500"
                    : "border-borderSecondary focus:border-textPrimary"
                }`}
                placeholder="Tell me about your project..."
                disabled={isSubmitting}
                variants={createStaggeredFlip(0.9, 0.1)(7)}
                whileFocus={{ scale: 1.02 }}
              />
              {errors.message && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-red-400 text-sm mt-1">
                  {errors.message}
                </motion.p>
              )}
            </motion.div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className={`w-full py-3 px-6 rounded-lg font-semibold transition-colors ${
                isSubmitting
                  ? "bg-gray-600 text-gray-400 cursor-not-allowed"
                  : "bg-textPrimary text-primary hover:bg-opacity-90"
              }`}
              variants={createStaggeredFlip(1.0, 0.1)(8)}
              whileHover={!isSubmitting ? { scale: 1.02, rotateY: 2 } : {}}
              whileTap={!isSubmitting ? { scale: 0.98 } : {}}>
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <motion.div
                    className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  />
                  <span>Sending...</span>
                </div>
              ) : (
                "Send Message"
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default Contact;
