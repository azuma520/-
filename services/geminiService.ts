import { GoogleGenAI } from "@google/genai";
import type { Task, Mood, UserProfile } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const moodToText: Record<Mood, string> = {
    rad: "心情很棒",
    good: "心情不錯",
    okay: "心情普通",
    bad: "心情不太好",
    awful: "心情糟透了",
};

const styleToText: Record<UserProfile['communicationStyle'], string> = {
    direct: "直接坦率",
    supportive: "溫暖鼓勵",
    formal: "嚴謹專業",
};

export const getWorkReview = async (tasks: Task[], mood: Mood | null, userProfile: UserProfile | null): Promise<string> => {
  if (tasks.length === 0) {
    return "沒有可供複盤的工作紀錄。請先新增一些今天完成的任務。";
  }

  const taskDescriptions = tasks.map((task, index) => {
    let timeInfo = '';
    if (task.startTime && task.endTime) {
      timeInfo = ` (時間: ${task.startTime} - ${task.endTime})`;
    }
    return `${index + 1}. ${task.text}${timeInfo}`;
  }).join('\n');

  const moodDescription = mood ? `使用者今天的心情是：「${moodToText[mood]}」。` : '';
  
  let profileDescription = '';
  if (userProfile) {
    profileDescription = `
      ---
      使用者個人簡介（請務必參考此資訊，以更個人化的方式提供回饋）：
      - 稱呼: ${userProfile.name}
      - 職位/角色: ${userProfile.role}
      - 主要工作目標: ${userProfile.goals}
      - 目前最大的挑戰: ${userProfile.challenges}
      - 偏好的溝通風格: ${styleToText[userProfile.communicationStyle]} (請根據此風格調整你的語氣)
      ---
    `;
  }


  const prompt = `
    你是一位專業、有同理心的生產力教練與顧問。
    請根據使用者今天完成的工作任務清單（包含時間）、他的心情、以及他的個人簡介，提供一個簡潔、正面且具建設性的複盤反饋。

    你的反饋應該包含：
    1.  開頭先根據使用者的稱呼，親切地打招呼。
    2.  分析今天的工作模式，例如任務是否集中在特定領域，或是處理了多樣化的事務。如果提供了時間，請分析時間分配。
    3.  **結合使用者的心情、工作目標與挑戰進行深度分析。** 嘗試找出工作成就與心情的關聯性，並根據其挑戰提供支持。
    4.  提出1-2個具體的、可操作的建議。這些建議必須與使用者的**角色、目標和挑戰**高度相關。
    5.  結尾再次給予鼓勵。

    請嚴格遵守使用者偏好的**溝通風格**來撰寫你的回覆，並使用 Markdown 格式化，讓重點更清晰。

    ${profileDescription}

    今日工作任務清單：
    ${taskDescriptions}

    ${moodDescription}
  `;

  try {
    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
    });
    
    return response.text;
  } catch (error) {
    console.error("Error generating work review:", error);
    return "抱歉，分析您的工作紀錄時發生錯誤。請稍後再試。";
  }
};