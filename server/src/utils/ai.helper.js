import genAi from "../config/gemini.js";
import { ApiError } from "./ApiError.js";

export const analyzeResume = async (resumeText, jobDescription) => {
    if (!resumeText || !jobDescription) {
        throw new ApiError(400, "Resume text and Job Description are required.");
    }
    const prompt = `
You are an ATS Resume Analyzer.

Resume:
${resumeText}

Job Description:
${jobDescription}

OUTPUT RULES (STRICT):
- Return ONLY a single valid JSON object. Nothing else.
- Do NOT use markdown formatting.
- Do NOT wrap the response in \`\`\`json or any code fences.
- Do NOT include any explanations, notes, or text before or after the JSON.
- Do NOT include comments inside the JSON.
- Do NOT add any keys other than the ones specified below.
- All arrays must contain strings only.
- matchScore must be an integer between 0 and 100 (no decimals, no % sign).
- If a field has no relevant data, return an empty array [] (not null, not "N/A").


Analyze the resume against the job description.

Return JSON with:
{
  "matchScore": number,        // integer 0-100
  "matchedSkills": string[],   // skills present in both resume and JD
  "missingSkills": string[],   // skills required by JD but missing in resume
  "strengths": string[],       // strong points of the resume for this JD
  "weaknesses": string[],      // weak points of the resume for this JD
  "suggestions": string[],     // actionable suggestions to improve match
  "feedback": string[]         // general feedback points
}

  EXAMPLE OUTPUT (format reference only, not actual content):
{
  "matchScore": 72,
  "matchedSkills": ["React", "Node.js"],
  "missingSkills": ["Docker", "AWS"],
  "strengths": ["Strong frontend experience"],
  "weaknesses": ["Limited backend deployment experience"],
  "suggestions": ["Add cloud deployment projects"],
  "feedback": ["Resume is well-structured but lacks DevOps exposure"]
}

Now analyze the given resume and job description, and return the JSON strictly following the schema above.
`;
    let text;
    try {
        const res = await genAi.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
            }
        })
        text = res.text;
    } catch (error) {
        throw new ApiError(500, "Failed to analyze resume.");
    }

    if (!text || !text.trim()) {
        throw new ApiError(400, "AI response error: empty response.");
    }

    const cleaned = text.trim().replace(/^```json\s*|```$/g, "").trim();
    let rawData;
    try {
        rawData = JSON.parse(cleaned)
    } catch (error) {
        throw new ApiError(500, "Failed to parse AI response as JSON.");
    }
    const score = Number(rawData.matchScore)
    const fallbackData = {
        matchScore: Number.isInteger(score) && score >= 0 && score <= 100 ? score : 0,
        matchedSkills: Array.isArray(rawData.matchedSkills) ? rawData.matchedSkills : [],
        missingSkills: Array.isArray(rawData.missingSkills) ? rawData.missingSkills : [],
        strengths: Array.isArray(rawData.strengths) ? rawData.strengths : ["Good potential candidate"],
        weaknesses: Array.isArray(rawData.weaknesses) ? rawData.weaknesses : ["Could not determine weaknesses"],
        suggestions: Array.isArray(rawData.suggestions) ? rawData.suggestions : ["Review your resume guidelines."],
        feedback: Array.isArray(rawData.feedback) ? rawData.feedback : []
    };
    return fallbackData;
};