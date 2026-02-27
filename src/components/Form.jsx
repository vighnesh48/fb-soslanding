import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

const Form = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    mobile: "",
    otp: "",
    state: "",
    city: "",
    course: "",
    specialization: "",
    consent: false,
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [courses, setCourses] = useState([]);
  const [specializations, setSpecializations] = useState([]);

  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [timer, setTimer] = useState(0);

  const [message, setMessage] = useState({ text: "", type: "" }); // type: success | danger

  const [utmParams, setUtmParams] = useState({
    lead_source: "website",
    utm_campaign: "organic",
    utm_medium: "enquiryform",
  });

  const pageURL = window.location.href;

  // ---------------- VALIDATION ----------------
  const isValidName = (name) => /^[A-Za-z ]+$/.test(name.trim());
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
  const isValidOtp = (otp) => /^[0-9]{4,6}$/.test(otp);

  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;
    if (name === "mobile" || name === "otp") value = value.replace(/[^0-9]/g, "");
    if (name === "fullName") value = value.replace(/[^A-Za-z ]/g, "");
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // ---------------- UTM ----------------
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      lead_source: params.get("lead_source") || "website",
      utm_campaign: params.get("utm_campaign") || "organic",
      utm_medium: params.get("utm_medium") || "enquiryform",
    });
  }, []);

  // ---------------- LOAD STATES & COURSES ----------------
  useEffect(() => {
    axios
      .post("https://onlinepayments.sandipuniversity.com/Api/get_states_for_forms")
      .then((res) => res.data.status && setStates(res.data.data || []))
      .catch((err) => console.error("States API Error:", err));

    axios
      .post("https://onlinepayments.sandipuniversity.com/Api/get_course_details_for_forms", {
        campus: "nashik",
        year: "2026",
        school_code: "1006",
      })
      .then((res) => res.data.status && setCourses(res.data.data || []))
      .catch((err) => console.error("Courses API Error:", err));
  }, []);

  // ---------------- LOAD CITIES ----------------
  const handleStateChange = (e) => {
    const stateId = e.target.value;
    setForm({ ...form, state: stateId, city: "" });
    axios
      .post("https://onlinepayments.sandipuniversity.com/Api/get_cities_by_state_for_forms", { state_id: stateId })
      .then((res) => setCities(res.data.status ? res.data.data : []))
      .catch(() => setCities([]));
  };

  // ---------------- LOAD SPECIALIZATIONS ----------------
  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setForm({ ...form, course: courseId, specialization: "" });
    try {
      const res = await axios.post(
        "https://onlinepayments.sandipuniversity.com/Api/get_stream_details_for_forms",
        { school_code: "1006", course_id: courseId, campus: "nashik", year: "2026" }
      );
      const streams = res.data.data?.streams || res.data.data || [];
      setSpecializations(streams);
    } catch {
      setSpecializations([]);
    }
  };

  // ---------------- SEND OTP ----------------
  const sendOtp = async () => {
    setMessage({ text: "", type: "" });

    if (!isValidMobile(form.mobile)) {
      setMessage({ text: "Enter valid 10-digit mobile number.", type: "danger" });
      return;
    }

    try {
      const res = await axios.post(
        "https://onlinepayments.sandipuniversity.com/Api/send_otp_for_forms",
        { mobile: form.mobile }
      );

      if (res.data.status || res.data.success) {
        setOtpSent(true);
        setTimer(30);
        setMessage({ text: "OTP sent successfully.", type: "success" });
      } else {
        setMessage({ text: res.data.message || "Failed to send OTP.", type: "danger" });
      }
    } catch {
      setMessage({ text: "Error sending OTP. Please try again.", type: "danger" });
    }
  };

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = async () => {
    setMessage({ text: "", type: "" });

    if (!isValidOtp(form.otp)) {
      setMessage({ text: "Enter valid numeric OTP.", type: "danger" });
      return;
    }

    try {
      const res = await axios.post(
        "https://onlinepayments.sandipuniversity.com/Api/verify_otp_for_forms",
        { mobile: form.mobile, otp: form.otp }
      );

      if (res.data.status || res.data.success) {
        setOtpVerified(true);
        setMessage({ text: "OTP verified successfully.", type: "success" });
      } else {
        setMessage({ text: res.data.message || "Invalid OTP.", type: "danger" });
      }
    } catch {
      setMessage({ text: "Error verifying OTP.", type: "danger" });
    }
  };

  // ---------------- TIMER ----------------
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

 // ---------------- GOOGLE ADS CONVERSION ----------------
  const gtag_report_conversion = () => {
    if (window.gtag) {
      window.gtag("event", "conversion", {
        send_to: "'AW-17751427077/m8ecCN-tlcobEIWQxZBC',",
      });
    }
  };

   //handleMobileBlur  function

const handleMobileBlur = async (e) => {
  const mobile = e.target.value;

  // Check if mobile number is exactly 10 digits
  if (/^\d{10}$/.test(mobile)) {
    const page_url = window.location.href;

    try {
      await axios.post("https://onlinepayments.sandipuniversity.com/Api/save_mobile_lead", {
        mobile,
        page_url,
      });

      console.log("Page URL sent successfully");
    } catch (error) {
      console.error("Error sending page URL", error);
    }
  }
};

  // ---------------- SUBMIT FORM ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!isValidName(form.fullName)) return setMessage({ text: "Full Name should contain only alphabets.", type: "danger" });
    if (!isValidEmail(form.email)) return setMessage({ text: "Enter valid email address.", type: "danger" });
    if (!isValidMobile(form.mobile)) return setMessage({ text: "Enter valid 10-digit mobile number.", type: "danger" });
    if (!otpVerified) return setMessage({ text: "Please verify OTP before submitting.", type: "danger" });

    const payload = {
      academic_year: "2026-27",
      country: "101",
      state: form.state,
      city: form.city,
      campus: "N",
      school: "6",
      course: form.course,
      specialization: form.specialization,
      fullName: form.fullName,
      email: form.email,
      mobile: form.mobile,
      campus_id: "1",
      lead_source: utmParams.lead_source,
      utm_campaign: utmParams.utm_campaign,
      utm_medium: utmParams.utm_medium,
      urlpath: pageURL,
      consent: form.consent,
    };

    try {
      const res = await axios.post("https://onlinepayments.sandipuniversity.com/Api/save_form_data", payload);
      if (res.data.status || res.data.success) {
        setMessage({ text: "Form submitted successfully!", type: "success" });
        setTimeout(() => {
          window.location.href = "https://www.sandipuniversity.edu.in/thankyoupages/thankyousos.php";
        }, 1500);
      } else {
        setMessage({ text: res.data.message || "Failed to submit form.", type: "danger" });
      }
    } catch {
      setMessage({ text: "Error submitting form.", type: "danger" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      className="lg:col-span-5 col-span-12 w-full md:flex hidden justify-center lg:justify-end"
    >
      <div className="bg-white/50 backdrop-blur-xl shadow-xl rounded-2xl p-6 w-full max-w-md border border-white/10">
        <h2 className="text-xl font-semibold text-white text-center mb-4">Apply Now</h2>
<div class="npf_wgts" data-height="530px" data-w="85ede9b36e7402c8518bc48b83ed8bf7"></div>

      </div>
    </motion.div>
  );
};

export default Form;
