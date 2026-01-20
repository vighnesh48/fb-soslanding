import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function EnquiryForm({ open = true, onClose }) {
  if (!open) return null;

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
  const [sentMobile, setSentMobile] = useState(""); 

  const [utmParams, setUtmParams] = useState({
    lead_source: "website",
    utm_source: "organic",
    utm_medium: "enquiryform",
    utm_campaign: "organic",
    urlpath: window.location.href,
  });

  const [message, setMessage] = useState({ text: "", type: "" }); // type: success | danger

  const isValidName = (name) => /^[A-Za-z ]+$/.test(name.trim());
  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
  const isValidMobile = (mobile) => /^[0-9]{10}$/.test(mobile);
  const isValidOtp = (otp) => /^[0-9]{4,6}$/.test(otp);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      lead_source: params.get("lead_source") || "website",
      utm_source: params.get("utm_source") || "organic",
      utm_medium: params.get("utm_medium") || "enquiryform",
      utm_campaign: params.get("utm_campaign") || "organic",
      urlpath: window.location.href,
    });
  }, []);

  // Fetch states and courses
  useEffect(() => {
    axios
      .post("https://onlinepayments.sandipuniversity.com/Api/get_states_for_forms")
      .then((res) => res.data.status && setStates(res.data.data || []))
      .catch(console.error);

    axios
      .post("https://onlinepayments.sandipuniversity.com/Api/get_course_details_for_forms", {
        campus: "nashik",
        year: "2026",
        school_code: "1006",
      })
      .then((res) => res.data.status && setCourses(res.data.data || []))
      .catch(console.error);
  }, []);

  // Input change handler
  const handleChange = (e) => {
    let { name, value, type, checked } = e.target;

    if (name === "mobile") {
      value = value.replace(/[^0-9]/g, "");
      if (otpSent && value !== sentMobile) {
        // Reset OTP if mobile changes
        setOtpSent(false);
        setOtpVerified(false);
        setForm({ ...form, mobile: value, otp: "" });
        return;
      }
    }

    if (name === "otp") value = value.replace(/[^0-9]/g, "");
    if (name === "fullName") value = value.replace(/[^A-Za-z ]/g, "");

    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setForm({ ...form, state: stateId, city: "" });
    try {
      const res = await axios.post("https://onlinepayments.sandipuniversity.com/Api/get_cities_by_state_for_forms", { state_id: stateId });
      setCities(res.data.status ? res.data.data : []);
    } catch {
      setCities([]);
    }
  };

  const handleCourseChange = async (e) => {
    const courseId = e.target.value;
    setForm({ ...form, course: courseId, specialization: "" });
    try {
      const res = await axios.post(
        "https://onlinepayments.sandipuniversity.com/Api/get_stream_details_for_forms",
        { school_code: "1006", course_id: courseId, campus: "nashik", year: "2026" }
      );
      setSpecializations(res.data.data?.streams || res.data.data || []);
    } catch {
      setSpecializations([]);
    }
  };

  // Send OTP
  const sendOtp = async () => {
    setMessage({ text: "", type: "" });
    if (!isValidMobile(form.mobile)) {
      setMessage({ text: "Enter valid 10-digit mobile number.", type: "danger" });
      return;
    }

    try {
      const res = await axios.post("https://onlinepayments.sandipuniversity.com/Api/send_otp_for_forms", { mobile: form.mobile });
      if (res.data.status || res.data.success) {
        setOtpSent(true);
        setSentMobile(form.mobile);
        setTimer(30);
        setOtpVerified(false);
        setForm({ ...form, otp: "" });
        setMessage({ text: "OTP sent successfully.", type: "success" });
      } else {
        setMessage({ text: res.data.message || "Failed to send OTP.", type: "danger" });
      }
    } catch {
      setMessage({ text: "Error sending OTP. Try again.", type: "danger" });
    }
  };

  // Countdown timer
  useEffect(() => {
    if (!timer) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // Verify OTP
  const verifyOtp = async () => {
    setMessage({ text: "", type: "" });
    if (!isValidOtp(form.otp)) {
      setMessage({ text: "Enter a valid OTP.", type: "danger" });
      return;
    }
    if (form.mobile !== sentMobile) {
      setMessage({ text: "OTP was sent to a different mobile number.", type: "danger" });
      return;
    }

    try {
      const res = await axios.post("https://onlinepayments.sandipuniversity.com/Api/verify_otp_for_forms", { mobile: form.mobile, otp: form.otp });
      if (res.data.status || res.data.success) {
        setOtpVerified(true);
        setMessage({ text: "OTP verified successfully.", type: "success" });
      } else {
        setOtpVerified(false);
        setMessage({ text: res.data.message || "Invalid OTP.", type: "danger" });
      }
    } catch {
      setOtpVerified(false);
      setMessage({ text: "Error verifying OTP.", type: "danger" });
    }
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ text: "", type: "" });

    if (!isValidName(form.fullName)) return setMessage({ text: "Full Name should contain only alphabets.", type: "danger" });
    if (!isValidEmail(form.email)) return setMessage({ text: "Enter valid email address.", type: "danger" });
    if (!isValidMobile(form.mobile)) return setMessage({ text: "Enter valid 10-digit mobile number.", type: "danger" });
    if (!otpVerified) return setMessage({ text: "OTP is not verified. Cannot submit form.", type: "danger" });

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
      utm_source: utmParams.utm_source,
      utm_medium: utmParams.utm_medium,
      utm_campaign: utmParams.utm_campaign,
      urlpath: utmParams.urlpath,
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
    <motion.div className="fixed inset-0 bg-black/40 backdrop-blur-md z-[999] flex justify-center items-center px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} transition={{ duration: 0.25 }} className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl">
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-4">Enquiry Form</h2>

        {/* ALERT MESSAGE */}
        {message.text && (
          <div className={`mb-4 px-4 py-2 rounded text-sm ${message.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
          <input className="google-input" placeholder="Full Name *" name="fullName" value={form.fullName} onChange={handleChange} required />
          <input className="google-input" placeholder="Email Address *" name="email" value={form.email} onChange={handleChange} required />

          <div className="flex items-center gap-3 md:col-span-2">
            <input className="google-input w-full" placeholder="Mobile Number *" name="mobile" value={form.mobile} onChange={handleChange} required disabled={otpSent} />
            <input className="google-input w-28" placeholder="OTP *" name="otp" value={form.otp} onChange={handleChange} />

            {!otpSent ? (
              <button type="button" onClick={sendOtp} className="px-6 py-2 bg-blue-700 text-white rounded">Get OTP</button>
            ) : !otpVerified ? (
              <>
                <button type="button" onClick={verifyOtp} className="px-6 py-2 bg-green-700 text-white rounded">Verify</button>
                {timer === 0 ? (
                  <button type="button" onClick={sendOtp} className="px-5 py-2 bg-red-600 text-white rounded">Resend</button>
                ) : (
                  <span className="text-yellow-500 text-xs">Resend in {timer}s</span>
                )}
              </>
            ) : (
              <span className="text-green-600 font-bold">✔</span>
            )}
          </div>

          <select className="google-input" name="state" value={form.state} onChange={handleStateChange} required>
            <option value="">Select State *</option>
            {states.map((s) => (<option key={s.id} value={s.id}>{s.name}</option>))}
          </select>

          <select className="google-input" name="city" value={form.city} onChange={handleChange} required>
            <option value="">Select City *</option>
            {cities.map((c) => (<option key={c.id} value={c.id}>{c.name}</option>))}
          </select>

          <select className="google-input" name="course" value={form.course} onChange={handleCourseChange} required>
            <option value="">Select Course*</option>
            {courses.map((c) => (<option key={c.course_id} value={c.course_id}>{c.course_name}</option>))}
          </select>

          <select className="google-input" name="specialization" value={form.specialization} onChange={handleChange} required>
            <option value="">Select Specialization*</option>
            {specializations.map((s) => (<option key={s.stream_id} value={s.stream_id}>{s.stream_name}</option>))}
          </select>

          <label className="flex items-start gap-2 text-xs text-gray-600 md:col-span-2">
            <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
            By submitting this form, I consent to receive communications from the University.
          </label>

          <button type="submit" disabled={!otpVerified} className={`w-full py-2 md:col-span-2 text-white font-semibold rounded-lg text-sm shadow-md mt-2 ${otpVerified ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'}`}>
            Submit
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
