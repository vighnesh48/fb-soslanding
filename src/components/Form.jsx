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

  // ⭐ RESEND OTP TIMER
  const [timer, setTimer] = useState(0);

  // ⭐ UTM Parameters
  const [utmParams, setUtmParams] = useState({
    lead_source: "website",
    utm_campaign: "organic",
    utm_medium: "enquiryform",
  });

  // ⭐ PAGE URL
  const pageURL = window.location.href;

  // ---------------- LOAD UTM PARAMETERS ----------------
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
        school_code: "1010",
      })
      .then((res) => res.data.status && setCourses(res.data.data || []))
      .catch((err) => console.error("Courses API Error:", err));
  }, []);

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
        { school_code: "1010", course_id: courseId, campus: "nashik", year: "2026" }
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
    if (!form.mobile || form.mobile.length !== 10) {
      return alert("Enter valid 10-digit mobile number");
    }

    try {
      const res = await axios.post(
        "https://onlinepayments.sandipuniversity.com/Api/send_otp_for_forms",
        { mobile: form.mobile }
      );

      if (res.data.status || res.data.success) {
        setOtpSent(true);
        setTimer(30); // ⭐ Start 30 sec timer
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

  // ⭐ RESEND OTP TIMER EFFECT
  useEffect(() => {
    if (timer === 0) return;
    const interval = setInterval(() => setTimer((t) => t - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = async () => {
    if (!form.otp) return alert("Enter OTP");

    try {
      const res = await axios.post(
        "https://onlinepayments.sandipuniversity.com/Api/verify_otp_for_forms",
        { mobile: form.mobile, otp: form.otp }
      );

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
      school: "10",
      course: form.course,
      specialization: form.specialization,
      fullName: form.fullName,
      email: form.email,
      mobile: form.mobile,
      campus_id: "1",

      // ⭐ UTM Parameters
      lead_source: utmParams.lead_source,
      utm_campaign: utmParams.utm_campaign, 
      utm_medium: utmParams.utm_medium,

      // ⭐ PAGE URL
      urlpath: pageURL,

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
       window.location.href = "https://www.sandipuniversity.edu.in/thankyoupages/thankyousops.php";
      } else if (res.data.message?.toLowerCase().includes("already")) {
        alert("This mobile number is already registered! Cannot submit.");
      } else {
        alert("Failed to submit form. Check console.");
      }
    } catch (err) {
      console.error("Submit Form Error:", err);
      alert("Error submitting form.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7 }}
      className="lg:col-span-5 col-span-12 w-full md:flex hidden justify-center lg:justify-end"
    >
      <div className="bg-white/20 backdrop-blur-xl shadow-2xl rounded-2xl p-4 sm:p-6 w-full max-w-xs sm:max-w-md border border-white/10">
        <h2 className="text-base sm:text-xl font-semibold text-white text-center mb-4 animate-pulse">
          Apply Now
        </h2>

        <form className="grid grid-cols-1 gap-3 text-sm" onSubmit={handleSubmit}>
          
          {/* HIDDEN FIELDS */}
          <input type="hidden" name="leadFrm" value="post" />
          <input type="hidden" name="lead_source" value={utmParams.lead_source} />
          <input type="hidden" name="utm_campaign" value={utmParams.utm_campaign} />
          <input type="hidden" name="utm_medium" value={utmParams.utm_medium} />
          <input type="hidden" name="country" value="101" />
          <input type="hidden" name="campus_id" value="1" />
          <input type="hidden" name="campus" value="N" />

          {/* Hidden submitted page URL */}
          <input type="hidden" name="urlpath" value={pageURL} />

          {/* NAME */}
          <input
            className="hero-input"
            placeholder="Full Name *"
            name="fullName"
            value={form.fullName}
            onChange={handleChange}
            required
          />

          {/* EMAIL */}
          <input
            className="hero-input"
            placeholder="Email Address *"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />

          {/* MOBILE */}
          <input
            className="hero-input"
            placeholder="Mobile Number *"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            required
          />

          {/* OTP SECTION */}
          <div className="flex items-center gap-3">
            <input
              className="hero-input flex-1"
              placeholder="Enter OTP *"
              name="otp"
              value={form.otp}
              onChange={handleChange}
            />

            {!otpSent ? (
              // GET OTP BUTTON
              <button type="button" onClick={sendOtp} className="px-8 py-2 bg-blue-700 text-white rounded">
                Get OTP
              </button>
            ) : !otpVerified ? (
              <>
                {/* VERIFY BUTTON */}
                <button type="button" onClick={verifyOtp} className="px-8 py-2 bg-green-700 text-white rounded">
                  Verify
                </button>

                {/* RESEND OTP */}
                {timer === 0 ? (
                  <button type="button" onClick={sendOtp} className="px-6 py-2 bg-red-600 text-white rounded">
                    Resend OTP
                  </button>
                ) : (
                  <span className="text-yellow-300 text-xs">Resend in {timer}s</span>
                )}
              </>
            ) : (
              <span className="text-green-400 font-bold">✔</span>
            )}
          </div>

          {/* STATE + CITY */}
          <div className="grid grid-cols-2 gap-3">
            <select className="hero-input" name="state" value={form.state} onChange={handleStateChange} required>
              <option value="">Select State</option>
              {states.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>

            <select className="hero-input" name="city" value={form.city} onChange={handleChange} required>
              <option value="">Select City</option>
              {cities.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* COURSE */}
          <select className="hero-input" name="course" value={form.course} onChange={handleCourseChange} required>
            <option value="">Select Course</option>
            {courses.map((c) => (
              <option key={c.course_id} value={c.course_id}>
                {c.course_name}
              </option>
            ))}
          </select>

          {/* SPECIALIZATION */}
          <select className="hero-input" name="specialization" value={form.specialization} onChange={handleChange} required>
            <option value="">Select Specialization</option>
            {specializations.map((s) => (
              <option key={s.stream_id} value={s.stream_id}>
                {s.stream_name}
              </option>
            ))}
          </select>

          {/* CONSENT */}
          <label className="flex items-start gap-2 text-xs text-gray-200">
            <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} required />
            I consent to receive communication from university.
          </label>

          {/* SUBMIT BUTTON */}
          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded shadow">
            Submit
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default Form;
