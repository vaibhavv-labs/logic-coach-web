import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const data = await req.json();
    const { email, displayName, uid, roadmap } = data;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      return NextResponse.json({ success: false, error: 'Telegram credentials missing' }, { status: 500 });
    }

    const name = roadmap?.username || displayName || 'Unknown User';
    
    // Format interests securely since it might be an array now
    let interestStr = "None";
    if (Array.isArray(roadmap?.interest)) {
        interestStr = roadmap.interest.join(", ");
    } else if (roadmap?.interest) {
        interestStr = roadmap.interest;
    }

    const message = `
🚀 *User Login!*

👤 *Name:* ${name}
📧 *Email:* ${email || 'Anonymous'}
🆔 *UID:* \`${uid}\`

*User Details:*
- *Role:* ${roadmap?.role || 'N/A'}
- *Interests:* ${interestStr}
- *Language:* ${roadmap?.language || 'N/A'}
- *Goal:* ${roadmap?.goal || 'N/A'}
    `.trim();

    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
      }),
    });

    const result = await response.json();
    if (!result.ok) {
      throw new Error(result.description);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram Login Notification Error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
