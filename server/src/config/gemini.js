const { GoogleGenerativeAI } = require('@google/generative-ai');
const { GEMINI_API_KEY, GEMINI_MODEL } = require('./env');

let genAI = null;
let defaultModel = null;

const MODEL_CANDIDATES = [
  GEMINI_MODEL || 'gemini-3.5-flash',
  'gemini-3.5-flash-lite',
  'gemini-3.7-flash',
  'gemini-flash-latest',
].filter((v, i, a) => Boolean(v) && a.indexOf(v) === i);

if (GEMINI_API_KEY) {
  try {
    genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
    const primaryModel = MODEL_CANDIDATES[0];
    defaultModel = genAI.getGenerativeModel({ model: primaryModel });
    console.log(`✅ Google Gemini AI client initialized with model: ${primaryModel}`);
  } catch (err) {
    console.warn('⚠️ Google Gemini initialization failed:', err.message);
  }
} else {
  console.warn('ℹ️ GEMINI_API_KEY not set. AI mentor will use intelligent fallback responses until key is provided.');
}

/**
 * Returns a generative model instance for a given model candidate
 */
function getModel(modelName = null, options = {}) {
  if (!genAI) return null;
  const name = modelName || MODEL_CANDIDATES[0];
  return genAI.getGenerativeModel({ model: name, ...options });
}

module.exports = {
  genAI,
  model: defaultModel,
  getModel,
  MODEL_CANDIDATES,
};
