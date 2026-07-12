const translations = {
  English: {
    dsa_title: "DSA Learning Path",
    dsa_subtitle: "Master Data Structures and Algorithms step by step.",
    locked: "Locked",
    start_teaching: "Start Teaching",
    teaching_step: "Teaching: Step {X}/{Y}",
    level_1: "Level 1 Problems",
    level_2: "Level 2 Problems",
    step_of: "Step {X} of {Y}",
    your_answer: "Your answer...",
    visualizer_not_found: "Visualizer not found",
    topic_complete: "Topic Teaching Complete! You can now select a problem level to practice.",
    skip_step: "Skip Step",
    loading: "Loading...",
    skip_confirm: "Are you sure you want to skip this step? You might miss important concepts.",
    error_rate_limit: "Too many requests. Please wait.",
    error_generic: "An error occurred. Please try again.",
    error_api_key: "API key not configured.",
    error_failed: "Failed to connect to the AI tutor."
  },
  Hindi: {
    dsa_title: "DSA लर्निंग पाथ",
    dsa_subtitle: "डेटा स्ट्रक्चर्स और एल्गोरिदम को चरण-दर-चरण सीखें।",
    locked: "लॉक है",
    start_teaching: "सीखना शुरू करें",
    teaching_step: "सीखना: चरण {X}/{Y}",
    level_1: "लेवल 1 की समस्याएं",
    level_2: "लेवल 2 की समस्याएं",
    step_of: "चरण {X} / {Y}",
    your_answer: "आपका उत्तर...",
    visualizer_not_found: "विज़ुअलाइज़र नहीं मिला",
    topic_complete: "टॉपिक पूरा हुआ! अब आप अभ्यास के लिए समस्या का लेवल चुन सकते हैं।",
    skip_step: "चरण छोड़ें",
    loading: "लोड हो रहा है...",
    skip_confirm: "क्या आप वाकई इस चरण को छोड़ना चाहते हैं? आप महत्वपूर्ण अवधारणाओं को चूक सकते हैं।",
    error_rate_limit: "बहुत सारे अनुरोध। कृपया प्रतीक्षा करें।",
    error_generic: "एक त्रुटि हुई। कृपया पुन: प्रयास करें।",
    error_api_key: "API कुंजी कॉन्फ़िगर नहीं की गई है।",
    error_failed: "AI ट्यूटर से कनेक्ट करने में विफल।"
  },
  Marathi: {
    dsa_title: "DSA लर्निंग पाथ",
    dsa_subtitle: "डेटा स्ट्रक्चर्स आणि अल्गोरिदम टप्प्याटप्प्याने शिका.",
    locked: "लॉक केले आहे",
    start_teaching: "शिकणे सुरू करा",
    teaching_step: "शिकवणे: टप्पा {X}/{Y}",
    level_1: "लेव्हल 1 समस्या",
    level_2: "लेव्हल 2 समस्या",
    step_of: "टप्पा {X} / {Y}",
    your_answer: "तुमचे उत्तर...",
    visualizer_not_found: "विझ्युअलायझर सापडला नाही",
    topic_complete: "विषय पूर्ण झाला! आता तुम्ही सराव करण्यासाठी समस्या पातळी निवडू शकता.",
    skip_step: "टप्पा वगळा",
    loading: "लोड होत आहे...",
    skip_confirm: "तुम्हाला नक्की हा टप्पा वगळायचा आहे का? तुम्ही महत्त्वाच्या संकल्पना चुकवू शकता.",
    error_rate_limit: "खूप जास्त विनंत्या. कृपया प्रतीक्षा करा.",
    error_generic: "एक त्रुटी आली. कृपया पुन्हा प्रयत्न करा.",
    error_api_key: "API की कॉन्फिगर केलेली नाही.",
    error_failed: "AI ट्युटरशी कनेक्ट करण्यात अयशस्वी."
  },
  Hinglish: {
    dsa_title: "DSA Learning Path",
    dsa_subtitle: "Data Structures aur Algorithms step-by-step seekhein.",
    locked: "Locked hai",
    start_teaching: "Seekhna shuru karein",
    teaching_step: "Teaching: Step {X}/{Y}",
    level_1: "Level 1 Problems",
    level_2: "Level 2 Problems",
    step_of: "Step {X} of {Y}",
    your_answer: "Aapka answer...",
    visualizer_not_found: "Visualizer nahi mila",
    topic_complete: "Topic teaching complete! Ab aap practice ke liye level select kar sakte hain.",
    skip_step: "Step skip karein",
    loading: "Load ho raha hai...",
    skip_confirm: "Kya aap sach mein ye step skip karna chahte hain? Aap important concepts miss kar sakte hain.",
    error_rate_limit: "Bahut saari requests hain. Kripya wait karein.",
    error_generic: "Ek error aayi. Kripya dobara try karein.",
    error_api_key: "API key configure nahi hai.",
    error_failed: "AI tutor se connect nahi ho paaya."
  }
};

export function t(key, language = "English", replacements = {}) {
  const langObj = translations[language] || translations["English"];
  let str = langObj[key] || translations["English"][key] || key;
  
  for (const [k, v] of Object.entries(replacements)) {
    str = str.replace(`{${k}}`, v);
  }
  
  return str;
}
