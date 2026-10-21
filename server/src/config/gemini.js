const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY, GEMINI_MODEL } = require('./env');

let genAI = null;
let model = null;

if (GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    model = genAI.getGenerativeModel({ model: GEMINI_MODEL });
    console.log(`✅ Google Gemini AI initialized with model: ${GEMINI_MODEL}`);
  } catch (err) {
    console.warn('⚠️ Google Gemini initialization failed:', err.message);
  }
} else {
  console.warn('ℹ️ GEMINI_API_KEY not set. AI mentor will use intelligent fallback responses until key is provided.');
}

module.exports = { genAI, model };

