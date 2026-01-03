import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

export default function EnquiryForm({ open = true, onClose }) {
  if (!open) return null;

  // ---------------- FORM STATE ----------------
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
  const [timer, setTimer] = useState(0); // Resend OTP countdown

  // ---------------- DYNAMIC UTM & LEAD SOURCE ----------------
  const [utmParams, setUtmParams] = useState({
    lead_source: "website",
    utm_source: "organic",
    utm_medium: "enquiryform",
    utm_campaign: "organic",
    urlpath: window.location.href,
  });
  // ⭐ PAGE URL
  const pageURL = window.location.href;
  // Auto-capture UTM params from URL
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

  // ---------------- HANDLE INPUT CHANGE ----------------
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  // ---------------- LOAD CITIES ----------------
  const handleStateChange = async (e) => {
    const stateId = e.target.value;
    setForm({ ...form, state: stateId, city: "" });

    try {
      const res = await axios.post(
        "https://onlinepayments.sandipuniversity.com/Api/get_cities_by_state_for_forms",
        { state_id: stateId }
      );
      setCities(res.data.status ? res.data.data : []);
    } catch (err) {
      console.error("Cities API Error:", err);
      setCities([]);
    }
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
    } catch (err) {
      console.error("Specialization API Error:", err);
      setSpecializations([]);
    }
  };

  // ---------------- SEND OTP ----------------
  const sendOtp = async () => {
    if (!form.mobile || form.mobile.length !== 10) return alert("Enter valid 10-digit mobile number");

    try {
      const res = await axios.post("https://onlinepayments.sandipuniversity.com/Api/send_otp_for_forms", {
        mobile: form.mobile,
      });

      if (res.data.status || res.data.success) {
        setOtpSent(true);
        setTimer(30); // Start 30s countdown for resend
        alert("OTP Sent Successfully!");
      } else if (
        res.data.message?.toLowerCase().includes("already") ||
        res.data.error?.toLowerCase().includes("already") ||
        res.data.msg?.toLowerCase().includes("already")
      ) {
        alert("This mobile number is already registered!");
      } else {
        alert("Failed to send OTP. Try again.");
      }
    } catch (err) {
      console.error("Send OTP Error:", err);
      alert("Error sending OTP");
    }
  };

  // ---------------- OTP TIMER EFFECT ----------------
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = async () => {
    if (!form.otp) return alert("Enter OTP");

    try {
      const res = await axios.post("https://onlinepayments.sandipuniversity.com/Api/verify_otp_for_forms", {
        mobile: form.mobile,
        otp: form.otp,
      });

      if (res.data.status || res.data.success) {
        setOtpVerified(true);
        alert("OTP Verified Successfully!");
      } else {
        alert("Invalid OTP");
      }
    } catch (err) {
      console.error("Verify OTP Error:", err); 
      alert("Error verifying OTP");
    }
  };

  // ---------------- SUBMIT FORM ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) return alert("Please verify OTP first.");

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
      urlpath: utmParams.urlpath, // Hidden page URL
      consent: form.consent,
    };

    try {
      const res = await axios.post(
        "https://onlinepayments.sandipuniversity.com/Api/save_form_data",
        payload,
        { headers: { "Content-Type": "application/json" } }
      );

      if (res.data.status || res.data.success) {
        alert("Form Submitted Successfully!");
        window.location.href = "https://www.sandipuniversity.edu.in/thankyoupages/thankyousos.php";
      } else if (res.data.message?.toLowerCase().includes("already")) {
        alert("This mobile number is already registered! Cannot submit.");
      } else {
        console.log("Submit API Response:", res.data);
        alert("Failed to submit form. Check console.");
      }
    } catch (err) {
      console.error("Submit Form Error:", err);
      alert("Error submitting form. Check console.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-black/40 backdrop-blur-md z-[999] flex justify-center items-center px-4"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
          Enquiry Form
        </h2>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-800">
          {/* Hidden Fields */}
          <input type="hidden" name="lead_source" value={utmParams.lead_source} />
          <input type="hidden" name="utm_source" value={utmParams.utm_source} />
          <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
          <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
          <input type="hidden" name="urlpath" value={utmParams.urlpath} />
          <input type="hidden" name="country" value="101" />
          <input type="hidden" name="campus_id" value="1" />
          <input type="hidden" name="campus" value="N" />
                   {/* Hidden submitted page URL */}
          <input type="hidden" name="urlpath" value={pageURL} />

          {/* Input Fields */}
          <input className="google-input" placeholder="Full Name *" name="fullName" value={form.fullName} onChange={handleChange} required />
          <input className="google-input" placeholder="Email Address *" name="email" value={form.email} onChange={handleChange} required />

          {/* OTP Section */}
          <div className="flex items-center gap-3 md:col-span-2">
            <input className="google-input w-full" placeholder="Mobile Number *" name="mobile" value={form.mobile} onChange={handleChange} required />
            <input className="google-input w-28" placeholder="OTP *" name="otp" value={form.otp} onChange={handleChange} />

            {!otpSent ? (
              <button type="button" onClick={sendOtp} className="px-4 py-2 bg-blue-700 text-white rounded">Get OTP</button>
            ) : !otpVerified ? (
              <>
                <button type="button" onClick={verifyOtp} className="px-4 py-2 bg-green-700 text-white rounded">Verify</button>
                {timer > 0 ? (
                  <span className="text-yellow-600 px-2">{`Resend in ${timer}s`}</span>
                ) : (
                  <button type="button" onClick={sendOtp} className="px-4 py-2 bg-red-600 text-white rounded">Resend OTP</button>
                )}
              </>
            ) : (
              <span className="text-green-500 font-bold">✔</span>
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
            <option value="">Select Course</option>
            {courses.map((c) => (<option key={c.course_id} value={c.course_id}>{c.course_name}</option>))}
          </select>

          <select className="google-input" name="specialization" value={form.specialization} onChange={handleChange} required>
            <option value="">Select Specialization</option>
            {specializations.map((s) => (<option key={s.stream_id} value={s.stream_id}>{s.stream_name}</option>))}
          </select>

          <label className="flex items-start gap-2 text-xs text-gray-600 md:col-span-2">
            <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
            By submitting this form, I consent to receive communications from the University.
          </label>

          <button type="submit" className="w-full py-2 md:col-span-2 bg-blue-600 hover:bg-blue-700 transition text-white font-semibold rounded-lg text-sm shadow-md mt-2">
            Submit
          </button>
        </form>
      </motion.div>
    </motion.div>
  );
}
