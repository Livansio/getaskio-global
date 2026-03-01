import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, phone, tracker, comment } = body;

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const chatId = process.env.TELEGRAM_CHAT_ID;

    if (!botToken || !chatId) {
      console.error("Tokens are not configured");
      return NextResponse.json({ error: "Server error" }, { status: 500 });
    }

    // Экранируем HTML-теги в комментарии для безопасности
    const safeComment = comment ? comment.replace(/</g, "&lt;").replace(/>/g, "&gt;") : "Нет комментария";

    const message = `🔔 <b>Новая заявка на аудит (Askio)</b>\n\n` +
                    `<b>Email:</b> ${email}\n` +
                    `<b>Телефон:</b> ${phone}\n` +
                    `<b>Трекер:</b> ${tracker}\n\n` +
                    `<b>Комментарий:</b>\n<i>${safeComment}</i>`;

    const telegramUrl = `https://api.telegram.org/bot${botToken}/sendMessage`;
    const response = await fetch(telegramUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'HTML',
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to send message to Telegram');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram API Error:", error);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}