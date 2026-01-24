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
      <div className="bg-white/20 backdrop-blur-xl shadow-xl rounded-2xl p-6 w-full max-w-md border border-white/10">
        <h2 className="text-xl font-semibold text-white text-center mb-4">Apply Now</h2>

        {/* ALERT MESSAGE */}
        {message.text && (
          <div
            className={`text-sm mb-2 px-4 py-2 rounded ${
              message.type === "success"
                ? "bg-green-500 text-white"
                : "bg-red-500 text-white"
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

        <form className="grid grid-cols-1 gap-3" onSubmit={handleSubmit}>
          <input className="hero-input" placeholder="Full Name *" name="fullName" value={form.fullName} onChange={handleChange} required />
          <input className="hero-input" placeholder="Email Address *" name="email" value={form.email} onChange={handleChange} required />
          <input className="hero-input" placeholder="Mobile Number *" maxLength="10" name="mobile" value={form.mobile}    onBlur={handleMobileBlur}  onChange={handleChange} required />

          {/* OTP */}
          <div className="flex items-center gap-3">
            <input className="hero-input flex-1" placeholder="Enter OTP *" maxLength="6" name="otp" value={form.otp} onChange={handleChange} />
            {!otpSent ? (
              <button type="button" onClick={sendOtp} className="px-6 py-2 bg-blue-700 text-white rounded">Get OTP</button>
            ) : !otpVerified ? (
              <>
                <button type="button" onClick={verifyOtp} className="px-6 py-2 bg-green-700 text-white rounded">Verify</button>
                {timer === 0 ? (
                  <button type="button" onClick={sendOtp} className="px-5 py-2 bg-red-600 text-white rounded">Resend</button>
                ) : (
                  <span className="text-yellow-300 text-xs">Resend in {timer}s</span>
                )}
              </>
            ) : (
              <span className="text-green-400 font-bold">✔</span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3">
            <select className="hero-input" name="state" value={form.state} onChange={handleStateChange} required>
              <option value="">Select State*</option>
              {states.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
            <select className="hero-input" name="city" value={form.city} onChange={handleChange} required>
              <option value="">Select City*</option>
              {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <select className="hero-input" name="course" value={form.course} onChange={handleCourseChange} required>
            <option value="">Select Course*</option>
            {courses.map((c) => <option key={c.course_id} value={c.course_id}>{c.course_name}</option>)}
          </select>

          <select className="hero-input" name="specialization" value={form.specialization} onChange={handleChange} required>
            <option value="">Select Specialization*</option>
            {specializations.map((s) => <option key={s.stream_id} value={s.stream_id}>{s.stream_name}</option>)}
          </select>



           
          <label className="flex items-start gap-2 text-xs text-gray-200">
            <input type="checkbox" name="consent" checked={form.consent} onChange={handleChange} style={{display:'none'}} />
           By submitting this form, I consent to receive communications from the University through WhatsApp, SMS, email, phone calls, and other channels, even if my number is registered on DND/NDNC.
          </label>

          <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded">Submit</button>
        </form>
      </div>
    </motion.div>
  );
};

export default Form;
