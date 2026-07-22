import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { category, details, userEmail } = await req.json();

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.warn("Telegram API credentials missing in .env. Skipping Telegram notification.");
      return NextResponse.json({ success: true, message: "Credentials missing, skipped Telegram" });
    }

    // Format the message using Markdown
    const message = `🚀 *New Logic Coach Feedback*\n\n*From:* ${userEmail}\n*Category:* ${category}\n\n*Details:*\n${details}`;
    
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown'
      })
    });
    
    if (!response.ok) {
      throw new Error(`Telegram API responded with status: ${response.status}`);
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Failed to send Telegram message:", error);
    return NextResponse.json(
      { error: "Failed to send Telegram message" },
      { status: 500 }
    );
  }
}
